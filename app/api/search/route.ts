// app/api/tavily-search/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    const response = await fetch('https://api.tavily.com/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TAVILY_API_KEY}`,
      },
      body: JSON.stringify({
        query: query,
        search_depth: 'basic',
        include_images: true,
        max_results: 4 // Changed to 1 since we only need one image
      }),
    });

    const data = await response.json();
    
    return NextResponse.json({ images: data.images || [] });
  } catch (error) {
    console.error('Tavily API error:', error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}