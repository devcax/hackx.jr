"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "What is hackX Jr. 8.0?",
      answer:
        "hackX Jr. 8.0 is an inter-school hackathon that empowers students to develop innovative solutions and demonstrate their technical creativity.",
    },
    {
      question: "Who can participate?",
      answer:
        "hackX Jr. 8.0 is an inter-school science hackathon open to school students from grades 9 to 13 who are passionate about science, technology, and innovation. Participants can join individually or in teams of 1 to 5 members.",
    },
    {
      question: "What's the theme for this year?",
      answer:
        "The theme for hackX Jr. 8.0 is 'Give Shapes to Ideas.' It encourages participants to turn their creative thoughts and imaginative ideas into real, workable solutions. The focus is on bringing concepts to life through design, innovation, and problem-solving.",
    },
    {
      question: "What are the prizes?",
      answer:
        "Prizes include cash rewards, tech gadgets, mentorship opportunities, and scholarships for top-performing teams. Exact details will be announced closer to the event.",
    },
    {
      question: "How long is the competition?",
      answer:
        "The hackathon spans 8 weeks, giving participants ample time to ideate, develop, and present their projects.",
    },
    {
      question: "When will hackX Jr 8.0 take place?",
      answer:
        "hackX Jr. 8.0 will take place on the 10 th of November, 2025.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/backgrounds/bg.png')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/15" />
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div className="shine-effect inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
            <span className="text-white font-medium">FAQ</span>
          </motion.div>

          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6 bg-text-gradient bg-clip-text text-transparent py-1">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Everything you need to know about hackX Jr. 8.0
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-2xl shadow-black/25">
            <div className="p-4 space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-white/20 last:border-b-0"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center p-4 text-left"
                  >
                    <span className="text-white font-medium">{item.question}</span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-white" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: openIndex === index ? "auto" : 0,
                      opacity: openIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-gray-300 text-sm">
                      {item.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}