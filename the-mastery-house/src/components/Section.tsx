import React from "react";

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
    <section
      id={id}
      className={`py-20 scroll-mt-24 ${backgroundClasses[background]} ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
};
