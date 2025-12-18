import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/articles";

const Tech = () => {
  const techArticles = articles.filter(article => 
    article.category.toLowerCase() === "tech"
  );

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center space-y-6 pt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-down text-slate-100">
            Tech & Engineering
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-1">
            Deep dives into AI, software engineering, cybersecurity, and emerging technologies. 
            Practical insights for building robust systems and staying ahead in the tech landscape.
          </p>
        </div>

        {/* Articles Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techArticles.map((article, index) => (
              <div key={article.id} className={`animate-slide-up stagger-${Math.min(index + 2, 6)}`}>
                <ArticleCard {...article} />
              </div>
            ))}
          </div>
          {techArticles.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <p className="text-lg">No tech articles yet. Check back soon!</p>
            </div>
          )}
        </section>

        {/* Featured Content */}
        <section className="mt-16 rounded-2xl bg-slate-900/50 border border-slate-800 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-slate-100">Tech Philosophy</h2>
            <div className="space-y-4 text-slate-400">
              <p>
                Technology should serve humanity, not the other way around. We explore the intersection of 
                cutting-edge tech and practical application—from AI policy frameworks to secure system design.
              </p>
              <p>
                Whether you're building LLM-powered applications, navigating federal compliance, or exploring 
                the latest in cybersecurity, these articles bridge the gap between theory and implementation.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Tech;
