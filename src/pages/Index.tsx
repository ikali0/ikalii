import { useEffect, useMemo } from "react";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import Footer from "@/components/Footer";
import { ArticleSummaryDialog } from "@/components/ai/ArticleSummaryDialog";
import { articles } from "@/data/articles";

const Index = () => {
  const featuredArticles = useMemo(() => articles.slice(0, 6), []);

  useEffect(() => {
    document.title = "Blog Articles | Perspective";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 animate-fade-in">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Hero Section */}
        <HeroSection />

        {/* Intro Section */}
        <IntroSection />

        {/* Featured Articles Grid */}
        <section id="articles" className="py-16" aria-labelledby="featured-articles-heading">
          <div className="flex items-center justify-between mb-12 animate-slide-up">
            <h2 id="featured-articles-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Featured Articles</h2>
            <a
              href="#all"
              className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors px-4 py-2 rounded-full hover:bg-slate-800/60 border border-slate-700/50"
            >
              View all →
            </a>
          </div>

          {featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <div key={article.id} className={`animate-slide-up stagger-${Math.min(index + 1, 6)}`}>
                  <ArticleCard {...article} size="small" />
                  <div className="mt-3 flex justify-end">
                    <ArticleSummaryDialog article={article} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-center">No featured articles available at this time.</p>
          )}
        </section>

        {/* Newsletter Section */}
        <section 
          className="my-20 rounded-2xl glass-dark p-8 md:p-12 text-center animate-scale-in border border-slate-700/50" 
          aria-labelledby="newsletter-heading"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 id="newsletter-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Stay inspired.</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Subscribe to receive our latest articles and insights directly in your inbox.
            </p>
            <form 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" 
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter subscription form"
            >
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address for newsletter subscription"
                required
                className="flex-1 px-5 py-3 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />
              <button 
                type="submit"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium hover:from-cyan-500 hover:to-blue-500 hover:scale-105 transition-all shadow-lg shadow-cyan-900/30"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
