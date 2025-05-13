
import { toast } from "sonner";

// Interface for AI summary
export interface AISummary {
  articleUrl: string;
  points: string[];
  generatedAt: number; // timestamp
}

// Interface for AI chat message
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Interface for article comment
export interface ArticleComment {
  id: string;
  articleUrl: string;
  selectedText: string;
  textPosition: { start: number; end: number };
  comment: string;
  author: string;
  timestamp: number;
}

// Interface for article reaction
export interface ArticleReaction {
  articleUrl: string;
  reactionType: 'like' | 'thinking' | 'clap';
  count: number;
}

// Mock AI summary generation
export const generateArticleSummary = async (articleTitle: string, articleContent: string): Promise<string[]> => {
  // In a real implementation, this would call the OpenAI API
  console.log("Generating summary for:", articleTitle);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For the MVP, we'll return mock summaries based on the article content
  let points: string[];
  
  if (articleContent.includes("AI") || articleTitle.includes("AI")) {
    points = [
      "The article discusses advancements in artificial intelligence technology and its applications in business settings.",
      "Key developments include new machine learning algorithms that improve accuracy by up to 30% compared to previous models.",
      "Several enterprises reported significant cost savings after implementing AI solutions for routine processes.",
      "Experts predict AI adoption will accelerate across industries over the next 12-18 months."
    ];
  } else if (articleContent.includes("cloud") || articleTitle.includes("Cloud")) {
    points = [
      "Major cloud service providers announced new enterprise-focused features for their platforms.",
      "The article highlights cost optimization strategies for complex cloud infrastructures.",
      "Security enhancements were a central focus of recent cloud platform updates.",
      "Industry analysts project 35% growth in enterprise cloud adoption by next year."
    ];
  } else if (articleContent.includes("cyber") || articleTitle.includes("Security")) {
    points = [
      "New cybersecurity threats have emerged targeting remote work infrastructure.",
      "The article details best practices for strengthening enterprise security posture.",
      "Recent attacks have demonstrated vulnerabilities in commonly used business applications.",
      "Security experts recommend a multi-layered approach combining technological and human factors."
    ];
  } else {
    points = [
      "The article covers recent technological developments relevant to IT decision-makers.",
      "Key points include cost considerations and implementation strategies for enterprise settings.",
      "Several case studies demonstrate successful digital transformation initiatives.",
      "Industry experts provide insights on best practices and future technology trends."
    ];
  }
  
  return points;
};

// Mock AI chat response generation
export const generateAIResponse = async (messages: ChatMessage[], articleContext: string): Promise<string> => {
  // In a real implementation, this would call the OpenAI API with the article context
  console.log("Generating AI response for chat");
  
  const lastMessage = messages[messages.length - 1];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple keyword-based responses for the MVP
  const userQuestion = lastMessage.content.toLowerCase();
  
  if (userQuestion.includes("summary") || userQuestion.includes("summarize")) {
    return "This article covers key developments in enterprise technology, focusing on implementation strategies, cost considerations, and potential business impacts.";
  } 
  else if (userQuestion.includes("who") || userQuestion.includes("author")) {
    return "This article was written by a technology journalist specializing in enterprise IT solutions.";
  }
  else if (userQuestion.includes("when") || userQuestion.includes("published")) {
    return "This article was published recently, within the last week.";
  }
  else if (userQuestion.includes("why") || userQuestion.includes("importance")) {
    return "This technology is important because it can significantly impact operational efficiency, cost management, and competitive advantage for enterprises.";
  }
  else if (userQuestion.includes("how") || userQuestion.includes("implement")) {
    return "Implementation typically involves assessing current systems, developing a strategic roadmap, securing executive buy-in, running pilot programs, and planning for organization-wide deployment.";
  }
  else {
    return "Based on the article, this technology represents a significant advancement for enterprise IT. Organizations implementing these solutions should consider their specific business needs, existing infrastructure, and long-term technology strategy.";
  }
};

// Store and retrieve summaries from localStorage
export const storeSummary = (articleUrl: string, points: string[]): void => {
  try {
    const existingSummaries = JSON.parse(localStorage.getItem('etcio_summaries') || '{}');
    existingSummaries[articleUrl] = {
      points,
      generatedAt: Date.now()
    };
    localStorage.setItem('etcio_summaries', JSON.stringify(existingSummaries));
  } catch (error) {
    console.error("Error storing summary:", error);
  }
};

export const getSavedSummary = (articleUrl: string): AISummary | null => {
  try {
    const summaries = JSON.parse(localStorage.getItem('etcio_summaries') || '{}');
    return summaries[articleUrl] || null;
  } catch (error) {
    console.error("Error retrieving summary:", error);
    return null;
  }
};

// Store and retrieve comments from localStorage
export const saveComment = (comment: ArticleComment): void => {
  try {
    const existingComments = JSON.parse(localStorage.getItem('etcio_comments') || '[]');
    existingComments.push(comment);
    localStorage.setItem('etcio_comments', JSON.stringify(existingComments));
  } catch (error) {
    console.error("Error saving comment:", error);
    toast.error("Failed to save your comment");
  }
};

export const getArticleComments = (articleUrl: string): ArticleComment[] => {
  try {
    const comments = JSON.parse(localStorage.getItem('etcio_comments') || '[]');
    return comments.filter((comment: ArticleComment) => comment.articleUrl === articleUrl);
  } catch (error) {
    console.error("Error retrieving comments:", error);
    return [];
  }
};

// Store and retrieve reactions from localStorage
export const saveReaction = (articleUrl: string, reactionType: 'like' | 'thinking' | 'clap'): void => {
  try {
    const existingReactions = JSON.parse(localStorage.getItem('etcio_reactions') || '{}');
    
    if (!existingReactions[articleUrl]) {
      existingReactions[articleUrl] = {
        like: 0,
        thinking: 0,
        clap: 0
      };
    }
    
    existingReactions[articleUrl][reactionType]++;
    localStorage.setItem('etcio_reactions', JSON.stringify(existingReactions));
  } catch (error) {
    console.error("Error saving reaction:", error);
  }
};

export const getArticleReactions = (articleUrl: string): {like: number, thinking: number, clap: number} => {
  try {
    const reactions = JSON.parse(localStorage.getItem('etcio_reactions') || '{}');
    return reactions[articleUrl] || {like: 0, thinking: 0, clap: 0};
  } catch (error) {
    console.error("Error retrieving reactions:", error);
    return {like: 0, thinking: 0, clap: 0};
  }
};
