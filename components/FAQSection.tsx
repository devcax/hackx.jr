"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // FAQ Data
  const faqData = [
    {
      question: "What is hackX Jr. 8.0?",
      answer:
        "hackX Jr. 8.0 is Sri Lanka's premier inter-school hackathon, organized by IMSSA, University of Kelaniya, focusing on sustainable innovation.",
    },
    {
      question: "Who can participate?",
      answer: "Students from any school in Sri Lanka can participate in teams.",
    },
    {
      question: "What's the theme for this year?",
      answer: "The theme for 2025 is 'Sustainable Innovation'.",
    },
    {
      question: "What are the prizes?",
      answer: "Prizes include cash awards, certificates, and funding opportunities.",
    },
    {
      question: "How long is the competition?",
      answer: "The competition spans 8 weeks, from August 10 to September 5, 2025.",
    },
    {
      question: "When will hackX Jr 8.0 take place?",
      answer: "The event runs from August 10 to September 5, 2025.",
    },
  ];

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden ">
      {/* Background unchanged */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-blue/80 via-cosmic-navy/90 to-cosmic-deep" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div className="shine-effect inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
            <span className="text-space-gradient-start font-medium">FAQs</span>
          </motion.div>

          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6 bg-text-gradient bg-clip-text text-transparent py-1">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Find answers to common questions about hackX Jr. 8.0
          </p>
        </motion.div>

        {/* Collapsible FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b border-space-gradient-start/20 last:border-b-0"
            >
              <button
                onClick={() =>
                  setOpenFAQ(openFAQ === index ? null : index)
                }
                className="w-full text-left py-4 px-6 flex justify-between items-center text-white hover:bg-cosmic-blue/30 rounded-lg transition-all duration-300"
              >
                <span className="font-medium">{item.question}</span>
                {openFAQ === index ? (
                  <Minus className="w-5 h-5 text-space-gradient-start" />
                ) : (
                  <Plus className="w-5 h-5 text-space-gradient-start" />
                )}
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-300"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}