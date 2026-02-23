import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 👇 Add your website knowledge here
const websiteContext = `
You are Sophia, the AI assistant for Lucky's company website.

About the website:
- We provide web development services
- We build ecommerce stores
- We offer SEO services
- Contact email: support@yourwebsite.com
- Office located in India
- We provide 24/7 support

Always answer based on this information.
If user asks something unrelated, guide them politely.
`;

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: websiteContext },
        ...messages
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
