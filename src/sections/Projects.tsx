import React from 'react';
import { BarChart3, Terminal, Cpu, Lock, ExternalLink, ArrowUpRight } from 'lucide-react';
import SectionTitle from '@/components/portfolio/ui/SectionTitle';

const projects = [
  {
    title: 'FERPA Compliance Dashboard',
    domain: 'EdTech',
    problem: 'School districts lacked visibility into Title IX & FERPA compliance status.',
    built: 'Real-time policy tracking dashboard with automated audit trails.',
    stack: ['React', 'Python', 'PostgreSQL'],
    outcome: 'Replaced manual audits for 3 districts. Zero compliance gaps in 12 months.',
    icon: BarChart3,
    color: 'cyan',
  },
  {
    title: 'DIA Network Security Audit',
    domain: 'Gov/Security',
    problem: 'Critical infrastructure required comprehensive vulnerability assessment.',
    built: 'Authorized pen tests with detailed remediation roadmaps.',
    stack: ['Metasploit', 'Burp Suite', 'Nmap'],
    outcome: '47 critical vulnerabilities identified. 48-hour remediation SLA met.',
    icon: Terminal,
    color: 'purple',
  },
  {
    title: 'LLM Cost Optimization',
    domain: 'AI/Infra',
    problem: 'Proprietary LLM APIs were prohibitively expensive for policy summarization.',
    built: 'Open-source model pipeline (Llama, Mistral) with local-first deployment.',
    stack: ['Llama 2', 'Mistral', 'Docker'],
    outcome: '40% infrastructure cost reduction. Maintained accuracy on compliance tasks.',
    icon: Cpu,
    color: 'green',
  },
  {
    title: 'Blockchain Identity Verification',
    domain: 'Security',
    problem: 'Sensitive user data required immutable, auditable identity verification.',
    built: 'Prototype using blockchain for tamper-proof credential verification.',
    stack: ['Solidity', 'Web3', 'Node.js'],
    outcome: 'POC delivered. Enhanced security protocols for sensitive data handling.',
    icon: Lock,
    color: 'yellow',
  },
];

const colorMap = {
  cyan: 'border-cyan-500/30 hover:border-cyan-500/60',
  purple: 'border-purple-500/30 hover:border-purple-500/60',
  green: 'border-green-500/30 hover:border-green-500/60',
  yellow: 'border-yellow-500/30 hover:border-yellow-500/60',
};

const bgMap = {
  cyan: 'bg-cyan-500/10 text-cyan-400',
  purple: 'bg-purple-500/10 text-purple-400',
  green: 'bg-green-500/10 text-green-400',
  yellow: 'bg-yellow-500/10 text-yellow-400',
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-slate-900/30 relative">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="Case Studies"
          subtitle="Real projects with measurable outcomes in regulated environments."
        />

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.title}
                className={`group bg-slate-900/60 border rounded-xl p-4 sm:p-5 transition-all hover:-translate-y-0.5 ${colorMap[project.color as keyof typeof colorMap]}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md ${bgMap[project.color as keyof typeof bgMap]}`}>
                      <Icon size={14} />
                    </div>
                    <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase tracking-wide">
                      {project.domain}
                    </span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                {/* Problem & Solution */}
                <div className="space-y-1.5 mb-3 text-[10px] sm:text-xs text-slate-400">
                  <p><span className="text-slate-500 font-medium">Problem:</span> {project.problem}</p>
                  <p><span className="text-slate-500 font-medium">Built:</span> {project.built}</p>
                  <p><span className="text-cyan-400/80 font-medium">Outcome:</span> {project.outcome}</p>
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-1">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400 border border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating button */}
      <a
        href="https://pilots4y0u.lovable.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-3 right-3 z-50 p-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-md transition-all hover:scale-110"
        aria-label="Visit Pilots4You"
      >
        <ExternalLink size={12} />
      </a>
    </section>
  );
};

export default React.memo(Projects);
