export interface TavilySearchResult {
    title: string;
    url: string;
    content: string;
    score: number;
    raw_content: string | null;
  }
  
  export interface TavilySearchResponse {
    query: string;
    follow_up_questions: string[] | null;
    answer: string | null;
    images: string[];
    results: TavilySearchResult[];
    response_time: number;
  }
  
  export type SearchResult = 
    | { success: true; data: TavilySearchResponse; error?: never }
    | { success: false; error: string; data?: never };
  
  