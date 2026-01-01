import React from "react";
import { Section } from "./Section";

export const WhoThisIsFor: React.FC = () => {
  return (
    <Section background="cream" id="fit">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f3d2b] mb-8 sm:mb-12 text-center">
          Who This Is For
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-lg border-2 border-[#1f3d2b]">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1f3d2b] mb-4 sm:mb-6">
              The Mastery House is for families who:
            </h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✔</span>
                <span>Value character as much as achievement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✔</span>
                <span>Desire mentorship, not mass education</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✔</span>
                <span>Are willing to partner intentionally</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✔</span>
                <span>Seek excellence rooted in faith and discipline</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg border-2 border-red-600">
            <h3 className="text-2xl font-bold text-red-800 mb-6">
              This is not for families who:
            </h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✖</span>
                <span>Want quick results without commitment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✖</span>
                <span>Prefer conventional, crowded schooling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✖</span>
                <span>Are unwilling to uphold shared values</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-2xl font-serif text-center text-[#1f3d2b] mt-12 font-bold">
          Alignment is essential.
        </p>
      </div>
    </Section>
  );
};
