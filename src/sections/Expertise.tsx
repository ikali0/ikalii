import React from 'react';
import { Brain, FileText, Shield } from 'lucide-react';
import SectionTitle from '@/components/portfolio/ui/SectionTitle';
import SkillCard from '@/components/portfolio/ui/SkillCard';

const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="What I Build"
          subtitle="Outcome-oriented capabilities for regulated environments."
        />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          <SkillCard
            title="AI Systems That Ship"
            icon={Brain}
            color="cyan"
            items={[
              'RAG pipelines that pass audit pressure',
              'Open-source LLMs (Llama, Mistral) — 40% cost cuts',
              'Policy summarization & extraction tools',
              'Local-first, air-gapped deployments',
            ]}
          />
          <SkillCard
            title="Policy → Controls"
            icon={FileText}
            color="blue"
            items={[
              'NIST AI RMF assessments & mapping',
              'FERPA / Title IX compliance automation',
              'Federal procurement documentation',
              'Risk frameworks to measurable controls',
            ]}
          />
          <SkillCard
            title="Security Posture"
            icon={Shield}
            color="purple"
            items={[
              'Authorized pen testing (12+ assessments)',
              'Threat modeling & least privilege design',
              'Vulnerability remediation roadmaps',
              'OSINT & adversarial input testing',
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Expertise);
