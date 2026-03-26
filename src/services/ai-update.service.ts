import OpenAI from "openai";
import { prisma } from "../lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY!,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export const updateFilesWithAI = async (
  projectId: string,
  userPrompt: string,
) => {
    try{
  const files = await prisma.file.findMany({
    where: { projectId },
  });
  if(!files || files.length == 0){
    throw new Error("No files found for this project")
  }
  const fileText = files.map((f) => `${f.name}:\n${f.content}`).join("\n\n");

  const completion = await openai.chat.completions.create({
    model: "google/gemma-2-9b-it",
    messages: [
      {
        role: "user",
        content: `
                You are a senior React developer.

You will be given project files.

Task:
- Modify code based on user request
- Always return FULL updated file content
- Escape all newlines as \\n
- Do NOT return partial snippets
- Update only necessary files
- Return ONLY valid JSON
- No explanation
- No markdown

IMPORTANT:
Return JSON using proper escaping (like JSON.stringify).

Example:
{
  "files": {
    "App.tsx": "export default function App() {\\n return <div>Hello</div>;\\n}"
  }
}

User request:
${userPrompt}

Files:
${fileText}
                `,
      },
    ],
    temperature: 0,
    max_tokens: 1500,
  });

  let text = completion.choices?.[0]?.message?.content ?? "";
  if(!text){
    throw new Error("Empty AI Response");
  }
  console.log('raw response:\n', text);
  text = text.replace(/```json|```/g, "").trim();

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Invalid AI response");
  let parsed;
    try {
      parsed = JSON.parse(match[0]);
    } catch (err) {
      console.warn("JSON parse failed, trying fallback...");

      const safeText = match[0]
        .replace(/\r/g, "")
        .replace(/\n/g, "\\n")
        .replace(/\t/g, "\\t");

      parsed = JSON.parse(safeText);
    }

    if (!parsed.files) {
      throw new Error("AI response missing 'files' field");
    }
  const updates = [];
  for (const [fileName, content] of Object.entries(parsed.files)) {
    const file = files.find((f) => f.name === fileName);
    if (!file) continue;
    const updated = await prisma.file.update({
      where: {
        id: file.id,
      },
      data: {
        content: content as string,
      },
    });
    updates.push(updated);
  }
  return updates;
} 
catch(error: any){
    console.error("AI UPDATE Error", error);
    throw error;
}
}
