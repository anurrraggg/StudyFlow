const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/generate', async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) return res.status(400).json({ error: 'Topic is required' });

        const prompt = `Generate study materials for the following topic/notes: "${topic}". Create 5 flashcards and a 3-question multiple choice quiz. 
You must return your response in JSON format. The JSON should have the following structure exactly:
{
  "flashcards": [
    { "question": "string", "answer": "string" }
  ],
  "quiz": [
    { "question": "string", "options": ["string", "string", "string", "string"], "correctAnswer": 0 }
  ]
}
Do not include any markdown formatting blocks like \`\`\`json. Output ONLY the raw JSON.`;
        
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.1-8b-instant',
            response_format: { type: 'json_object' },
            temperature: 0.5
        });

        const data = JSON.parse(chatCompletion.choices[0].message.content);
        res.json(data);
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'Failed to generate study materials. Please try again.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
