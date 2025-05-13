
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import AISummaryModal from '@/components/AISummaryModal';
import AskAIDialog from '@/components/AskAIDialog';
import CommentsOverlay from '@/components/CommentsOverlay';
import CommentMarker from '@/components/CommentMarker';
import ReactionButtons from '@/components/ReactionButtons';
import { getArticleComments, ArticleComment } from '@/services/openAiApi';
import { NewsArticle } from '@/services/newsApi';
import { Clock, User } from 'lucide-react';

const ArticleDetail = () => {
  const location = useLocation();
  const { slug } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [askAIDialogOpen, setAskAIDialogOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [textPosition, setTextPosition] = useState({ start: 0, end: 0 });
  const [showCommentOverlay, setShowCommentOverlay] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const articleContentRef = useRef<HTMLDivElement>(null);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    // Get article from location state if available
    if (location.state?.article) {
      setArticle(location.state.article);
    } else {
      // In a real app, we would fetch the article based on the slug
      console.log("Article not found in state, would fetch from API using slug:", slug);
      // For MVP, we'll redirect to home if no article is found
      if (!location.state?.article) {
        window.location.href = '/';
      }
    }
  }, [location.state, slug]);

  useEffect(() => {
    if (article) {
      // Load comments for this article
      const articleComments = getArticleComments(article.url);
      setComments(articleComments);
    }
  }, [article]);

  // Handle text selection for comments
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !articleContentRef.current) return;
      
      // Check if selection is within the article content
      let node = selection.anchorNode;
      while (node) {
        if (node === articleContentRef.current) break;
        node = node.parentNode;
      }
      
      // If not within article content, ignore
      if (!node) return;
      
      const selectedText = selection.toString().trim();
      if (selectedText.length < 5) return; // Require a minimum selection length
      
      // Get selection coordinates for positioning the overlay
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setSelectedText(selectedText);
      setTextPosition({ 
        start: range.startOffset, 
        end: range.endOffset 
      });
      setOverlayPosition({ 
        x: rect.right + window.scrollX, 
        y: rect.bottom + window.scrollY 
      });
      setShowCommentOverlay(true);
    };
    
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container px-4 py-12">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading article...</div>
          </div>
        </div>
      </div>
    );
  }

  // Prepare content with comment markers
  const prepareContentWithComments = (content: string) => {
    if (!content || comments.length === 0) return <p>{content || 'No content available'}</p>;
    
    // For simplicity in this MVP, we'll just return the content with comments at the end
    // In a real implementation, we would insert comment markers at their exact positions
    return (
      <div>
        <p>{content}</p>
        {comments.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-sm font-semibold mb-2">Comments</h3>
            <div className="space-y-2">
              {comments.map(comment => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded-md">
                  <blockquote className="text-xs italic mb-2 border-l-2 border-primary pl-2">
                    "{comment.selectedText}"
                  </blockquote>
                  <p className="text-sm">{comment.comment}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    By {comment.author} • {new Date(comment.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container px-4 py-6 md:py-8">
        <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
          {/* Article Header */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{article.author || 'ETCIO Staff'}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div>
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {article.source.name}
                </span>
              </div>
            </div>
            
            {/* Featured Image */}
            {article.urlToImage && (
              <div className="mb-6">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            )}
            
            {/* AI Feature Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => setSummaryModalOpen(true)}
              >
                <span className="mr-2">AI Summary</span>
                <span className="bg-primary text-white text-xs p-1 rounded">AI</span>
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center"
                onClick={() => setAskAIDialogOpen(true)}
              >
                <span className="mr-2">Ask AI</span>
                <span className="bg-primary text-white text-xs p-1 rounded">AI</span>
              </Button>
            </div>
          </header>
          
          {/* Article Content */}
          <div 
            ref={articleContentRef}
            className="prose max-w-none mb-6"
          >
            {prepareContentWithComments(article.content || article.description || 'No content available')}
          </div>
          
          {/* Article Footer */}
          <footer className="border-t pt-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <ReactionButtons articleUrl={article.url} />
              
              <div className="text-sm text-gray-500">
                Share this article
              </div>
            </div>
          </footer>
        </article>
        
        {/* Related Articles Section */}
        <section className="max-w-3xl mx-auto mt-8">
          <h2 className="text-xl font-bold mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2 line-clamp-2">
                Related article placeholder - in a real app, we'd show actual related content
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                This would be a short description of a related article based on this content.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2 line-clamp-2">
                Another related article would appear here
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                This would be a short description of another related article.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      {/* AI Summary Modal */}
      <AISummaryModal
        article={article}
        isOpen={summaryModalOpen}
        onClose={() => setSummaryModalOpen(false)}
      />
      
      {/* Ask AI Dialog */}
      <AskAIDialog
        article={article}
        isOpen={askAIDialogOpen}
        onClose={() => setAskAIDialogOpen(false)}
      />
      
      {/* Comments Overlay */}
      {showCommentOverlay && (
        <div 
          style={{ 
            position: 'absolute', 
            left: `${overlayPosition.x}px`, 
            top: `${overlayPosition.y}px`,
            zIndex: 1000 
          }}
        >
          <CommentsOverlay
            articleUrl={article.url}
            selectedText={selectedText}
            textPosition={textPosition}
            onClose={() => setShowCommentOverlay(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
