'use server'
import type { SearchResult, TavilySearchResponse } from '../lib/types'

const TAVILY_API_KEY = process.env.TAVAPI

export async function searchTavily(query: string): Promise<SearchResult> {
  try {
    console.log('Making request to Tavily API...') // Debug log

    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TAVILY_API_KEY}`,  // Add auth header if required
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query,
        include_images: true,  // Change to include_images
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error:', errorText)  // Debug log
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    // console.log('API Response:', data)  // Debug log
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