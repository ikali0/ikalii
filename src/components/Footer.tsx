import { memo } from "react";

const Footer = memo(() => {
  return (
    <footer className="border-t border-slate-800 mt-16 bg-slate-900/50" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav aria-label="Footer navigation" className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4 text-slate-100">Explore</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/wellness" className="hover:text-cyan-400 transition-colors">
                  Wellness
                </a>
              </li>
              <li>
                <a href="/travel" className="hover:text-cyan-400 transition-colors">
                  Travel
                </a>
              </li>
              <li>
                <a href="/creativity" className="hover:text-cyan-400 transition-colors">
                  Creativity
                </a>
              </li>
              <li>
                <a href="/growth" className="hover:text-cyan-400 transition-colors">
                  Growth
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-100">About</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/about" className="hover:text-cyan-400 transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/authors" className="hover:text-cyan-400 transition-colors">
                  Authors
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-100">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/style-guide" className="hover:text-cyan-400 transition-colors">
                  Style Guide
                </a>
              </li>
              <li>
                <a href="/#newsletter" className="hover:text-cyan-400 transition-colors">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-100">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/privacy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© 2025 Perspective. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
