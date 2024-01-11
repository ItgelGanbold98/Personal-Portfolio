import express from 'express';
import rateLimit from 'express-rate-limit';
import axios from 'axios';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';

// Configure environment variables
dotenv.config();

// Initialize express app
const app = express();
app.use(express.json());
app.use(cors());

// OpenAI API setup
const OPENAI_API_KEY = process.env.OPEN_AI_API_KEY;
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

// Rate limit middleware for chat endpoint
const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // limit each IP to 30 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false
});

// Define a map to store conversation histories for different sessions
const sessionHistories = new Map();
const sessionTTL = 60 * 60 * 1000; // 1 hour in milliseconds

// Function to clean up expired sessions
const cleanupExpiredSessions = () => {
    const currentTime = Date.now();
    for (const [sessionID, { lastAccessed }] of sessionHistories.entries()) {
        if (currentTime - lastAccessed >= sessionTTL) {
            // Session has expired, remove it from the map
            sessionHistories.delete(sessionID);
        }
    }
};

// Set up a periodic cleanup task (e.g., every 15 minutes)
setInterval(cleanupExpiredSessions, 15 * 60 * 1000);

// Chat endpoint
app.post('/chat', chatLimiter, async (req, res) => {
    const userMessage = req.body.message;
    const sessionID = req.body.sessionID; // Unique session identifier sent by the client

    // Retrieve or create a conversation history for the session
    let sessionData = sessionHistories.get(sessionID);
    if (!sessionData) {
        // Initialize a new session data object
        sessionData = {
            conversationHistory: [], // Initialize conversationHistory as an empty array
            lastAccessed: Date.now()
        };
        sessionHistories.set(sessionID, sessionData);
    } else {
        // Update the last accessed timestamp for the session
        sessionData.lastAccessed = Date.now();
    }

    const conversationHistory = sessionData.conversationHistory; // Get conversation history from sessionData

    console.log('User message: ', userMessage);
    console.log('Session ID: ', sessionID);
    console.log('Conversation History: ', conversationHistory);

    try {
        // Add the user's new message to the conversation history
        conversationHistory.push({ role: 'user', content: userMessage });

        // Call the OpenAI API with the updated conversation history
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: conversationHistory, // Pass the entire conversation history

            stream: false
        });

        const botResponse = response.choices[0].message;
        console.log('Bot reply: ', botResponse.content);

        // Add the bot's response to the conversation history
        conversationHistory.push({
            role: 'assistant',
            content: botResponse.content
        });

        res.json({ message: botResponse, conversation: conversationHistory });
    } catch (error) {
        console.error('Error in OpenAI API call:', error);
        res.status(500).send('An error occurred in generating a response');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
