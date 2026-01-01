import React from "react";
import { Section } from "./Section";

export const Rhythm: React.FC = () => {
  return (
    <Section background="slate" id="rhythm">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f3d2b] mb-8 sm:mb-12 text-center">
          The Rhythm
        </h2>

        <p className="text-lg sm:text-xl text-center mb-8 sm:mb-12 text-[#8b650a]">
          Trust + Structure
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-[#b59a5b]/20">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1f3d2b] mb-4 sm:mb-6">
              The Monastery Rhythm
            </h3>
            <p className="text-sm text-[#b59a5b] font-semibold mb-4">WEEKLY</p>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-[#b59a5b]">•</span>
                <span>2 live mentorship sessions weekly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b59a5b]">•</span>
                <span>Structured reflection & journaling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b59a5b]">•</span>
                <span>Project planning and execution</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b59a5b]">•</span>
                <span>Calm, predictable schedules</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-[#b59a5b]/20">
            <h3 className="text-2xl font-bold text-[#1f3d2b] mb-6">
              Special Formation Rhythm
            </h3>
            <p className="text-sm text-[#b59a5b] font-semibold mb-4">
              PERIODIC
            </p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-[#b59a5b]">•</span>
                <span>Quarterly physical meetups</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b59a5b]">•</span>
                <span>Bi-annual project showcases</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b59a5b]">•</span>
                <span>Founder-led group sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b59a5b]">•</span>
                <span>Quarterly parent-only formation meetings</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xl text-center text-[#1f3d2b] mt-12 font-serif italic">
          This rhythm builds depth, not burnout.
        </p>
      </div>
    </Section>
  );
};
