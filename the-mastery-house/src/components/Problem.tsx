import React from "react";
import { Section } from "./Section";

export const Problem: React.FC = () => {
  return (
    <Section background="white" id="problem">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f3d2b] mb-8 sm:mb-12 text-center">
          The Quiet Problem
        </h2>

        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-slate-800 leading-relaxed">
          <p className="text-lg sm:text-xl font-medium text-center mb-4 sm:mb-8">
            You have done everything "right." And yet, something still feels
            incomplete.
          </p>

          <p className="text-center">
            Your child is bright curious and capable but modern education feels
            rushed, crowded, and fragmented.
          </p>

          <div className="my-6 sm:my-8">
            <ul className="space-y-3 grid grid-cols-1  md:grid md:grid-cols-2 md:gap-10 text-[#8b650a]">
              <li className="bg-[#f8f4ef]/20 text-center p-4 rounded-lg shadow-sm border border-[#b59a5b]/20">
                Too much information, too little{" "}
                <span className="font-semibold text-[#1f3d2b]">formation</span>
              </li>
              <li className="bg-[#f8f4ef]/20 text-center p-4 rounded-lg shadow-sm border border-[#b59a5b]/20">
                Too many opinions, too little{" "}
                <span className="font-semibold text-[#1f3d2b]">grounding</span>
              </li>
              <li className="bg-[#f8f4ef]/20 text-center p-4 rounded-lg shadow-sm border border-[#b59a5b]/20">
                Achievement without{" "}
                <span className="font-semibold text-[#1f3d2b]">depth</span>
              </li>
              <li className="bg-[#f8f4ef]/20 text-center p-3 rounded-lg shadow-sm border border-[#b59a5b]/20">
                Intelligence without{" "}
                <span className="font-semibold text-[#1f3d2b]">character</span>
              </li>
            </ul>
          </div>

          <p className="text-2xl font-serif text-center text-slate-950 pt-8">
            The question becomes:
            <br />
            <span className="italic">
              Who is intentionally forming my child—beyond academics?
            </span>
          </p>
        </div>
      </div>
    </Section>
  );
};
