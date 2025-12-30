import React from "react";
import { Section } from "./Section";

export const Founder: React.FC = () => {
  return (
    <Section background="slate" id="founder">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 sm:mb-12 text-center">
          Founder Authority
        </h2>

        <p className="text-lg sm:text-xl text-center mb-8 sm:mb-12 text-slate-700">
          Trust
        </p>

        <div className="bg-white p-6 sm:p-8 rounded-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
            About the Founder
          </h3>

          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              The Mastery House was founded by{" "}
              <span className="font-bold text-slate-900">Idara Uwatt</span>, an
              educator and mentor with over 13 years of experience working
              closely with children and families.
            </p>

            <p>
              A qualified teacher with training in child psychology, Idara has
              spent over a decade mentoring children beyond academics—shaping
              confidence, character, and capability.
            </p>

            <p className="text-lg sm:text-xl font-serif text-slate-900 pt-4 italic">
              Her work is driven by one conviction:
            </p>

            <p className="text-base sm:text-lg font-medium text-slate-900 pl-4 sm:pl-6 border-l-4 border-amber-600">
              children are capable of far more—and must be intentionally formed
              to become the solutions they were created to be.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};
