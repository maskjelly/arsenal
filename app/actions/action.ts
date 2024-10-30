'use server'
import type { QueryStrength, SearchResult, TavilySearchResponse } from '../lib/types'

const TAVILY_API_KEY = process.env.TAVAPI



export async function searchTavily(query: string, strength: string): Promise<SearchResult> {
  try {
    console.log('Making request to Tavily API...') // Debug log
    console.log(strength);

    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TAVILY_API_KEY}`,  // Add auth header if required
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query,
        "search_depth": `${strength}`,
        "include_images": true,
        "include_answer": true,
        "max_results": 6,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error:', errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    console.log(data.results.content)

    return {
      success: true,
      data: data as TavilySearchResponse,
    }
  } catch (error) {
    console.error('Search error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    }
  }
}
/**
 * 
 * // import { openai } from '@ai-sdk/openai';
// import { convertToCoreMessages, streamText } from 'ai';
// import { tavily } from '@tavily/core';
// const APIKEY = process.env.TAVAPI;
// const tvly = tavily({ apiKey: APIKEY });

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 60;

// export async function POST(req: Request) {
//   // Extract user messages from the request payload
//   const { messages } = await req.json();

//   // Extract the user's last message (the latest question or input)
//   const lastMessage = messages[messages.length - 1]?.content;

//   // Fetch relevant context using Tavily based on the user's last message
//   const context = await tvly.searchContext(lastMessage , {includeImages : true})
//   // Now i have to change the context to the new REST API for the context and also for the image 
  
  
//   // Prepare combined input with the user's message and retrieved context
//   const combinedMessages = [
//     ...messages,
//     context
//   ];

//   // Stream the result using OpenAI's GPT model
//   const result = await streamText({
//     model: openai('gpt-4-turbo'),
//     system: `As a professional search master , you can output in BEAUTIFUL STYLISH MARKDOWN OUTPUT STRICTLY and with ANY LINKS and their PREVIEW POSSIBLE , you possess the ability to search for any information on the web. For each user query, utilize the search results to their fullest potential to provide additional information and assistance in your response. Summarize and answer based on what you have been asked.`,
//     messages: convertToCoreMessages(combinedMessages),
//   });

//   // Return the result as a streaming response
//   return result.toDataStreamResponse();
// }


 */