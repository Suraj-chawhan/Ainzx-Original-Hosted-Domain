import { CohereClientV2 } from "cohere-ai";

// Initialize Cohere client using the environment variable
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export async function POST(req, res) {
  try {
    const { prompt } = await req.json();

    const response = await cohere.chat({
      model: "command-r-plus",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return new Response(
      JSON.stringify({ message: response.message.content[0].text })
    );
  } catch (error) {
    console.error("Error communicating with Cohere:", error);

    return new Response(JSON.stringify({ message: "error" }));
  }
}
