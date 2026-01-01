import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "cream" | "slate" | "dark";
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  background = "white",
  id,
}) => {
  const backgroundClasses = {
    white: "bg-white",
    cream: "bg-amber-50",
    slate: "bg-slate-50",
    dark: "bg-slate-900 text-white",
  };

  return (
    <motion.section
      id={id}
      className={`py-20 scroll-mt-24 ${backgroundClasses[background]} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </motion.section>
  );
};
