import React from "react";
import { Section } from "./Section";

export const Founder: React.FC = () => {
  return (
    <Section background="slate" id="founder">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f3d2b] mb-8 sm:mb-12 text-center">
          Founder Authority
        </h2>

        <div className=" p-6 sm:p-8 rounded-lg shadow-sm border border-[#b59a5b]/20">
          <h3 className="text-xl sm:text-2xl font-bol text-center text-[#1f3d2b] mb-4 sm:mb-6">
            About the Founder
          </h3>
          <div className="flex w-full justify-center items-center gap-5 sm:gap-8 flex-col md:flex-row">
            <div>
              <img src="/IdaraMasteryHouse.webp" alt="Founder Idara Uwatt" />
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                The Mastery House was founded by{" "}
                <span className="font-bold text-[#1f3d2b]">Idara Uwatt</span>,
                an educator and mentor with over 13 years of experience working
                closely with children and families.
              </p>

              <p>
                A qualified teacher with training in child psychology, Idara has
                spent over a decade mentoring children beyond academics, shaping
                confidence, character, and capability.
              </p>

              <p className="text-lg sm:text-xl font-serif text-[#1f3d2b] pt-4 italic">
                Her work is driven by one conviction:
              </p>

              <p className="text-base sm:text-lg font-medium text-[#1f3d2b] pl-4 sm:pl-6 border-l-4 border-[#b59a5b]">
                children are capable of far more and must be intentionally
                formed to become the solutions they were created to be.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
