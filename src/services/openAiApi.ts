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
  textPosition: { start: number, end: number };
  comment: string;
  author: string;
  timestamp: number;
  likes?: number;
  parentId?: string;
}

// Interface for article reaction
export interface ArticleReaction {
  articleUrl: string;
  reactionType: 'like' | 'thinking' | 'clap';
  count: number;
}

// Together.ai API key
const TOGETHER_AI_API_KEY = "2a96dc3950262713ac195aebd099467750d785b0208daa9825babbbb85aaf4a0";
const TOGETHER_AI_MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1";

// Real AI summary generation using Together.ai
export const generateArticleSummary = async (articleTitle: string, articleContent: string): Promise<string[]> => {
  console.log("Generating real summary for:", articleTitle);
  
  try {
    const response = await fetch("https://api.together.xyz/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOGETHER_AI_API_KEY}`
      },
      body: JSON.stringify({
        model: TOGETHER_AI_MODEL,
        prompt: `Please summarize the following article in 4 concise bullet points that capture the main ideas.
        
        Title: ${articleTitle}
        Content: ${articleContent}
        
        Format your response as four separate bullet points without any introduction or conclusion.`,
        max_tokens: 500,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Parse the bullet points from the response
    const bulletText = data.choices[0]?.text || "";
    const bulletPoints = bulletText
      .split(/[-•*]\s?/)
      .map(point => point.trim())
      .filter(point => point.length > 5)
      .slice(0, 4);
    
    // If we didn't get enough valid bullet points, return a fallback
    if (bulletPoints.length < 2) {
      return [
        `Summary of "${articleTitle}"`,
        "The article discusses developments in technology relevant to enterprise settings.",
        "Key points include implementation strategies and business impacts.",
        "Further details are available in the full article."
      ];
    }
    
    return bulletPoints;
  } catch (error) {
    console.error("Error generating summary with Together.ai:", error);
    toast.error("Failed to generate AI summary");
    
    // Return fallback summary
    return [
      `Summary of "${articleTitle}"`,
      "The article discusses developments in technology relevant to enterprise settings.",
      "Key points include implementation strategies and business impacts.",
      "Further details are available in the full article."
    ];
  }
};

// Real AI chat response generation using Together.ai
export const generateAIResponse = async (messages: ChatMessage[], articleContext: string): Promise<string> => {
  console.log("Generating real AI response for chat");
  
  try {
    // Prepare conversation history for the API
    const latestUserMessage = messages.filter(msg => msg.role === 'user').pop()?.content || "";
    
    // Format the prompt with article context
    const prompt = `You are a helpful AI assistant answering questions about news articles. 
    
    Article Context: ${articleContext}
    
    User Question: ${latestUserMessage}
    
    Provide a concise, helpful answer based on the article content.`;
    
    const response = await fetch("https://api.together.xyz/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${TOGETHER_AI_API_KEY}`
      },
      body: JSON.stringify({
        model: TOGETHER_AI_MODEL,
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.text?.trim() || "";
    
    if (!aiResponse) {
      throw new Error("Empty response from AI");
    }
    
    return aiResponse;
  } catch (error) {
    console.error("Error generating AI response with Together.ai:", error);
    toast.error("Failed to generate AI response");
    return "I'm sorry, I encountered an error processing your question. Please try again.";
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
