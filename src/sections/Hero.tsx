import React from 'react';
import { ChevronRight, Download, Mail } from 'lucide-react';

type Props = {
  onNavigate: (id: string) => void;
};

const Hero: React.FC<Props> = ({ onNavigate }) => {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" aria-hidden="true" />
      
      {/* Subtle Gradient Orbs */}
      <div className="absolute top-1/4 -left-8 w-20 h-20 sm:w-32 sm:h-32 bg-cyan-500/15 rounded-full blur-[40px]" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-8 w-20 h-20 sm:w-32 sm:h-32 bg-blue-600/15 rounded-full blur-[40px]" aria-hidden="true" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center space-y-4 sm:space-y-5">
          
          {/* Status Badge with Role Qualifiers */}
          <div 
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-[9px] sm:text-[10px] text-slate-400"
            role="status"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
            </span>
            <span>Open to: <span className="text-cyan-400">AI Engineer</span> • <span className="text-cyan-400">Governance</span> • <span className="text-cyan-400">Security</span></span>
          </div>

          {/* Role Line */}
          <h1
            id="hero-heading"
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-slate-100 tracking-tight"
          >
            AI Policy + Applied AI Engineer
          </h1>

          {/* Specialty Line */}
          <p className="text-[11px] xs:text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            I build <span className="text-cyan-400 font-medium">compliance-aware AI systems</span> (RAG, dashboards, automation) for regulated teams.
          </p>

          {/* Proof Line */}
          <p className="text-[10px] xs:text-[11px] sm:text-xs text-slate-500 max-w-md mx-auto">
            Shipped work across federal + education workflows. Focused on secure, local-first deployments.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-2 pt-2 justify-center">
            <button
              onClick={() => onNavigate('projects')}
              className="group px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-md font-semibold text-[10px] sm:text-xs transition-all shadow-sm hover:-translate-y-0.5 flex items-center gap-1"
            >
              See Proof
              <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800/60 hover:bg-slate-800 text-slate-200 rounded-md font-semibold text-[10px] sm:text-xs transition-all border border-slate-700/50 flex items-center gap-1">
              <Download size={11} />
              Resume
            </button>

            <a
              href="mailto:inga@example.com"
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-slate-400 hover:text-cyan-400 text-[10px] sm:text-xs font-medium transition-colors flex items-center gap-1"
            >
              <Mail size={11} />
              Email me
            </a>
          </div>

          {/* Proof Strip - Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 sm:pt-6 max-w-lg sm:max-w-2xl mx-auto">
            {[
              { value: '12+', label: 'Security Assessments' },
              { value: '47', label: 'Critical Findings Fixed' },
              { value: '40%', label: 'LLM Cost Reduction' },
              { value: 'Gov/Ed', label: 'FERPA • NIST • Title IX' },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-2 px-2 rounded-md bg-slate-800/40 border border-slate-700/30">
                <div className="text-sm sm:text-base font-bold text-cyan-400">{stat.value}</div>
                <div className="text-[8px] sm:text-[9px] text-slate-500 uppercase tracking-wide leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust Bar */}
          <div className="pt-4 sm:pt-6">
            <p className="text-[9px] sm:text-[10px] text-slate-600 uppercase tracking-wider mb-2">Worked with</p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] sm:text-xs text-slate-500">
              <span>DoD</span>
              <span>•</span>
              <span>DIA</span>
              <span>•</span>
              <span>DLA</span>
              <span>•</span>
              <span>DOE</span>
              <span>•</span>
              <span>Accenture Federal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1 hidden xs:flex">
        <span className="text-[7px] sm:text-[8px] text-slate-600 uppercase tracking-widest">Scroll</span>
        <div className="w-3 h-5 rounded-full border border-slate-700/50 flex items-start justify-center p-0.5">
          <div className="w-0.5 h-1 bg-cyan-400/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
