require('dotenv').config();

const PORT = process.env.PORT;
const express = require('express');
const cors = require('cors');
const fetch = require("node-fetch");
 
const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';


// api routes
app.post('/resumeWork', async(req, res) => {
    const question = "Generate a list of common job interview questions and suggested answers using the STAR (Situation, Task, Action, Result) format. Tailor the responses based on my work experience - " + req.body.message;
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: 'user', content: question}],
            max_tokens: 1000,
        })
    };

    try {
        const response = await fetch(API_URL, options);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});


// setup server listener
app.listen(PORT, () => console.log('Server is running on port ' + PORT))