const { Client, GatewayIntentBits } = require('discord.js');
const { Mistral } = require('@mistralai/mistralai');
const dotenv = require('dotenv');
const { Client: PgClient } = require('pg');
const { v4: uuidv4 } = require('uuid'); // For generating UUIDs

dotenv.config();

const discordToken = process.env.DISCORD_BOT_TOKEN;
const mistralApiKey = process.env.MISTRAL_API_KEY;

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const mistralClient = new Mistral({ apiKey: mistralApiKey });

// PostgreSQL client
const pgClient = new PgClient({
    connectionString: process.env.POSTGRES_URL, // Use DATABASE_URL for NeonDB
    ssl: {
        rejectUnauthorized: false, // Required for NeonDB SSL connection
    },
});

let platform_name = 'Discord';

// Engagement types and their weights (engagement points)
const engagementTypes = {
    MESSAGE_SENT: { type: 'Message Sent', weight: 5 },
    REPLY_OR_MENTION: { type: 'Reply or Mention', weight: 10 },
    REACTION: { type: 'Reaction/Emoji Use', weight: 3 },
    VOICE_PARTICIPATION: { type: 'Voice Channel Participation', weight: 15 },
    MEDIA_SHARING: { type: 'Media or Link Sharing', weight: 12 },
    POLL_PARTICIPATION: { type: 'Poll or Survey Participation', weight: 8 },
    EVENT_PARTICIPATION: { type: 'Event Participation', weight: 10 },
    SERVER_BOOSTING: { type: 'Server Boosting', weight: 25 },
};

// Rate limiting for Discord interactions
const rateLimitMap = new Map(); // Store user request timestamps
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests per window

// Rate limiting for Mistral API calls
const mistralRateLimitMap = new Map();
const MISTRAL_RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MISTRAL_RATE_LIMIT_MAX_REQUESTS = 10; // Max 10 requests per window

// Function to check rate limit for Discord interactions
function checkRateLimit(userId) {
    const now = Date.now();
    const userTimestamps = rateLimitMap.get(userId) || [];

    // Filter timestamps within the current window
    const recentTimestamps = userTimestamps.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

    if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
        return false; // Rate limit exceeded
    }

    // Add the current timestamp
    recentTimestamps.push(now);
    rateLimitMap.set(userId, recentTimestamps);
    return true; // Within rate limit
}

// Function to check rate limit for Mistral API calls
function checkMistralRateLimit(userId) {
    const now = Date.now();
    const userTimestamps = mistralRateLimitMap.get(userId) || [];

    // Filter timestamps within the current window
    const recentTimestamps = userTimestamps.filter(timestamp => now - timestamp < MISTRAL_RATE_LIMIT_WINDOW);

    if (recentTimestamps.length >= MISTRAL_RATE_LIMIT_MAX_REQUESTS) {
        return false; // Rate limit exceeded
    }

    // Add the current timestamp
    recentTimestamps.push(now);
    mistralRateLimitMap.set(userId, recentTimestamps);
    return true; // Within rate limit
}

// Function to initialize the database schema
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
                channel_topic TEXT, -- New column for channel topic
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
                engagement_type TEXT NOT NULL UNIQUE,
                weight INTEGER NOT NULL -- Add weight column
            );
        `);
        console.log('Created engagement_types table');

        // Insert default engagement types (if not already inserted)
        for (const [key, value] of Object.entries(engagementTypes)) {
            await pgClient.query(`
                INSERT INTO engagement_types (engagement_type, weight)
                VALUES ($1, $2)
                ON CONFLICT (engagement_type) DO NOTHING;
            `, [value.type, value.weight]);
        }
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
    // Event listener for when the bot is added to a new server (guild)
    discordClient.on('guildCreate', (guild) => {
        console.log(`Bot added to server: ${guild.name} (ID: ${guild.id})`);
    });

    // Event listener for messages
    discordClient.on('messageCreate', async (message) => {
        // Ignore messages from bots
        if (message.author.bot) return;

        const userId = message.author.id;

        // Check rate limit for Discord interactions
        if (!checkRateLimit(userId)) {
            message.reply('You are sending messages too quickly. Please wait a moment and try again.');
            return;
        }

        const username = message.author.username;
        const content = message.content;
        const channelId = message.channel.id;
        const channelName = message.channel.name;
        const channelTopic = message.channel.topic || 'No topic available'; // Get channel topic

        // Get the server (guild) name
        const guildName = message.guild ? message.guild.name : 'Direct Message';

        // Determine engagement type
        let engagementType = engagementTypes.MESSAGE_SENT; // Default to "Message Sent"
        if (message.mentions.users.size > 0 || message.reference) {
            engagementType = engagementTypes.REPLY_OR_MENTION; // Reply or Mention
        } else if (message.attachments.size > 0 || message.embeds.length > 0) {
            engagementType = engagementTypes.MEDIA_SHARING; // Media or Link Sharing
        }

        // Log the engagement type and channel topic
        console.log(`Engagement Type: ${engagementType.type}`);
        console.log('Engagement Weight:', engagementType.weight);
        console.log(`Channel Topic: ${channelTopic}`);

        // Rate the relevance of the message using Mistral API
        const relevanceResult = await rateRelevance(channelTopic, content, username, channelId, channelName, userId);

        // Save the engagement to PostgreSQL
        await saveToDatabase({
            userId,
            username,
            content,
            channelId,
            channelName,
            channelTopic,
            engagementType,
            guildName,
            relevanceScore: relevanceResult.relevanceScore,
        });

        console.log('Engagement processed and saved to PostgreSQL');
    });

    // Event listener for reactions
    discordClient.on('messageReactionAdd', async (reaction, user) => {
        // Ignore reactions from bots
        if (user.bot) return;

        const userId = user.id;

        // Check rate limit for Discord interactions
        if (!checkRateLimit(userId)) {
            return; // Silently ignore if rate limit is exceeded
        }

        const username = user.username;
        const channelId = reaction.message.channel.id;
        const channelName = reaction.message.channel.name;
        const channelTopic = reaction.message.channel.topic || 'No topic available'; // Get channel topic

        // Get the server (guild) name
        const guildName = reaction.message.guild ? reaction.message.guild.name : 'Direct Message';

        // Log the engagement type and channel topic
        console.log(`Engagement Type: ${engagementTypes.REACTION.type}`);
        console.log(`Channel Topic: ${channelTopic}`);

        // Save the engagement to PostgreSQL
        await saveToDatabase({
            userId,
            username,
            content: 'Reaction added',
            channelId,
            channelName,
            channelTopic,
            engagementType: engagementTypes.REACTION,
            guildName,
            relevanceScore: 0, // Reactions don't go through Mistral API
            aiResponse: 'N/A', // No AI response for reactions
        });

        console.log('Engagement processed and saved to PostgreSQL');
    });

    // Log in to Discord
    discordClient.login(discordToken);
}

// Function to rate the relevance of a message using Mistral API
async function rateRelevance(groupDescription, userInput, user, chatId, groupName, userId) {
    try {
        // Check Mistral API rate limit
        if (!checkMistralRateLimit(userId)) {
            console.log('Mistral API rate limit exceeded for user:', userId);
            return {
                relevanceScore: 0,
                aiResponse: 'Rate limit exceeded. Please try again later.',
            };
        }

        const chatResponse = await mistralClient.chat.complete({
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

        console.log('Relevance Score:', relevanceScore);

        return {
            relevanceScore,
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            relevanceScore: 0,
            aiResponse: 'Error evaluating relevance',
        };
    }
}

// Function to save data to PostgreSQL
async function saveToDatabase(data) {
    const { userId, username, content, channelId, channelName, channelTopic, engagementType, guildName, relevanceScore, aiResponse } = data;

    try {
        // Generate a new UUID for the user if they don't exist
        const appId = uuidv4();

        // Insert into users table if not exists
        await pgClient.query(`
            INSERT INTO users (app_id)
            VALUES ($1)
            ON CONFLICT (app_id) DO NOTHING;
        `, [appId]);

        // Insert into platforms table if not exists (Discord)
        await pgClient.query(`
            INSERT INTO platforms (platform_name)
            VALUES ($1)
            ON CONFLICT (platform_name) DO NOTHING;
        `, [platform_name]);

        // Get platform_id for Discord
        const platformResult = await pgClient.query(`
            SELECT platform_id FROM platforms WHERE platform_name = $1;
        `, [platform_name]);
        const platformId = platformResult.rows[0].platform_id;

        // Insert into user_profiles table if not exists
        await pgClient.query(`
            INSERT INTO user_profiles (app_id, platform_id, platform_user_id, username)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (platform_id, platform_user_id) DO NOTHING;
        `, [appId, platformId, userId, username]);

        // Get engagement_type_id for the engagement type
        const engagementTypeResult = await pgClient.query(`
            SELECT engagement_type_id FROM engagement_types WHERE engagement_type = $1;
        `, [engagementType.type]);
        const engagementTypeId = engagementTypeResult.rows[0].engagement_type_id;

        // Insert into engagements table
        await pgClient.query(`
            INSERT INTO engagements (app_id, platform_id, engagement_type_id, content, relevance_score, channel_topic)
            VALUES ($1, $2, $3, $4, $5, $6);
        `, [appId, platformId, engagementTypeId, content, relevanceScore, channelTopic]);

        // Update engagement_scores table
        await pgClient.query(`
            INSERT INTO engagement_scores (app_id, score)
            VALUES ($1, $2)
            ON CONFLICT (app_id) DO UPDATE
            SET score = engagement_scores.score + $2;
        `, [appId, engagementType.weight]);

        console.log('Data saved to PostgreSQL');
    } catch (error) {
        console.error('Error saving to PostgreSQL:', error);
    }
}

// Start the bot
console.log('Discord bot is running...');