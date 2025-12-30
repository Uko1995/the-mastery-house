import React from "react";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { Problem } from "../components/Problem";
import { Promise } from "../components/Promise";
import { Difference } from "../components/Difference";
import { Outcome } from "../components/Outcome";
import { Curriculum } from "../components/Curriculum";
import { Rhythm } from "../components/Rhythm";
import { WhoThisIsFor } from "../components/WhoThisIsFor";
import { Tuition } from "../components/Tuition";
import { Enrollment } from "../components/Enrollment";
import { Founder } from "../components/Founder";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Problem />
      <Promise />
      <Difference />
      <Outcome />
      <Curriculum />
      <Rhythm />
      <WhoThisIsFor />
      <Tuition />
      <Enrollment />
      <Founder />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};
