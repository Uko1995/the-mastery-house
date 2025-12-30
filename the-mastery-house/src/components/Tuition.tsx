import React from "react";
import { Section } from "./Section";

export const Tuition: React.FC = () => {
  return (
    <Section background="white" id="tuition">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 sm:mb-12 text-center">
          Tuition
        </h2>

        <p className="text-lg sm:text-xl text-center mb-8 sm:mb-12 text-slate-700">
          Confidence, not apology
        </p>

        <div className="bg-slate-50 p-6 sm:p-8 rounded-lg mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">
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
              <p className="text-xl sm:text-2xl font-bold text-amber-700">
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
              <p className="text-xl sm:text-2xl font-bold text-amber-700">
                ₦7,000,000
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0 py-4">
              <div>
                <p className="text-base sm:text-lg font-bold text-slate-900">
                  Ages 13–16 (Mastery)
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Future-ready leaders with purpose
                </p>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-amber-700">
                ₦8,000,000
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-6 sm:p-8 rounded-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Investment Includes:
          </h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span>
              <span>All mentorship sessions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span>
              <span>All project materials</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span>
              <span>Physical meetups & showcases</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span>
              <span>Parent formation sessions</span>
            </li>
          </ul>
        </div>

        <p className="text-xl text-center text-slate-900 mt-8 font-bold">
          One annual intake only.
        </p>
      </div>
    </Section>
  );
};
