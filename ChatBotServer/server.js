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

// Chat endpoint
app.post('/chat', chatLimiter, async (req, res) => {
    const userMessage = req.body.message;
    const personalInfo = req.body.context;
    console.log('User message: ', userMessage);
    console.log('Context: ', personalInfo);
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: userMessage },
                { role: 'assistant', content: personalInfo }
            ],
            stream: false
        });

        const botResponse = response.choices[0].message;
        console.log('Bot reply: ', botResponse);
        res.json({ message: botResponse });
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
