import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
    const prompt = `Translate from ${sourceLang} to ${targetLang}: "${text}"`;

    const result = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
    });

    return result.choices[0].message.content?.trim() ?? "";
}
