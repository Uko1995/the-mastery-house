import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent "
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <a href="/" className="shrink-0">
            <img
              src="/TheMastery.png"
              alt="The Mastery House"
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? "h-16 sm:h-20" : "h-20 sm:h-24"
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-6 xl:gap-8 items-center">
            <a
              href="/"
              className="text-sm xl:text-base text-slate-700 hover:text-slate-900 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#promise"
              className="text-sm xl:text-base text-slate-700 hover:text-slate-900 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#curriculum"
              className="text-sm xl:text-base text-slate-700 hover:text-slate-900 transition-colors font-medium"
            >
              Curriculum
            </a>
            <a
              href="#tuition"
              className="text-sm xl:text-base text-slate-700 hover:text-slate-900 transition-colors font-medium"
            >
              Tuition
            </a>
            <a
              href="#faq"
              className="text-sm xl:text-base text-slate-700 hover:text-slate-900 transition-colors font-medium"
            >
              FAQ
            </a>
            <Button size="sm" href="#enroll">
              Request Invitation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 space-y-3 bg-white rounded-lg shadow-lg px-4"
            >
              <a
                href="/"
                onClick={closeMobileMenu}
                className="block py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#promise"
                onClick={closeMobileMenu}
                className="block py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#curriculum"
                onClick={closeMobileMenu}
                className="block py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium"
              >
                Curriculum
              </a>
              <a
                href="#tuition"
                onClick={closeMobileMenu}
                className="block py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium"
              >
                Tuition
              </a>
              <a
                href="#faq"
                onClick={closeMobileMenu}
                className="block py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium"
              >
                FAQ
              </a>
              <div className="pt-2">
                <Button size="sm" href="#enroll" className="w-full">
                  Request Invitation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
