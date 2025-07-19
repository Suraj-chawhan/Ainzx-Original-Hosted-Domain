import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log(prompt);
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "deepseek-r1-distill-llama-70b",
      temperature: 1,
      max_tokens: 200,
      top_p: 1,
      stream: false,
      stop: null,
    });

    let message = chatCompletion.choices[0]?.message?.content || "No response";

    message = message.replace(/<\/?think>/g, "");

    return NextResponse.json({ message: message });
  } catch (error) {
    console.error("Error generating response:", error.message);
    return NextResponse.json(
      { error: "Failed to generate response." },
      { status: 500 }
    );
  }
}
