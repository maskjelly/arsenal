interface Source {
    title: string;
    domain: string;
    url: string;
    snippet: string;
    imageUrl?: string;
  }
  
  interface ChatResponse {
    content: string;
    sources: Source[];
  }
  interface TavilySearchOptions {
    includeDomains?: string[];
    excludeDomains?: string[];
    maxResults?: number;
    searchDepth?: 'basic' | 'advanced';
    topic?: string;
  }

  interface TavilySearchResult {
    title: string;
    url: string;
    content: string;  // Tavily uses 'content' instead of 'snippet'
    image_url?: string;
    score: number;
    published_date?: string;
    source_domain?: string;
  }