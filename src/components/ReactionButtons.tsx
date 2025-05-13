
import React from 'react';
import { Button } from '@/components/ui/button';
import { saveReaction, getArticleReactions } from '@/services/openAiApi';
import { ThumbsUp, Brain, Bell } from 'lucide-react';

interface ReactionButtonsProps {
  articleUrl: string;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ articleUrl }) => {
  const [reactions, setReactions] = React.useState({
    like: 0,
    thinking: 0,
    clap: 0
  });
  
  React.useEffect(() => {
    // Get saved reactions
    const savedReactions = getArticleReactions(articleUrl);
    setReactions(savedReactions);
  }, [articleUrl]);
  
  const handleReaction = (type: 'like' | 'thinking' | 'clap') => {
    saveReaction(articleUrl, type);
    setReactions(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };
  
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1" 
        onClick={() => handleReaction('like')}
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{reactions.like > 0 ? reactions.like : ''}</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1" 
        onClick={() => handleReaction('thinking')}
      >
        <Brain className="h-4 w-4" />
        <span>{reactions.thinking > 0 ? reactions.thinking : ''}</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1" 
        onClick={() => handleReaction('clap')}
      >
        <Bell className="h-4 w-4" />
        <span>{reactions.clap > 0 ? reactions.clap : ''}</span>
      </Button>
    </div>
  );
};

export default ReactionButtons;
