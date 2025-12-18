import React, { useMemo } from 'react';
import type { ColorVariant } from '@/types/portfolio';

type Props = {
  role: string;
  company: string;
  period: string;
  items: string[];
  color: ColorVariant;
  isLast?: boolean;
};

const ExperienceItem: React.FC<Props> = ({ role, company, period, items, color, isLast = false }) => {
  const borderColors = useMemo(() => ({
    cyan: 'border-cyan-500',
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    yellow: 'border-yellow-500',
  }), []);

  const textColors = useMemo(() => ({
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
  }), []);

  return (
    <div className="relative pl-5 md:pl-0 group">
      {/* Desktop Center Line */}
      {!isLast && (
        <div className="hidden md:block absolute left-1/2 -ml-px w-0.5 h-full bg-slate-800 top-0 group-hover:bg-slate-700 transition-colors" />
      )}
      {/* Mobile Left Line */}
      {!isLast && (
        <div className="md:hidden absolute left-2 w-0.5 h-full bg-slate-800 top-2" />
      )}

      <div className="md:flex items-start justify-between">
        {/* Left Side (Desktop) / Top (Mobile) */}
        <div className="md:w-[45%] md:text-right mb-1.5 md:mb-0 relative">
          <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-tight">{role}</h3>
          <div className={`${textColors[color]} font-medium mt-0.5 text-[11px] sm:text-xs`}>{company}</div>
          <div className="text-slate-500 text-[10px] mt-0.5 font-mono">{period}</div>
        </div>

        {/* Center Dot */}
        <div className={`absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 md:w-4 md:h-4 rounded-full bg-slate-950 border-2 ${borderColors[color]} z-10 shadow-md shadow-slate-950 mt-1 md:mt-1.5 transition-transform group-hover:scale-110`} />

        {/* Right Side (Desktop) / Bottom (Mobile) */}
        <div className="md:w-[45%] pl-3 md:pl-0 pt-1.5 md:pt-0">
          <ul className="space-y-1 text-slate-400 text-[10px] sm:text-xs list-disc pl-3 marker:text-slate-600">
            {items.map((item) => (
              <li key={item} className="leading-snug">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExperienceItem);
