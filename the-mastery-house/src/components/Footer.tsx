import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">
              THE MASTERY HOUSE
            </h3>
            <p className="text-sm">Where children are formed for excellence</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#curriculum"
                  className="hover:text-white transition-colors"
                >
                  Curriculum
                </a>
              </li>
              <li>
                <a
                  href="#tuition"
                  className="hover:text-white transition-colors"
                >
                  Tuition
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Enroll</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/enroll-form"
                  className="hover:text-white transition-colors"
                >
                  Request Invitation
                </a>
              </li>
              <li>
                <a
                  href="/waiting-list"
                  className="hover:text-white transition-colors"
                >
                  Join Waiting List
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} The Mastery House. All rights
            reserved.
          </p>
          <p className="mt-2 italic text-slate-400">
            Invitation-only. Values-driven. Deeply intentional.
          </p>
        </div>
      </div>
    </footer>
  );
};
