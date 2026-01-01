import React from "react";
import { Section } from "./Section";
import { Button } from "./Button";

export const Enrollment: React.FC = () => {
  return (
    <Section background="dark" id="enroll">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-8 sm:mb-12 text-center text-[#b59a5b]">
          How to Enroll
        </h2>

        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          <div className="bg-slate-800 p-6 sm:p-8 rounded-lg">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="bg-amber-700 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg sm:text-xl shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Complete the Intention Form
                </h3>
                <p className="text-sm sm:text-base text-slate-300">
                  This is not an application—it signals alignment.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 sm:p-8 rounded-lg">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="bg-[#b59a5b] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg sm:text-xl shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Attend a Private Virtual Meeting with the Founder
                </h3>
                <p className="text-sm sm:text-base text-slate-300">
                  To assess fit, values, and readiness.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 sm:p-8 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="bg-[#b59a5b] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg sm:text-xl shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Receive an Invitation & Confirm Enrollment
                </h3>
                <p className="text-slate-300">
                  Payment secures placement. Joining details follow.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="secondary" size="lg" href="/enroll-form">
            Request an Invitation
          </Button>
        </div>
      </div>
    </Section>
  );
};
