'use server'

import type { SearchResult, TavilySearchResponse } from '@/app/types/tavily'

const TAVILY_API_KEY = process.env.TAVAPI
export async function searchTavily(query: string): Promise<SearchResult> {
  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query,
        includeImage : true,
        
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json() as TavilySearchResponse
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Search error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    }
  }
}
