import React from "react";
import { Section } from "./Section";

export const Curriculum: React.FC = () => {
  return (
    <Section background="white" id="curriculum">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 sm:mb-12 text-center">
          The Curriculum Strands
        </h2>

        <p className="text-lg sm:text-xl text-center mb-8 sm:mb-12 text-slate-700">
          Clarity without overwhelm
        </p>

        <div className="space-y-6 sm:space-y-8">
          <div className="border-l-4 border-amber-600 pl-4 sm:pl-8 py-3 sm:py-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
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

          <div className="border-l-4 border-amber-600 pl-8 py-4">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Life Skills & Leadership
            </h3>
            <p className="text-slate-700">
              Emotional intelligence, etiquette, leadership, self-governance,
              values formation
            </p>
          </div>

          <div className="border-l-4 border-amber-600 pl-8 py-4">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Technical Skills & Projects
            </h3>
            <p className="text-slate-700">
              Coding, design, innovation, and bi-annual project delivery with
              public presentation
            </p>
          </div>
        </div>

        <p className="text-xl text-center text-slate-900 mt-12 font-medium">
          Each strand reinforces the other.
          <br />
          Nothing exists in isolation.
        </p>
      </div>
    </Section>
  );
};
