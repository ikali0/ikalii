import type { Metadata } from "next";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import { ArticleSummaryDialog } from "@/components/ai/ArticleSummaryDialog";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Blog Articles | Perspective",
  description: "Thoughtful articles on growth, creativity, wellness, and modern living.",
  openGraph: {
    title: "Perspective",
    description: "Thoughtful articles on growth, creativity, wellness, and modern living.",
    type: "website",
  },
};

export default function HomePage() {
  const featuredArticles = articles.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 animate-fade-in">
      {/* ================= Header ================= */}
      <Header />

      {/* ================= Main ================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Hero */}
        <HeroSection />

        {/* Intro */}
        <IntroSection />

        {/* ================= Featured Articles ================= */}
        <section id="articles" className="py-16">
          <div className="flex items-center justify-between mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Featured Articles</h2>

            <a
              href="/articles"
              className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors px-4 py-2 rounded-full hover:bg-slate-800/60 border border-slate-700/50"
            >
              View all →
            </a>
          </div>

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
        </section>

        {/* ================= Newsletter ================= */}
        <section
          id="newsletter"
          className="my-20 rounded-2xl glass-dark p-8 md:p-12 text-center animate-scale-in border border-slate-700/50"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Stay inspired.</h2>

            <p className="text-lg text-slate-400 leading-relaxed">
              Subscribe to receive our latest articles and insights directly in your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/api/subscribe" method="POST">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Your email"
                className="flex-1 px-5 py-3 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium hover:from-cyan-500 hover:to-blue-500 hover:scale-105 transition-all shadow-lg shadow-cyan-900/30"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ================= Footer ================= */}
      <footer className="border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <FooterColumn
              title="Explore"
              links={[
                { href: "/wellness", label: "Wellness" },
                { href: "/travel", label: "Travel" },
                { href: "/creativity", label: "Creativity" },
                { href: "/growth", label: "Growth" },
              ]}
            />

            <FooterColumn
              title="About"
              links={[
                { href: "/about", label: "Our Story" },
                { href: "/authors", label: "Authors" },
                { href: "/contact", label: "Contact" },
              ]}
            />

            <FooterColumn
              title="Resources"
              links={[
                { href: "/style-guide", label: "Style Guide" },
                { href: "#newsletter", label: "Newsletter" },
              ]}
            />

            <FooterColumn
              title="Legal"
              links={[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ]}
            />
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Perspective. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= Footer Column Component ================= */

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-semibold mb-4 text-slate-100">{title}</h3>
      <ul className="space-y-2 text-sm text-slate-400">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="hover:text-cyan-400 transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
