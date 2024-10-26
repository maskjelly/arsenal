import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
const { tavily } = require('@tavily/core');
const APIKEY = process.env.TAVAPI;
const tvly = tavily({ apiKey: APIKEY });

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  // Extract user messages from the request payload
  const { messages } = await req.json();

  // Extract the user's last message (the latest question or input)
  const lastMessage = messages[messages.length - 1]?.content;

  // Fetch relevant context using Tavily based on the user's last message
  const context = await tvly.searchContext(lastMessage);

  // Prepare combined input with the user's message and retrieved context
  const combinedMessages = [
    ...messages,
    { role: 'system', content: `Context information: ${context}` },
  ];

  // Stream the result using OpenAI's GPT model
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system: `As a professional search master , you can output in BEAUTIFUL STYLISH MARKDOWN OUTPUT STRICTLY and with ANY LINKS and their PREVIEW POSSIBLE , you possess the ability to search for any information on the web. For each user query, utilize the search results to their fullest potential to provide additional information and assistance in your response. Summarize and answer based on what you have been asked.`,
    messages: convertToCoreMessages(combinedMessages),
  });

  // Return the result as a streaming response
  return result.toDataStreamResponse();
}
