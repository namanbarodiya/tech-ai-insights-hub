
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ArticleCard from '@/components/ArticleCard';
import AISummaryModal from '@/components/AISummaryModal';
import { fetchTopTechNews, NewsArticle, TECH_CATEGORIES } from '@/services/newsApi';
import { toast } from "sonner";

const Index = () => {
  const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [summaryModalOpen, setSummaryModalOpen] = useState<boolean>(false);
  const [usingMockData, setUsingMockData] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await fetchTopTechNews();
        setAllArticles(articles);
        
        // Check if we're using mock data by looking at the first article's URL
        if (articles[0]?.url.includes('picsum.photos')) {
          setUsingMockData(true);
          toast.info("Using mock data due to News API restrictions", {
            duration: 6000,
            description: "News API free plan only works on localhost"
          });
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        toast.error('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Divide articles into sections
  const getForYouArticles = () => allArticles.slice(0, 3);
  const getTrendingArticles = () => allArticles.slice(3, 6);
  const getTopPicksArticles = () => allArticles.slice(6, 9);

  // Handle summary button click
  const handleSummaryClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setSummaryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container px-4 py-6 md:py-8">
        {usingMockData && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-100 rounded-md text-sm">
            <p className="font-medium">⚠️ Using mock data instead of live News API</p>
            <p className="text-gray-600">The free News API plan only allows requests from localhost, not deployed applications.</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* For You Section */}
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-bold">For You</h2>
                <span className="text-sm text-gray-500 ml-4">Personalized to your interests</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getForYouArticles().map((article) => (
                  <ArticleCard
                    key={article.url}
                    article={article}
                    category="AI & Tech"
                    onSummaryClick={() => handleSummaryClick(article)}
                  />
                ))}
              </div>
            </section>

            {/* Trending in Your Industry */}
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-bold">Trending in Your Industry</h2>
                <span className="text-sm text-gray-500 ml-4">Top stories in Enterprise Technology</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getTrendingArticles().map((article, index) => (
                  <ArticleCard
                    key={article.url}
                    article={article}
                    category={TECH_CATEGORIES[index % TECH_CATEGORIES.length]}
                    onSummaryClick={() => handleSummaryClick(article)}
                  />
                ))}
              </div>
            </section>

            {/* Editor's Top 5 Picks */}
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-bold">Top 5 Picks</h2>
                <span className="text-sm text-gray-500 ml-4">Editor's selection of must-read stories</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getTopPicksArticles().map((article, index) => (
                  <ArticleCard
                    key={article.url}
                    article={article}
                    category="Featured"
                    onSummaryClick={() => handleSummaryClick(article)}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* AI Summary Modal */}
      <AISummaryModal
        article={selectedArticle}
        isOpen={summaryModalOpen}
        onClose={() => setSummaryModalOpen(false)}
      />
    </div>
  );
};

export default Index;
