import React from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-b  to-[#b59a5b]  from-[#f8f4ef] from-20% px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto w-full text-center pt-20 pb-10 sm:pt-24 lg:pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#1f3d2b] mb-4 sm:mb-6 leading-tight px-2"
          variants={itemVariants}
        >
          THE MASTERY HOUSE
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-slate-700 mb-3 sm:mb-4 px-2"
          variants={itemVariants}
        >
          Where children are formed for excellence
        </motion.p>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4"
          variants={itemVariants}
        >
          A private mentorship and mastery academy for discerning families
          raising future-ready children (ages 6–16)
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-4"
          variants={itemVariants}
        >
          <Button size="lg" href="#enroll">
            Request an Invitation
          </Button>
        </motion.div>

        <motion.p
          className="text-xs sm:text-sm italic px-4"
          variants={itemVariants}
        >
          Invitation-only. Values-driven. Deeply intentional.
        </motion.p>
      </motion.div>
    </div>
  );
};
