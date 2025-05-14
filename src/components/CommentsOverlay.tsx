
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { saveComment, getArticleComments, ArticleComment } from '@/services/openAiApi';
import { v4 as uuidv4 } from 'uuid';

interface CommentsOverlayProps {
  articleUrl: string;
  selectedText: string;
  textPosition: { start: number, end: number };
  onClose: () => void;
}

// Predefined comment suggestions
const COMMENT_SUGGESTIONS = [
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
  onClose 
}) => {
  const [comment, setComment] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  useEffect(() => {
    // Hide suggestions when user starts typing
    if (comment.length > 0) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  }, [comment]);
  
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
          <div className="mt-2 flex flex-wrap gap-1">
            {COMMENT_SUGGESTIONS.map((suggestion, index) => (
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
