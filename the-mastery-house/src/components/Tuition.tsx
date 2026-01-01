import React from "react";
import { Section } from "./Section";

export const Tuition: React.FC = () => {
  return (
    <Section background="white" id="tuition">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f3d2b] mb-8 sm:mb-12 text-center">
          Tuition
        </h2>

        <div className="bg-[#f8f4ef] p-6 sm:p-8 rounded-lg mb-8 border border-[#b59a5b]/20">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1f3d2b] mb-6 sm:mb-8 text-center">
            Annual Tuition (All-inclusive)
          </h3>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0 py-4 border-b border-slate-200">
              <div>
                <p className="text-base sm:text-lg font-bold text-slate-900">
                  Ages 6–8 (Foundations)
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Building strong habits and inner confidence
                </p>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-[#b59a5b]">
                ₦6,000,000
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0 py-4 border-b border-slate-200">
              <div>
                <p className="text-base sm:text-lg font-bold text-slate-900">
                  Ages 9–12 (Skill Builders)
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Disciplined thinkers with growing competence
                </p>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-[#b59a5b]">
                ₦7,000,000
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0 py-4">
              <div>
                <p className="text-base sm:text-lg font-bold text-[#1f3d2b]">
                  Ages 13–16 (Mastery)
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Future-ready leaders with purpose
                </p>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-[#b59a5b]">
                ₦8,000,000
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#EFE6D8] p-6 sm:p-8 rounded-lg border border-[#b59a5b]/20">
          <h3 className="text-xl font-bold text-[#1f3d2b] mb-4">
            Investment Includes:
          </h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-[#b59a5b]">•</span>
              <span>All mentorship sessions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#b59a5b]">•</span>
              <span>All project materials</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#b59a5b]">•</span>
              <span>Physical meetups & showcases</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#b59a5b]">•</span>
              <span>Parent formation sessions</span>
            </li>
          </ul>
        </div>

        <p className="text-xl text-center text-[#1f3d2b] mt-8 font-bold">
          Annual intake only.
        </p>
      </div>
    </Section>
  );
};
