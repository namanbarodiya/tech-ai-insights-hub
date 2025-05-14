import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { saveComment, getArticleComments, ArticleComment, generateAIResponse } from '@/services/openAiApi';
import { v4 as uuidv4 } from 'uuid';
import { Loader2 } from 'lucide-react';

interface CommentsOverlayProps {
  articleUrl: string;
  selectedText: string;
  textPosition: { start: number, end: number };
  onClose: () => void;
  articleContent?: string; // Add article content for AI suggestions
}

// Default comment suggestions as fallback
const DEFAULT_COMMENT_SUGGESTIONS = [
  "Great insights!",
  "Interesting perspective...",
  "How will this impact the industry?",
  "Thanks for sharing!",
  "I disagree because...",
  "This reminds me of...",
  "Could you elaborate more on...",
];

const CommentsOverlay: React.FC<CommentsOverlayProps> = ({ 
  articleUrl, 
  selectedText, 
  textPosition, 
  onClose,
  articleContent = '' 
}) => {
  const [comment, setComment] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [commentSuggestions, setCommentSuggestions] = useState<string[]>(DEFAULT_COMMENT_SUGGESTIONS);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  
  useEffect(() => {
    // Hide suggestions when user starts typing
    if (comment.length > 0) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  }, [comment]);
  
  // Generate AI-powered comment suggestions based on selected text and article
  useEffect(() => {
    const generateCommentSuggestions = async () => {
      if (!selectedText || selectedText.length < 10) return;
      
      setIsLoadingSuggestions(true);
      
      try {
        const prompt = `Based on this selected text from an article: "${selectedText}"
        
        Generate 5 diverse, thoughtful comment suggestions that a reader might make. Each suggestion should be concise (under 10 words) and conversational. Include a mix of questions, agreements, disagreements, and requests for more information.
        
        Format your response as 5 separate suggestions separated by line breaks.`;
        
        const aiResponse = await generateAIResponse([
          { role: 'user', content: prompt }
        ], articleContent || selectedText);
        
        // Parse the response to extract comment suggestions
        const suggestions = aiResponse
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0 && !line.startsWith('Suggestion') && !line.match(/^\d+\./))
          .slice(0, 5);
        
        if (suggestions.length >= 3) {
          setCommentSuggestions(suggestions);
        }
      } catch (error) {
        console.error('Error generating AI comment suggestions:', error);
        // Keep default suggestions if AI generation fails
      } finally {
        setIsLoadingSuggestions(false);
      }
    };
    
    generateCommentSuggestions();
  }, [selectedText, articleContent]);
  
  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    
    const newComment: ArticleComment = {
      id: uuidv4(),
      articleUrl,
      selectedText,
      textPosition,
      comment,
      author: 'Anonymous User',
      timestamp: Date.now(),
      likes: 0,
    };
    
    saveComment(newComment);
    toast.success("Comment added successfully");
    setComment('');
    onClose();
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setComment(suggestion);
    setShowSuggestions(false);
  };
  
  return (
    <Card className="absolute z-10 p-4 shadow-lg bg-white w-80">
      <div className="mb-2">
        <div className="text-sm font-medium mb-1">Selected text:</div>
        <blockquote className="text-gray-600 text-xs italic border-l-2 border-primary pl-2 my-1">
          {selectedText.length > 120 ? selectedText.substring(0, 120) + '...' : selectedText}
        </blockquote>
      </div>
      
      <div className="mb-4 relative">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comment..."
          className="w-full"
        />
        
        {showSuggestions && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs text-gray-500">AI Comment Suggestions</p>
              {isLoadingSuggestions && (
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {commentSuggestions.map((suggestion, index) => (
                <Button 
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs py-1 h-auto bg-gray-50 hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSubmitComment} disabled={!comment.trim()}>
          Comment
        </Button>
      </div>
    </Card>
  );
};

export default CommentsOverlay;
