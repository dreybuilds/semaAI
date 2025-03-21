const { Mistral } = require('@mistralai/mistralai');
const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

async function rateRelevance(groupDescription, userInput, user) {
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

// Example Usage
const groupDescription = "This group discusses blockchain-based gaming and NFT collectibles.";
const userInput = "NFTs will revolutionize gaming!";
const user = "dreybuilds";

rateRelevance(groupDescription, userInput, user).then(console.log);
