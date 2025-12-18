import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-10 sm:py-12 md:py-16 bg-slate-900/50 border-y border-slate-800/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-100 mb-3 sm:mb-4">About Me</h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          I specialize in the intersection of{' '}
          <span className="text-cyan-400 font-medium">Government Policy</span> and{' '}
          <span className="text-blue-400 font-medium">Artificial Intelligence</span>. With 4+ years
          partnering with agencies like{' '}
          <span className="text-slate-200 font-medium">DoD, DIA, DLA, and DOE</span>, I build the tools that enforce policy. From FERPA compliance dashboards to penetration testing classified networks—secure, compliant, intelligent solutions.
        </p>
      </div>
    </section>
  );
};

export default React.memo(About);
