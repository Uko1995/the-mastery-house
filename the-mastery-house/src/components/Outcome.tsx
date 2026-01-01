import React from "react";
import { Section } from "./Section";

export const Outcome: React.FC = () => {
  return (
    <Section background="cream" id="outcome">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f3d2b] mb-8 sm:mb-12 text-center">
          The Outcome
        </h2>

        <p className="text-lg sm:text-xl text-center mb-8 sm:mb-12 text-[#8b650a]">
          What your child becomes
        </p>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-[#b59a5b]/20">
            <h3 className="text-2xl font-bold text-[#1f3d2b] mb-4">
              Personal Mastery
            </h3>
            <p className="text-slate-700">
              Focus, discipline, emotional intelligence, self-leadership
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-[#b59a5b]/20">
            <h3 className="text-2xl font-bold text-[#1f3d2b] mb-4">
              Academic Strength
            </h3>
            <p className="text-slate-700">
              Confident performance across British, American, and IB-aligned
              curricula
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-[#b59a5b]/20">
            <h3 className="text-2xl font-bold text-[#1f3d2b] mb-4">
              Technical Capability
            </h3>
            <p className="text-slate-700">
              Coding, design thinking, problem-solving, real project execution
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-[#b59a5b]/20">
            <h3 className="text-2xl font-bold text-[#1f3d2b] mb-4">
              Character & Values
            </h3>
            <p className="text-slate-700">
              Moral clarity, responsibility, positive doggedness, purpose
            </p>
          </div>
        </div>

        <div className="mt-12 bg-[#b59a5b] text-white p-8 rounded-lg text-center shadow-md">
          <h3 className="text-2xl font-bold mb-4">A Living Portfolio</h3>
          <p className="text-lg">Two real-world projects delivered annually</p>
        </div>

        <p className="text-2xl font-serif text-center text-[#1f3d2b] mt-12">
          This is not theory.
          <br />
          <span className="font-bold">It is formation with evidence.</span>
        </p>
      </div>
    </Section>
  );
};
