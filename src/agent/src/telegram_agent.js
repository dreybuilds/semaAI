const TelegramBot = require('node-telegram-bot-api');
const { Mistral } = require('@mistralai/mistralai');
const dotenv = require('dotenv');
const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid'); // For generating UUIDs

dotenv.config();

const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const mistralApiKey = process.env.MISTRAL_API_KEY;

const bot = new TelegramBot(telegramToken, { polling: true });
const client = new Mistral({ apiKey: mistralApiKey });

// PostgreSQL client
const pgClient = new Client({
    connectionString: process.env.POSTGRES_URL, // Use DATABASE_URL for NeonDB
    ssl: {
        rejectUnauthorized: false, // Required for NeonDB SSL connection
    },
});

let groupDescription = '';
let groupChatId = null;
let platform_name = 'Telegram';

// Rate limiting variables
let lastApiCallTime = null;
const RATE_LIMIT_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

async function initializeDatabase() {
    try {
        console.log('Initializing database schema...');

        // Create users table
        await pgClient.query(`
            CREATE TABLE IF NOT EXISTS users (
                app_id UUID PRIMARY KEY, -- PRIMARY KEY implies UNIQUE
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Created users table');

        // Create platforms table
        await pgClient.query(`
            CREATE TABLE IF NOT EXISTS platforms (
                platform_id SERIAL PRIMARY KEY,
                platform_name TEXT NOT NULL UNIQUE -- UNIQUE constraint
            );
        `);
        console.log('Created platforms table');

        // Create user_profiles table
        await pgClient.query(`
            CREATE TABLE IF NOT EXISTS user_profiles (
                id SERIAL PRIMARY KEY,
                app_id UUID NOT NULL REFERENCES users(app_id),
                platform_id INTEGER NOT NULL REFERENCES platforms(platform_id),
                platform_user_id TEXT NOT NULL,
                username TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (platform_id, platform_user_id) -- UNIQUE constraint
            );
        `);
        console.log('Created user_profiles table');

        // Create engagements table
        await pgClient.query(`
            CREATE TABLE IF NOT EXISTS engagements (
                engagement_id SERIAL PRIMARY KEY,
                app_id UUID NOT NULL REFERENCES users(app_id),
                platform_id INTEGER NOT NULL REFERENCES platforms(platform_id),
                engagement_type_id INTEGER NOT NULL,
                content TEXT,
                relevance_score REAL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Created engagements table');

        // Create engagement_scores table
        await pgClient.query(`
            CREATE TABLE IF NOT EXISTS engagement_scores (
                score_id SERIAL PRIMARY KEY,
                app_id UUID NOT NULL REFERENCES users(app_id),
                score INTEGER DEFAULT 0,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (app_id) -- UNIQUE constraint
            );
        `);
        console.log('Created engagement_scores table');

        // Create engagement_types table (if not already created)
        await pgClient.query(`
            CREATE TABLE IF NOT EXISTS engagement_types (
                engagement_type_id SERIAL PRIMARY KEY,
                engagement_type TEXT NOT NULL UNIQUE
            );
        `);
        console.log('Created engagement_types table');

        // Insert default engagement types (if not already inserted)
        await pgClient.query(`
            INSERT INTO engagement_types (engagement_type)
            VALUES ('message'), ('like'), ('share')
            ON CONFLICT (engagement_type) DO NOTHING;
        `);
        console.log('Inserted default engagement types');

        console.log('Database schema initialized successfully');
    } catch (error) {
        console.error('Error initializing database schema:', error);
    }
}

// Connect to PostgreSQL and initialize the database
pgClient.connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
        return initializeDatabase(); // Initialize the database schema
    })
    .then(() => {
        console.log('Database schema initialized. Starting bot...');
        startBot(); // Start the bot after the database is initialized
    })
    .catch(err => console.error('PostgreSQL connection error:', err));

// Function to start the bot
function startBot() {
    // Event listener when the bot is added to a group
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (msg.group_chat_created || msg.new_chat_members) {
            // Bot added to a group
            groupChatId = chatId; // Set the group chat ID
            bot.getChat(chatId).then((chat) => {
                groupDescription = chat.description || 'No description available';
                console.log(`Group Description: ${groupDescription}`);
            });
        } else if (text) {
            // Handle user messages
            const user = msg.from.username || msg.from.first_name;
            const userId = msg.from.id;
            const groupName = msg.chat.title || 'Private Chat'; // Group name or 'Private Chat' if it's not a group
            const groupDescription = msg.chat.description || 'No description available';

            // Check rate limit
            const currentTime = Date.now();
            if (lastApiCallTime && currentTime - lastApiCallTime < RATE_LIMIT_INTERVAL) {
                console.log('Rate limit exceeded. Skipping API call.');
                return;
            }

            // Update last API call time
            lastApiCallTime = currentTime;

            // Rate the relevance of the message
            rateRelevance(groupDescription, text, user, chatId, groupName, userId).then((result) => {
                console.log(result);
                saveToDatabase(result); // Save the result to PostgreSQL
            });
        }
    });

    // Periodically check for updates to the group description
    setInterval(() => {
        if (groupChatId) {
            bot.getChat(groupChatId).then((chat) => {
                const newDescription = chat.description || 'No description available';
                if (newDescription !== groupDescription) {
                    groupDescription = newDescription;
                    console.log(`Updated Group Description: ${groupDescription}`);
                }
            });
        }
    }, 5000); // Check every 5 seconds
}

async function rateRelevance(groupDescription, userInput, user, chatId, groupName, userId) {
    try {
        const chatResponse = await client.chat.complete({
            model: 'mistral-large-latest', // Use latest Mistral model
            messages: [
                { role: 'system', content: 'You are an AI that evaluates user input based on a group’s description and assigns a relevance score (0-100).' },
                { role: 'user', content: `Group Description: ${groupDescription}` },
                { role: 'user', content: `Evaluate this user statement: "${userInput}". Provide a relevance score (0-100) and the reason.` }
            ],
        });

        const aiResponse = chatResponse.choices[0].message.content;
        const relevanceMatch = aiResponse.match(/(\d+)/);
        const relevanceScore = relevanceMatch ? parseInt(relevanceMatch[0]) : 0;
        const pointsAwarded = Math.round(relevanceScore / 10);

        return {
            chatId,
            groupName,
            userId,
            user,
            statement: userInput,
            relevanceScore,
            pointsAwarded,
            aiResponse,
        };
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to save data to PostgreSQL
async function saveToDatabase(data) {
    const { chatId, groupName, userId, user, statement, relevanceScore, pointsAwarded, aiResponse } = data;

    try {
        // Generate a new UUID for the user if they don't exist
        const appId = uuidv4();

        // Insert into users table if not exists
        await pgClient.query(`
            INSERT INTO users (app_id)
            VALUES ($1)
            ON CONFLICT (app_id) DO NOTHING;
        `, [appId]);

        // Insert into platforms table if not exists (Telegram)
        await pgClient.query(`
            INSERT INTO platforms (platform_name)
            VALUES ($1)
            ON CONFLICT (platform_name) DO NOTHING;
        `, [platform_name]);

        // Get platform_id for Telegram
        const platformResult = await pgClient.query(`
            SELECT platform_id FROM platforms WHERE platform_name = $1;
        `, [platform_name]);
        const platformId = platformResult.rows[0].platform_id;

        // Insert into user_profiles table if not exists
        await pgClient.query(`
            INSERT INTO user_profiles (app_id, platform_id, platform_user_id, username)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (platform_id, platform_user_id) DO NOTHING;
        `, [appId, platformId, userId, user]);

        // Insert into engagements table
        await pgClient.query(`
            INSERT INTO engagements (app_id, platform_id, engagement_type_id, content, relevance_score)
            VALUES ($1, $2, $3, $4, $5);
        `, [appId, platformId, 1, statement, relevanceScore]); // engagement_type_id = 1 for 'message'

        // Update engagement_scores table
        await pgClient.query(`
            INSERT INTO engagement_scores (app_id, score)
            VALUES ($1, $2)
            ON CONFLICT (app_id) DO UPDATE
            SET score = engagement_scores.score + $2;
        `, [appId, pointsAwarded]);

        console.log('Data saved to PostgreSQL');
    } catch (error) {
        console.error('Error saving to PostgreSQL:', error);
    }
}

// Start the bot
console.log('Bot is running...');