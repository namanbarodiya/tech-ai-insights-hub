
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ArticleComment } from '@/services/openAiApi';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ThumbsUp, Reply } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';

interface CommentsListProps {
  comments: ArticleComment[];
  articleUrl: string;
  onAddComment: (comment: ArticleComment) => void;
  onUpdateComment: (comment: ArticleComment) => void;
}

const CommentsList: React.FC<CommentsListProps> = ({ 
  comments, 
  articleUrl, 
  onAddComment,
  onUpdateComment
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  // Function to get initials from a name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleLike = (comment: ArticleComment) => {
    onUpdateComment({
      ...comment,
      likes: (comment.likes || 0) + 1
    });
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    const comment: ArticleComment = {
      id: uuidv4(),
      articleUrl,
      comment: newComment,
      author: 'Anonymous User',
      timestamp: Date.now(),
      likes: 0,
      selectedText: '',
      textPosition: { start: 0, end: 0 },
    };
    
    onAddComment(comment);
    setNewComment('');
  };

  const handleReply = (commentId: string) => {
    setReplyTo(replyTo === commentId ? null : commentId);
  };

  const handleSubmitReply = (parentComment: ArticleComment) => {
    if (!newComment.trim()) return;
    
    const reply: ArticleComment = {
      id: uuidv4(),
      articleUrl,
      comment: newComment,
      author: 'Anonymous User',
      timestamp: Date.now(),
      likes: 0,
      selectedText: '',
      textPosition: { start: 0, end: 0 },
      parentId: parentComment.id
    };
    
    onAddComment(reply);
    setNewComment('');
    setReplyTo(null);
  };

  // Group comments into threads
  const rootComments = comments.filter(comment => !comment.parentId);
  const replies = comments.filter(comment => comment.parentId);

  const getCommentReplies = (commentId: string) => {
    return replies.filter(reply => reply.parentId === commentId);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      
      {/* New comment input */}
      <div className="flex gap-3 mb-8">
        <Avatar className="h-8 w-8">
          <div className="bg-primary text-white rounded-full h-full w-full flex items-center justify-center text-sm">
            A
          </div>
        </Avatar>
        <div className="flex-1">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full mb-2"
          />
          <div className="flex justify-end">
            <Button 
              size="sm"
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
      
      {/* Display comments */}
      {rootComments.length === 0 ? (
        <div className="text-center text-gray-500 py-6">
          Be the first to comment on this article
        </div>
      ) : (
        <div className="space-y-6">
          {rootComments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <div className="bg-primary text-white rounded-full h-full w-full flex items-center justify-center text-sm">
                    {getInitials(comment.author)}
                  </div>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-500">
                      {format(new Date(comment.timestamp), 'MMM d, h:mm a')}
                    </span>
                  </div>
                  
                  {comment.selectedText && (
                    <blockquote className="text-xs italic border-l-2 border-gray-200 pl-2 py-1 mb-2 text-gray-600 bg-gray-50">
                      "{comment.selectedText}"
                    </blockquote>
                  )}
                  
                  <p className="text-sm mb-2">{comment.comment}</p>
                  
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-auto p-0 text-xs flex items-center gap-1 text-gray-500 hover:text-gray-700"
                      onClick={() => handleLike(comment)}
                    >
                      <ThumbsUp size={14} />
                      <span>{comment.likes || 0} Like{(comment.likes !== 1) ? 's' : ''}</span>
                    </Button>
                    
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs flex items-center gap-1 text-gray-500 hover:text-gray-700"
                      onClick={() => handleReply(comment.id)}
                    >
                      <Reply size={14} />
                      <span>Reply</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Replies */}
              {getCommentReplies(comment.id).length > 0 && (
                <div className="pl-11 space-y-4">
                  {getCommentReplies(comment.id).map(reply => (
                    <div key={reply.id} className="flex gap-3">
                      <Avatar className="h-7 w-7">
                        <div className="bg-gray-200 text-gray-700 rounded-full h-full w-full flex items-center justify-center text-xs">
                          {getInitials(reply.author)}
                        </div>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{reply.author}</span>
                          <span className="text-xs text-gray-500">
                            {format(new Date(reply.timestamp), 'MMM d, h:mm a')}
                          </span>
                        </div>
                        
                        <p className="text-sm mb-2">{reply.comment}</p>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-auto p-0 text-xs flex items-center gap-1 text-gray-500 hover:text-gray-700"
                          onClick={() => handleLike(reply)}
                        >
                          <ThumbsUp size={14} />
                          <span>{reply.likes || 0} Like{(reply.likes !== 1) ? 's' : ''}</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Reply input */}
              {replyTo === comment.id && (
                <div className="pl-11 flex gap-3">
                  <Avatar className="h-7 w-7">
                    <div className="bg-gray-200 text-gray-700 rounded-full h-full w-full flex items-center justify-center text-xs">
                      A
                    </div>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => setReplyTo(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleSubmitReply(comment)}
                        disabled={!newComment.trim()}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
