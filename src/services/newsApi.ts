
import { toast } from "sonner";

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

const NEWS_API_KEY = "0b482b6aaefd47409008c612c94234fa";
const BASE_URL = "https://newsapi.org/v2";

// Fetch top headlines
export const fetchTopTechNews = async (): Promise<NewsArticle[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&category=technology&apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }
    
    const data: NewsResponse = await response.json();
    return data.articles.filter(article => article.urlToImage !== null);
  } catch (error) {
    console.error("Error fetching tech news:", error);
    toast.error("Failed to load latest news");
    return [];
  }
};

// Fetch news by search term
export const fetchNewsBySearch = async (query: string): Promise<NewsArticle[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }
    
    const data: NewsResponse = await response.json();
    return data.articles.filter(article => article.urlToImage !== null);
  } catch (error) {
    console.error(`Error searching news for "${query}":`, error);
    toast.error("Failed to search news");
    return [];
  }
};

// Mock categories to simulate trending industries
export const TECH_CATEGORIES = [
  "Artificial Intelligence",
  "Cloud Computing",
  "Cybersecurity",
  "Enterprise Tech",
  "Digital Transformation",
  "Tech Policy"
];

// Local storage keys
export const STORAGE_KEYS = {
  SUMMARIES: "etcio_summaries",
  COMMENTS: "etcio_comments",
  REACTIONS: "etcio_reactions"
};
