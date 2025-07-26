
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

async function chatOpenAI(prompt) {
  const res = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });
  return res.data.choices[0].message.content;
}

// Placeholder Gemini function
async function chatGemini(prompt) {
  return "Gemini is not connected yet (requires Google API)";
}

// Placeholder Claude function
async function chatClaude(prompt) {
  return "Claude is not connected yet (requires Anthropic API)";
}

app.post('/api/chat', async (req, res) => {
  const { prompt, model } = req.body;
  try {
    let reply = "Model not supported";
    if (model === "openai") reply = await chatOpenAI(prompt);
    if (model === "gemini") reply = await chatGemini(prompt);
    if (model === "claude") reply = await chatClaude(prompt);
    res.json({ reply });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Chat failed" });
  }
});

app.listen(PORT, () => console.log(`Multi-AI backend running on http://localhost:${PORT}`));
