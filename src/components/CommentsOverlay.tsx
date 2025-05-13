
import React, { useState } from 'react';
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

const CommentsOverlay: React.FC<CommentsOverlayProps> = ({ 
  articleUrl, 
  selectedText, 
  textPosition, 
  onClose 
}) => {
  const [comment, setComment] = useState('');
  
  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    
    const newComment: ArticleComment = {
      id: uuidv4(),
      articleUrl,
      selectedText,
      textPosition,
      comment,
      author: 'Anonymous User',
      timestamp: Date.now()
    };
    
    saveComment(newComment);
    toast.success("Comment added successfully");
    setComment('');
    onClose();
  };
  
  return (
    <Card className="absolute z-10 p-4 shadow-lg bg-white w-80">
      <div className="mb-2">
        <div className="text-sm font-medium mb-1">Selected text:</div>
        <blockquote className="text-gray-600 text-xs italic border-l-2 border-primary pl-2 my-1">
          {selectedText.length > 120 ? selectedText.substring(0, 120) + '...' : selectedText}
        </blockquote>
      </div>
      
      <div className="mb-4">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comment..."
          className="w-full"
        />
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

// Add the uuid package
<lov-add-dependency>uuid</lov-add-dependency>
