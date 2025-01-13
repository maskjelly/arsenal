export interface TavilyImage {
  url: string;
  description: string;
  title : string;
}

export interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
  raw_content: string | null;
}

export interface QueryStrength{
  query : string , 
  strength : string 
}

export interface TavilySearchResponse {
  query: string;
  follow_up_questions: string[];
  answer: string | null;
  images: TavilyImage[];
  results: TavilySearchResult[];
  response_time: number;
}

export type SearchResult = 
  | { success: true; data: TavilySearchResponse; error?: never }
  | { success: false; error: string; data?: never };