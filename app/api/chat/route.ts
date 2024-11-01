import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { searchTavily } from '@/app/actions/action';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  // Get web search results
  const searchResult = await searchTavily(lastMessage, "advanced");
  
  let context = '';
  if (searchResult.success && searchResult.data) {
    context = `
Search Results:
${searchResult.data.answer || ''}
${searchResult.data.results?.map(r => `${r.title}\n${r.content}`).join('\n\n')}
    `.trim();
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. Use the provided search results to answer questions accurately. Include relevant information from the search results in your responses.',
      },
      ...messages,
      {
        role: 'assistant',
        content: `Here is some relevant context from the web:\n${context}`,
      },
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
} 