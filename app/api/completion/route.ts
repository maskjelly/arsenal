// app/api/chat/route.ts
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
const { tavily } = require("@tavily/core");

// Step 1. Instantiating your Tavily client
const APIKEY = process.env.TAVAPI;
const tvly = tavily({ apiKey: APIKEY });

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { prompt }: { prompt: string } = await req.json();
    const context = await tvly.searchContext(prompt);

    const combinedPrompt = `
Context: 
${context}

Question: 
${prompt}
    `;

    const result = await streamText({
      model: openai('gpt-4-turbo'),
      system: `
      As a professional search expert, you possess the ability to search for any information on the web.
For each user query, utilize the search results to their fullest potential to provide additional information and assistance in your response.
If there are any images relevant to your answer, be sure to include them as well.
Aim to directly address the user's question, augmenting your response with insights gleaned from the search results`,
      prompt: combinedPrompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(`Error: ${error}`, { status: 500 });
  }
}
