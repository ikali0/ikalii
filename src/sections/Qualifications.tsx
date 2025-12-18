import React from 'react';
import { GraduationCap, Award, Globe } from 'lucide-react';
import SectionTitle from '@/components/portfolio/ui/SectionTitle';

const Qualifications: React.FC = () => {
  return (
    <section id="qualifications" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="Credentials" />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Education */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                <GraduationCap size={18} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100">Education</h3>
            </div>
            <div className="mb-2">
              <div className="text-sm font-semibold text-slate-200">Penn State University</div>
              <div className="text-slate-500 text-[10px] sm:text-xs">2015 - 2019</div>
            </div>
            <div className="text-slate-400 text-[10px] sm:text-xs">
              BS in <span className="text-cyan-400">Economics / Engineering</span>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Award size={18} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100">Certifications</h3>
            </div>
            <ul className="space-y-2 text-[10px] sm:text-xs">
              <li>
                <span className="font-semibold text-slate-200">Advanced Cyber Threat Intel</span>
                <div className="text-slate-500">Cybrary • 2024</div>
              </li>
              <li className="border-t border-slate-800 pt-2">
                <span className="font-semibold text-slate-200">OSINT Fundamentals</span>
                <div className="text-slate-500">Udemy • 2024</div>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 hover:border-green-500/50 transition-colors sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                <Globe size={18} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100">Languages</h3>
            </div>
            <ul className="space-y-2 text-[10px] sm:text-xs">
              <li className="flex justify-between items-center">
                <span className="font-semibold text-slate-200">English</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Native</span>
              </li>
              <li className="border-t border-slate-800 pt-2 flex justify-between items-center">
                <span className="font-semibold text-slate-200">Croatian</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Bilingual</span>
              </li>
              <li className="border-t border-slate-800 pt-2 flex justify-between items-center">
                <span className="font-semibold text-slate-200">German</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Professional</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Qualifications);
