
import { NewsArticle } from './newsApi';

// Mock technology news articles
export const mockTechArticles: NewsArticle[] = [
  {
    source: {
      id: 'techcrunch',
      name: 'TechCrunch'
    },
    author: 'Sarah Perez',
    title: 'AI Advances Push Tech Industry into New Era of Innovation',
    description: 'Recent breakthroughs in artificial intelligence are driving unprecedented innovation across the technology sector, with companies racing to implement new capabilities.',
    url: 'https://techcrunch.com/ai-advances',
    urlToImage: 'https://picsum.photos/800/400?random=1',
    publishedAt: '2025-05-10T14:32:00Z',
    content: 'Recent breakthroughs in artificial intelligence are driving unprecedented innovation across the technology sector, with companies racing to implement new capabilities. Experts suggest this marks the beginning of a new technological era that will transform industries from healthcare to finance. "What we\'re seeing now is just the tip of the iceberg," said AI researcher Dr. Emily Chen. "The applications being developed today will fundamentally change how businesses operate within the next five years."'
  },
  {
    source: {
      id: 'wired',
      name: 'Wired'
    },
    author: 'David Pierce',
    title: 'Cloud Computing Giants Announce Major Infrastructure Investments',
    description: 'The leading cloud providers unveiled plans for massive infrastructure expansions to meet growing enterprise demand for AI and machine learning capabilities.',
    url: 'https://wired.com/cloud-investments',
    urlToImage: 'https://picsum.photos/800/400?random=2',
    publishedAt: '2025-05-11T09:15:00Z',
    content: 'The leading cloud providers unveiled plans for massive infrastructure expansions to meet growing enterprise demand for AI and machine learning capabilities. With investments exceeding $50 billion collectively, these expansions aim to address the computational requirements of next-generation applications. The announcements come as businesses across sectors increasingly rely on cloud infrastructure for their most demanding workloads, driving unprecedented growth in the market.'
  },
  {
    source: {
      id: 'theverge',
      name: 'The Verge'
    },
    author: 'Tom Warren',
    title: 'Cybersecurity Threats Evolve as Attackers Target Enterprise Networks',
    description: 'A new report highlights the increasing sophistication of cyber attacks targeting enterprise infrastructure, with AI-powered threats leading the way.',
    url: 'https://theverge.com/cybersecurity-threats',
    urlToImage: 'https://picsum.photos/800/400?random=3',
    publishedAt: '2025-05-09T16:45:00Z',
    content: 'A new report highlights the increasing sophistication of cyber attacks targeting enterprise infrastructure, with AI-powered threats leading the way. Security researchers have documented a 300% increase in attacks using machine learning to evade traditional defenses. "We\'re seeing attack patterns that adapt in real-time to security measures," explained cybersecurity analyst Michael Rodriguez. "This represents a significant evolution in the threat landscape that CIOs need to address immediately."'
  },
  {
    source: {
      id: 'forbes',
      name: 'Forbes'
    },
    author: 'Amy Webb',
    title: 'Digital Transformation Accelerates Across Manufacturing Sector',
    description: 'Manufacturing companies are embracing digital technologies at unprecedented rates, with IoT and automation leading adoption trends.',
    url: 'https://forbes.com/manufacturing-digital',
    urlToImage: 'https://picsum.photos/800/400?random=4',
    publishedAt: '2025-05-12T11:20:00Z',
    content: 'Manufacturing companies are embracing digital technologies at unprecedented rates, with IoT and automation leading adoption trends. A recent industry survey found that 78% of manufacturing executives consider digital transformation their top strategic priority, up from 45% just two years ago. The shift is driven by competitive pressures and the need to address ongoing supply chain challenges. Companies implementing these technologies report productivity increases averaging 23% within the first year.'
  },
  {
    source: {
      id: 'wsj',
      name: 'Wall Street Journal'
    },
    author: 'Joanna Stern',
    title: 'Tech Policy Takes Center Stage as Regulations Evolve Globally',
    description: 'Technology policy is becoming increasingly complex as governments worldwide introduce new regulatory frameworks for AI, data privacy, and platform governance.',
    url: 'https://wsj.com/tech-policy',
    urlToImage: 'https://picsum.photos/800/400?random=5',
    publishedAt: '2025-05-08T08:30:00Z',
    content: 'Technology policy is becoming increasingly complex as governments worldwide introduce new regulatory frameworks for AI, data privacy, and platform governance. The EU\'s comprehensive AI Act, set to take effect next year, establishes tiered regulations based on risk levels. Meanwhile, the US has introduced its own approach focusing on sector-specific guidelines. "Companies now face a patchwork of regulations that vary significantly by region," noted policy expert Lisa Thompson. "This creates substantial compliance challenges for multinational tech enterprises."'
  },
  {
    source: {
      id: 'cnet',
      name: 'CNET'
    },
    author: 'Dan Ackerman',
    title: 'Enterprise Cloud Costs Rise as AI Workloads Increase',
    description: 'IT departments are facing budget pressures as AI implementations drive up cloud computing costs significantly.',
    url: 'https://cnet.com/enterprise-cloud',
    urlToImage: 'https://picsum.photos/800/400?random=6',
    publishedAt: '2025-05-10T10:15:00Z',
    content: 'IT departments are facing budget pressures as AI implementations drive up cloud computing costs significantly. A recent survey of CIOs revealed that 65% have exceeded their cloud budgets in the past year, primarily due to AI and machine learning workloads. "The computational requirements for these technologies far exceed traditional applications," explained cloud economist Jennifer Martinez. "Organizations need to implement specialized cost management strategies to avoid unexpected expenditures."'
  },
  {
    source: {
      id: 'zdnet',
      name: 'ZDNet'
    },
    author: 'Larry Dignan',
    title: 'Quantum Computing Makes Strides Toward Practical Business Applications',
    description: 'Quantum computing is moving from theoretical research to practical applications, with several major breakthroughs announced this month.',
    url: 'https://zdnet.com/quantum-computing',
    urlToImage: 'https://picsum.photos/800/400?random=7',
    publishedAt: '2025-05-09T13:40:00Z',
    content: 'Quantum computing is moving from theoretical research to practical applications, with several major breakthroughs announced this month. Financial services firms are leading adoption, using quantum algorithms to optimize portfolio management and risk assessment. "We\'ve reached an inflection point where quantum systems can solve specific business problems better than classical computers," said quantum researcher Dr. Robert Chang. "While we\'re not yet at fault-tolerant quantum computing, these early applications demonstrate significant value."'
  },
  {
    source: {
      id: 'mit',
      name: 'MIT Technology Review'
    },
    author: 'Charlotte Jee',
    title: 'Enterprise Tech Startups Focus on AI Integration Challenges',
    description: 'A new generation of enterprise tech startups is addressing the growing challenges organizations face when integrating AI into existing systems.',
    url: 'https://technologyreview.com/enterprise-startups',
    urlToImage: 'https://picsum.photos/800/400?random=8',
    publishedAt: '2025-05-11T15:50:00Z',
    content: 'A new generation of enterprise tech startups is addressing the growing challenges organizations face when integrating AI into existing systems. These companies are developing specialized middleware and integration tools that bridge the gap between legacy infrastructure and modern AI capabilities. "The biggest hurdle for most enterprises isn\'t the AI itself, but making it work with their current tech stack," explained venture capitalist Sandra Torres. "These startups are solving a critical problem that\'s slowing digital transformation efforts."'
  },
  {
    source: {
      id: 'reuters',
      name: 'Reuters'
    },
    author: 'Joseph Menn',
    title: 'Data Centers Evolve to Meet Sustainability Goals While Supporting AI Growth',
    description: 'Data center operators are implementing innovative cooling technologies and renewable energy sources to balance sustainability goals with growing computational demands.',
    url: 'https://reuters.com/data-centers',
    urlToImage: 'https://picsum.photos/800/400?random=9',
    publishedAt: '2025-05-12T09:25:00Z',
    content: 'Data center operators are implementing innovative cooling technologies and renewable energy sources to balance sustainability goals with growing computational demands. Liquid cooling systems, once considered exotic, are becoming standard for high-density AI workloads. Meanwhile, major providers have accelerated their commitments to carbon-neutral operations. "We\'re seeing a fundamental redesign of data center architecture driven by both environmental concerns and the technical requirements of modern applications," said infrastructure analyst Richard Lee.'
  }
];

export const getTopTechArticles = (): NewsArticle[] => {
  return mockTechArticles;
};

export const searchArticles = (query: string): NewsArticle[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockTechArticles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) || 
    (article.description && article.description.toLowerCase().includes(lowercaseQuery)) ||
    (article.content && article.content.toLowerCase().includes(lowercaseQuery))
  );
};
