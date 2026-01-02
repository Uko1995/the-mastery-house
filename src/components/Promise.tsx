import React from "react";
import { Section } from "./Section";

export const Promise: React.FC = () => {
  return (
    <Section background="slate" id="promise">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f3d2b] mb-8 sm:mb-12 text-center">
          The Promise
        </h2>

        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed">
          <p className="text-lg sm:text-xl text-center mb-6 sm:mb-8 text-slate-800">
            The Mastery House exists for families who believe education should{" "}
            <span className="font-bold text-[#1f3d2b]">form</span>, not just{" "}
            <span className="font-bold text-[#1f3d2b]">inform</span>.
          </p>

          <p>
            We are a{" "}
            <span className="font-semibold text-[#8b650a]">
              mentorship and mastery academy
            </span>
            , not a conventional school.
          </p>

          <p>Here, children are shaped through:</p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-8">
            <div className="bg-[#f8f4ef]/20 text-center p-6 rounded-lg shadow-sm border border-[#b59a5b]/20">
              <p className="text-[#1f3d2b] font-semibold">
                discipline{" "}
                <span className="text-slate-600 font-normal">
                  without pressure
                </span>
              </p>
            </div>
            <div className="bg-[#f8f4ef]/20 text-center p-6 rounded-lg shadow-sm border border-[#b59a5b]/20">
              <p className="text-[#1f3d2b] font-semibold">
                excellence{" "}
                <span className="text-slate-600 font-normal">
                  without noise
                </span>
              </p>
            </div>
            <div className="bg-[#f8f4ef]/20 text-center p-6 rounded-lg shadow-sm border border-[#b59a5b]/20">
              <p className="text-[#1f3d2b] font-semibold">
                faith-rooted values{" "}
                <span className="text-slate-600 font-normal">
                  without performance
                </span>
              </p>
            </div>
            <div className="bg-[#f8f4ef]/20 text-center p-6 rounded-lg shadow-sm border border-[#b59a5b]/20">
              <p className="text-[#1f3d2b] font-semibold">
                learning{" "}
                <span className="text-slate-600 font-normal">
                  that produces real outcomes
                </span>
              </p>
            </div>
          </div>

          <p className="text-xl text-center pt-8 font-serif text-[#1f3d2b] italic">
            This is a calm, protected space—a monastery of excellence—
            <br />
            where children grow in mastery, confidence, and purpose.
          </p>
        </div>
      </div>
    </Section>
  );
};
