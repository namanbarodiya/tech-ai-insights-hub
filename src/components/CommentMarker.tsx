
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import type { ArticleComment } from '@/services/openAiApi';

interface CommentMarkerProps {
  comment: ArticleComment;
}

const CommentMarker: React.FC<CommentMarkerProps> = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button 
          className="inline-flex items-center justify-center p-1 bg-primary bg-opacity-10 rounded-full hover:bg-opacity-20 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-3.5 w-3.5 text-primary" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3" align="start">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">{comment.author}</span>
            <span className="text-xs text-gray-500">
              {format(new Date(comment.timestamp), 'MMM d, h:mm a')}
            </span>
          </div>
          
          <blockquote className="text-xs italic border-l-2 border-gray-200 pl-2 py-1 text-gray-600 bg-gray-50">
            "{comment.selectedText}"
          </blockquote>
          
          <p className="text-sm">{comment.comment}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CommentMarker;

// Add date-fns package
<lov-add-dependency>date-fns</lov-add-dependency>
