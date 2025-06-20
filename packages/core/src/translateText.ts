import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function translateText(text: string, source: string, target: string): Promise<string> {
  const prompt = `Translate from ${source} to ${target}: "${text}"`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return res.choices[0].message.content?.trim() ?? '';
} 