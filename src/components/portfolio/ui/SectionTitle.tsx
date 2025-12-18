import React from 'react';

type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

const SectionTitle: React.FC<Props> = ({ title, subtitle, center = true }) => (
  <div className={`mb-6 sm:mb-8 md:mb-10 ${center ? 'text-center' : 'text-left'}`}>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100 mb-2 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-[11px] sm:text-xs text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
    )}
  </div>
);

export default React.memo(SectionTitle);
