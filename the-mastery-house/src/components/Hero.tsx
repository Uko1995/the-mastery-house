import React from "react";
import { Button } from "./Button";

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-b  to-[#b59a5b]  from-[#f8f4ef] from-20% px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full text-center pt-20 pb-10 sm:pt-24 lg:pt-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#1f3d2b] mb-4 sm:mb-6 leading-tight px-2">
          THE MASTERY HOUSE
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl text-slate-700 mb-3 sm:mb-4 px-2">
          Where children are formed for excellence
        </p>

        <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4">
          A private mentorship and mastery academy for discerning families
          raising future-ready children (ages 6–16)
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-4">
          <Button size="lg" href="#enroll">
            Request an Invitation
          </Button>
        </div>

        <p className="text-xs sm:text-sm italic px-4">
          Invitation-only. Values-driven. Deeply intentional.
        </p>
      </div>
    </div>
  );
};
