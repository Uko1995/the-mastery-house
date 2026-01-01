import React from "react";
import { Section } from "./Section";
import { Button } from "./Button";

export const Difference: React.FC = () => {
  return (
    <Section background="dark" id="difference">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-8 sm:mb-12 text-center text-[#b59a5b]">
          What Makes This Different
        </h2>

        <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed">
          <p className="text-xl sm:text-2xl text-center mb-6 sm:mb-8 text-[#EFE6D8]">
            This is not an online program. This is a{" "}
            <span className="font-bold text-white">formation covenant</span>.
          </p>

          <div className="space-y-4 grid grid-cols-2 gap-5 text-slate-100">
            <div className="flex items-start  gap-4">
              <span className="text-amber-500 text-2xl">✓</span>
              <p>
                <span className="font-semibold text-white">
                  Maximum of 6 children
                </span>{" "}
                per age band
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-amber-500 text-2xl">✓</span>
              <p>
                <span className="font-semibold text-white">
                  One intake per year
                </span>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-amber-500 text-2xl">✓</span>
              <p>
                <span className="font-semibold text-white">
                  Founder-led mentorship
                </span>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-amber-500 text-2xl">✓</span>
              <p>
                <span className="font-semibold text-white">
                  High-touch, high-accountability
                </span>{" "}
                structure
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-amber-500 text-2xl">✓</span>
              <p>
                <span className="font-semibold text-white">
                  Parents formed alongside
                </span>{" "}
                their children
              </p>
            </div>
          </div>

          <p className="text-xl text-center pt-8 text-[#EFE6D8]">
            When our cohorts are full, enrollment closes.
          </p>

          <div className="flex justify-center pt-6">
            <Button variant="secondary" size="lg" href="#enroll">
              Request an Invitation
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};
