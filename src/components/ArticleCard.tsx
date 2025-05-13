
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import type { NewsArticle } from '@/services/newsApi';

interface ArticleCardProps {
  article: NewsArticle;
  category?: string;
  showSummaryButton?: boolean;
  onSummaryClick?: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  category,
  showSummaryButton = true,
  onSummaryClick
}) => {
  // Create a URL-friendly slug from the title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  // Format the date to display time ago
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours === 1) {
      return '1 hour ago';
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      if (days === 1) return '1 day ago';
      return `${days} days ago`;
    }
  };

  const articlePath = `/article/${createSlug(article.title)}`;

  return (
    <Card className="overflow-hidden border rounded-lg transition-shadow hover:shadow-md h-full flex flex-col">
      <Link to={articlePath} state={{ article }}>
        <div className="aspect-video relative overflow-hidden bg-gray-100">
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {category && (
            <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
              {category}
            </span>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span className="font-medium">{article.source.name}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatTimeAgo(article.publishedAt)}
          </div>
        </div>
        
        <Link to={articlePath} state={{ article }}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {article.description || "Read the full article for more details."}
        </p>
      </CardContent>
      
      <CardFooter className="px-4 pb-4 pt-0 flex gap-2">
        <Link to={articlePath} state={{ article }} className="flex-grow">
          <Button variant="outline" className="w-full">Read</Button>
        </Link>
        
        {showSummaryButton && (
          <Button 
            variant="ghost" 
            className="flex-shrink-0"
            onClick={(e) => {
              e.preventDefault();
              onSummaryClick && onSummaryClick();
            }}
          >
            Quick Summary
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
