import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

type Props = {
  onNavigate: (id: string) => void;
};

const Footer: React.FC<Props> = () => {
  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-900 pt-10 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-32 bg-cyan-900/5 blur-[80px] pointer-events-none rounded-t-full" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3">Get in Touch</h2>
        <p className="text-[11px] sm:text-xs text-slate-400 mb-2 max-w-md mx-auto">
          Available for AI policy, compliance automation, and secure infrastructure consulting.
        </p>
        <p className="text-[10px] text-slate-500 mb-6">
          Response time: Usually within 24 hours
        </p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          <a
            href="mailto:inga.kaltak@example.com"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all text-[10px] sm:text-xs"
          >
            <Mail size={14} />
            <span className="font-medium">Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/ik11/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-all text-[10px] sm:text-xs"
          >
            <Linkedin size={14} />
            <span className="font-medium">LinkedIn</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-purple-500 hover:text-purple-400 transition-all text-[10px] sm:text-xs"
          >
            <Github size={14} />
            <span className="font-medium">GitHub</span>
          </a>
        </div>

        <div className="text-slate-600 text-[9px] sm:text-[10px] border-t border-slate-900 pt-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>&copy; {new Date().getFullYear()} Inga Kaltak</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            GovTech & AI Compliance
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
