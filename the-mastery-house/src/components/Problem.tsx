import React from "react";
import { Section } from "./Section";

export const Problem: React.FC = () => {
  return (
    <Section background="white" id="problem">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 sm:mb-12 text-center">
          The Quiet Problem
        </h2>

        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed">
          <p className="text-lg sm:text-xl font-medium text-center mb-6 sm:mb-8">
            You have done everything "right."
            <br />
            And yet, something still feels incomplete.
          </p>

          <p>Your child is bright. Curious. Capable.</p>

          <p>But modern education feels rushed, crowded, and fragmented.</p>

          <div className="pl-4 sm:pl-8 border-l-4 border-amber-600 my-6 sm:my-8">
            <ul className="space-y-3 text-slate-600">
              <li>
                Too much information, too little{" "}
                <span className="font-semibold text-slate-900">formation</span>
              </li>
              <li>
                Too many opinions, too little{" "}
                <span className="font-semibold text-slate-900">grounding</span>
              </li>
              <li>
                Achievement without{" "}
                <span className="font-semibold text-slate-900">depth</span>
              </li>
              <li>
                Intelligence without{" "}
                <span className="font-semibold text-slate-900">character</span>
              </li>
            </ul>
          </div>

          <p className="text-2xl font-serif text-center text-slate-900 pt-8">
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
