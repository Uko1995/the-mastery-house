import React from "react";
import { Section } from "./Section";

export const Curriculum: React.FC = () => {
  return (
    <Section background="white" id="curriculum">
      <div className="max-w-5xl  mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f3d2b] mb-8 sm:mb-12 text-center">
          The Curriculum Strands
        </h2>

        <div className="space-y-6 sm:space-y-8">
          <div className="border-l-4 border-[#b59a5b] pl-4 sm:pl-8 py-3 sm:py-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1f3d2b] mb-2 sm:mb-3">
              Academic Mastery
            </h3>
            <p className="text-slate-700 mb-3">
              Tailored support across core subjects and elite exam pathways
              (11+, IGCSE, SAT, A-Levels)
            </p>
            <p className="text-sm text-slate-500 italic">
              British, American, and IB-aligned curricula
            </p>
          </div>

          <div className="border-l-4 border-[#b59a5b] pl-8 py-4">
            <h3 className="text-2xl font-bold text-[#1f3d2b] mb-3">
              Life Skills & Leadership
            </h3>
            <p className="text-slate-700">
              Emotional intelligence, etiquette, leadership, self-governance,
              values formation
            </p>
          </div>

          <div className="border-l-4 border-[#b59a5b] pl-8 py-4">
            <h3 className="text-2xl font-bold text-[#1f3d2b] mb-3">
              Technical Skills & Projects
            </h3>
            <p className="text-slate-700">
              Coding, design, innovation, and bi-annual project delivery with
              public presentation
            </p>
          </div>
        </div>

        <p className="text-xl text-center text-[#1f3d2b] mt-12 font-medium italic">
          Each strand reinforces the other. Nothing exists in isolation.
        </p>
      </div>
    </Section>
  );
};
