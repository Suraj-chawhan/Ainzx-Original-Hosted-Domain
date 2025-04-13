import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt, plan } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPEN_AI}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        store: true,
        max_tokens: 150,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI Error:", data);
      return NextResponse.json({ success: false, error: data });
    }

    const aiResponse = data.choices?.[0]?.message?.content ?? "No response";

    return NextResponse.json({ success: true, message: aiResponse });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch AI response",
    });
  }
}
