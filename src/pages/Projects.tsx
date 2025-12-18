import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/articles";

const Projects = () => {
  const projectArticles = articles.filter(article => 
    article.category.toLowerCase() === "projects"
  );

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center space-y-6 pt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-down text-slate-100">
            Projects & Case Studies
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-1">
            Deep dives into real-world projects, from compliance dashboards to AI integrations. 
            Learn from the challenges, solutions, and lessons learned along the way.
          </p>
        </div>

        {/* Articles Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectArticles.map((article, index) => (
              <div key={article.id} className={`animate-slide-up stagger-${Math.min(index + 2, 6)}`}>
                <ArticleCard {...article} />
              </div>
            ))}
          </div>
          {projectArticles.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <p className="text-lg">No project articles yet. Check back soon!</p>
            </div>
          )}
        </section>

        {/* Featured Content */}
        <section className="mt-16 rounded-2xl bg-slate-900/50 border border-slate-800 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-slate-100">Building in Public</h2>
            <div className="space-y-4 text-slate-400">
              <p>
                Every project tells a story. From initial concept to production deployment, 
                these case studies share the real journey—including the mistakes and pivots.
              </p>
              <p>
                Whether it's implementing FERPA compliance, building LLM-powered tools, or 
                navigating federal procurement, these articles document what actually works.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Projects;
