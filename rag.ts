import { OpenAI } from 'openai';
import { getEmbedding } from './embeddings';
import { searchSimilar } from './vectorDB';

const openai = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENAI_API_KEY || '',
  defaultHeaders: {
    'HTTP-Referer': 'https://youhanasheriff.com',
    'X-Title': 'PDF Info Retrieve | Youhana Sheriff',
  },
});

export async function ragQuery(question: string): Promise<string> {
  // 1. Embed question
  const embedding = await getEmbedding(question);

  // 2. Retrieve context
  const context = searchSimilar(embedding)
    .map(doc => doc.text)
    .join('\n---\n');

  // 3. Generate answer
  const response = await openai.chat.completions.create({
    model: process.env.AI_MODEL || 'deepseek/deepseek-chat-v3-0324',
    messages: [
      { role: 'system', content: 'Answer using this context:\n' + context },
      { role: 'user', content: question },
    ],
  });

  return response.choices[0]?.message?.content || 'No answer';
}
