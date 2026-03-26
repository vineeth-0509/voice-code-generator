import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY!,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export const extractAppDetails = async (userPrompt: string) => {
  try {
    const lower = userPrompt.toLowerCase();
    if (lower.includes("chat") || lower.includes("message")) {
      return { type: "chat", features: ["messaging"] };
    }

    if (lower.includes("blog") || lower.includes("article")) {
      return { type: "blog", features: [] };
    }

    if (lower.includes("portfolio")) {
      return { type: "portfolio", features: [] };
    }

    if (lower.includes("todo") || lower.includes("task")) {
      return { type: "todo", features: [] };
    }
    const completion = await openai.chat.completions.create({
      model: "google/gemma-2-9b-it",
      messages: [
        {
          role: "system",
          content: `
                  You are a strict JSON generator.

Allowed types:
- todo
- blog
- portfolio
- chat

Return ONLY JSON:
{
  "type": "",
  "features": []
}
                    `,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0,
      max_tokens: 200,
    });
    let text = completion.choices?.[0]?.message.content || "";
    text = text.replace(/```json|```/g, "").trim();

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Invalid JSON");

    return JSON.parse(match[0]);
  } catch (error) {
    console.error("AI ERROR:", error);

    return {
      type: "todo",
      features: [],
    };
  }
};
