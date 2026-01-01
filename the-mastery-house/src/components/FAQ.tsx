import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can my child join mid-year?",
      answer: "No. We operate one intake annually to protect cohort depth.",
    },
    {
      question: "Is this a replacement school?",
      answer:
        "No. We function as a high-level academic and formation supplement.",
    },
    {
      question: "What if my child struggles?",
      answer: "Personalised mentorship ensures no child is invisible.",
    },
    {
      question: "How involved are parents?",
      answer: "Very. Formation works best when the home is aligned.",
    },
    {
      question: "What kind of children thrive here?",
      answer:
        "Children who are curious, thoughtful, capable, willing to be challenged with care, and ready to grow in discipline and responsibility. This is not a remedial programme it is a formation environment for children with potential.",
    },
    {
      question: "Who are the mentors?",
      answer:
        "Mentors are carefully selected and trained adults who understand child development deeply, model discipline and emotional intelligence, are aligned with our values, and commit to long-term mentorship.",
    },
    {
      question: "Is the Christian foundation compulsory?",
      answer:
        "The Mastery House is Christian in foundation, not performative in expression. We do not require children to recite verses, but biblical principles shape character formation. Parents should be comfortable with excellence pursued with humility and discipline.",
    },
    {
      question: "What is the enrollment process?",
      answer:
        "Our enrollment process is intentionally selective: Complete the Intention Form, attend a private virtual meeting with the Founder, and if aligned, payment is made and onboarding details are shared. Not every family who applies is invited to join.",
    },
  ];

  return (
    <Section background="white" id="faq">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f3d2b] mb-8 sm:mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-slate-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-3 sm:py-4 flex justify-between items-center text-left hover:text-[#b59a5b] transition-colors"
              >
                <span className="text-base sm:text-lg font-semibold text-[#1f3d2b] pr-4">
                  {faq.question}
                </span>
                <motion.span
                  className="text-2xl text-[#b59a5b]"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? "−" : "+"}
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-3 sm:pb-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
