import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import SectionTitle from '@/components/portfolio/ui/SectionTitle';
import { articles } from '@/data/articles';

const Articles: React.FC = () => {
  const featuredArticles = articles.slice(0, 3);

  return (
    <section
      id="articles"
      aria-labelledby="articles-title"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="Featured Articles"
          subtitle="Insights on policy, technology, and the intersection of AI and governance."
        />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {featuredArticles.map((article) => (
            <a
              key={article.id}
              href={`/article/${article.id}`}
              className="group block bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden transition-all hover:-translate-y-0.5 hover:border-cyan-500/50"
            >
              {/* Article Image */}
              <div className="relative h-28 sm:h-32 overflow-hidden">
                <img
                  src={article.image}
                  alt={`Cover for ${article.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[9px] font-medium border border-cyan-500/30">
                  {article.category}
                </span>
              </div>

              {/* Article Content */}
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-1.5 text-slate-500 text-[9px] sm:text-[10px] mb-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-100 mb-1.5 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-slate-400 text-[10px] sm:text-xs line-clamp-2 mb-3">
                  {article.subtitle}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-5 h-5 rounded-full object-cover"
                      loading="lazy"
                    />
                    <span className="text-slate-400 text-[9px] sm:text-[10px]">{article.author.name}</span>
                  </div>
                  <span className="p-1.5 rounded-full bg-slate-800 text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-6 sm:mt-8">
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all text-[10px] sm:text-xs font-medium"
          >
            <FileText size={14} />
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Articles);
