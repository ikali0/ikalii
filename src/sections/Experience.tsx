import React from 'react';
import SectionTitle from '@/components/portfolio/ui/SectionTitle';
import ExperienceItem from '@/components/portfolio/ui/ExperienceItem';

const experienceData = [
  {
    role: 'AI Policy Engineer',
    company: 'AltruisticXAI',
    period: 'Oct 2023 - Present',
    color: 'cyan' as const,
    items: [
      'Built FERPA/Title IX compliance dashboards for multiple school districts.',
      'Developed GPT-4 and Claude tools to extract and summarize regulatory requirements.',
      'Integrated open-source LLMs (Llama, Mistral), cutting infra costs by 40%.',
    ],
  },
  {
    role: 'Penetration Tester',
    company: 'Defense Intelligence Agency (Contract)',
    period: 'Nov 2024 - May 2025',
    color: 'blue' as const,
    items: [
      'Executed 12+ authorized pen tests across DIA & Lockheed Martin.',
      'Discovered 47 critical vulnerabilities with 48-hr remediation roadmaps.',
      'Briefed senior leadership on risk-prioritized action plans.',
    ],
  },
  {
    role: 'Management Consulting Analyst',
    company: 'Accenture Federal Services',
    period: 'Jul 2021 - Oct 2024',
    color: 'purple' as const,
    items: [
      'Optimized capital project portfolios for DoD, improving utilization by 30%.',
      'Designed UX/UI strategy for energy.gov.',
      'Conducted CONUS/OCONUS analysis, reducing costs by 15%.',
    ],
  },
  {
    role: 'Business Analyst',
    company: 'SAP SuccessFactors',
    period: 'Dec 2019 - Mar 2021',
    color: 'green' as const,
    items: [
      'Created ROI reports for strategic planning.',
      'Improved efficiency by 25% through trend analysis.',
    ],
  },
  {
    role: 'Area Operations Manager',
    company: 'Amazon',
    period: 'Aug 2019 - Dec 2019',
    color: 'yellow' as const,
    isLast: true,
    items: [
      'Achieved 95% on-time delivery rate.',
      'Managed 100+ associates, increasing productivity 20%.',
    ],
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-slate-900/30">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Experience in Regulated Environments" />

        <div className="space-y-6 sm:space-y-8">
          {experienceData.map((exp, index) => (
            <ExperienceItem key={`${exp.company}-${index}`} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Experience);
