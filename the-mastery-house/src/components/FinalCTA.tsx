import React from "react";
import { Section } from "./Section";
import { Button } from "./Button";

export const FinalCTA: React.FC = () => {
  return (
    <Section background="dark">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 sm:mb-8 text-[#b59a5b]">
          Enrollment is Limited.
          <br />
          Formation is Intentional.
        </h2>

        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-[#EFE6D8]">
          Once each cohort reaches six children,
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          enrollment closes and a waiting list begins.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="secondary" size="lg" href="/enroll-form">
            Request an Invitation
          </Button>
        </div>
      </div>
    </Section>
  );
};
