import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set in .env.local
});

export async function POST(req) {
  try {
    const { prompt, plan } = await req.json(); // PLAN is for token setup
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    // Extract the output text
    const aiResponse = response.choices[0].message.content;

    return NextResponse.json({ success: true, message: aiResponse });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch AI response",
    });
  }
}
