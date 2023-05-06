const PORT = 8000;
const express = require('express');
const cors = require('cors');
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/chat/completions';


// api routes
app.post('/completions', async(req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: 'user', content: req.body.message}],
            max_tokens: 100,
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