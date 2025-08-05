"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Calendar,
  Users,
  Lightbulb,
  Trophy,
  Send,
  Star,
  Code,
  Rocket,
} from "lucide-react";

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const hackXTimelineData = [
    {
      phase: "Phase 1",
      title: "Registration Open 📅",
      description:
        "Participants can begin registering for the competition.",
      icon: Send,
      date: "6th August 2025",
      color: "from-blue-500 to-cyan-500",
    },
    {
      phase: "Phase 2",
      title: "Awareness Session 🎤",
      description:
        "An introductory session to explain the competition details, expectations, and benefits.",
      icon: Star,
      date: " 13th August 2025",
      color: "from-purple-500 to-pink-500",
    },
    {
      phase: "Phase 3",
      title: "Deadline for Proposal Submission 🛑",
      description:
        "Last day to submit proposals. Late submissions will not be accepted.",
      icon: Users,
      date: "5th September 2025",
      color: "from-green-500 to-emerald-500",
    },
    {
      phase: "Phase 4",
      title: "Online Workshop Series 1 💻",
      description:
        "Virtual workshop to guide and mentor teams on refining their ideas.",
      icon: Lightbulb,
      date: "12th September 2025",
      color: "from-yellow-500 to-orange-500",
    },
    {
      phase: "Phase 5",
      title: " InnoX Semifinal 🚀",
      description:
        "Selected teams pitch their ideas in the semifinal round for a chance to enter the finals.",
      icon: Trophy,
      date: "27th September 2025",
      color: "from-red-500 to-rose-500",
    },
    {
      phase: "Phase 6",
      title: "Online Workshop Series 2 💡",
      description:
        "Second virtual workshop focused on developing and finalizing the project for the finals.",
      icon: Calendar,
      date: "1st October 2025",
      color: "from-indigo-500 to-violet-500",
    },
    {
      phase: "Phase 7",
      title: "Grand Finals 🏆",
      description:
        "Top teams compete in the final round and winners are announced.",
      icon: Code,
      date: "10th October 2025",
      color: "from-pink-500 to-purple-500",
    },



  ];

  // Using same data for mockup - replace with actual data
  const ideaSprintTimelineData = [
    {
      phase: "Phase 1",
      title: "Registration Opens",
      description:
        "Teams register for the hackathon. Form your team and prepare for the coding challenge ahead.",
      icon: Code,
      date: "Week 1",
      color: "from-blue-500 to-cyan-500",
    },
    {
      phase: "Phase 2",
      title: "Workshop Series",
      description:
        "Attend technical workshops and learn from industry experts about the latest technologies and best practices.",
      icon: Rocket,
      date: "Week 2-3",
      color: "from-purple-500 to-pink-500",
    },
    {
      phase: "Phase 3",
      title: "24-Hour Hackathon",
      description:
        "The main event! Code for 24 hours straight, build your solution, and bring your ideas to life.",
      icon: Code,
      date: "Week 4",
      color: "from-green-500 to-emerald-500",
    },
    {
      phase: "Phase 4",
      title: "Project Submission",
      description:
        "Submit your completed projects with documentation, demo videos, and presentation materials.",
      icon: Send,
      date: "Week 4",
      color: "from-yellow-500 to-orange-500",
    },
    {
      phase: "Phase 5",
      title: "Awards Ceremony",
      description:
        "Present your solutions to judges. Winners announced and prizes distributed to top teams.",
      icon: Trophy,
      date: "Week 5",
      color: "from-red-500 to-rose-500",
    },
  ];

  const timelines = {
    hackx: {
      title: "hackX",
      subtitle: "Journey to Innovation",
      data: hackXTimelineData,
      icon: Lightbulb,
    },
    ideasprint: {
      title: "hackX Jr",
      subtitle: "Code Your Vision",
      data: ideaSprintTimelineData,
      icon: Code,
    },
  };

  const [activeTimeline, setActiveTimeline] =
    useState<keyof typeof timelines>("hackx");
  const currentTimeline = timelines[activeTimeline];

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-blue/80 via-cosmic-navy/90 to-cosmic-deep" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[15rem] right-10 w-96 h-96 bg-space-gradient-end/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <motion.div className="shine-effect inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
            <Calendar className="w-4 h-4 inline text-space-gradient-start" />
            <span className="text-space-gradient-start font-medium">
              Competition Timeline
            </span>
          </motion.div>

          {/* Animated Title */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentTimeline.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="font-orbitron text-4xl md:text-6xl font-bold mb-6 bg-text-gradient bg-clip-text text-transparent py-1"
            >
              {currentTimeline.subtitle}
            </motion.h2>
          </AnimatePresence>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Follow the path from idea to reality through our structured
            competition phases
          </p>
        </motion.div>

        {/* Timeline Switcher */}
        <div className="flex justify-center mb-20">
          <div className="bg-cosmic-navy/40 backdrop-blur-md p-1 rounded-xl border border-space-gradient-start/10">
            <div className="flex relative">
              {/* Active Indicator */}
              <motion.div
                className="absolute h-full bg-gradient-to-r from-space-gradient-start/20 to-space-gradient-end/20 rounded-lg"
                initial={false}
                animate={{
                  x: activeTimeline === "hackx" ? 0 : "100%",
                  width: activeTimeline === "hackx" ? "50%" : "50%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {/* Tab Buttons */}
              {Object.entries(timelines).map(([key, timeline]) => (
                <button
                  key={key}
                  onClick={() =>
                    setActiveTimeline(key as keyof typeof timelines)
                  }
                  className={`relative z-10 px-6 py-3 rounded-lg font-rajdhani font-semibold transition-all duration-300 ${
                    activeTimeline === key
                      ? "text-space-gradient-start"
                      : "text-space-gradient-start/50 hover:text-space-gradient-start/70"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <timeline.icon className="w-4 h-4" />
                    <span>{timeline.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Container with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTimeline}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Central line - starts after logo */}
            <div className="absolute left-1/2 top-24 bottom-0 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-space-gradient-start/20 via-space-gradient-end/40 to-space-gradient-start/10" />

            {/* Logo as timeline origin */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center mb-4"
            >
              {/* Logo container */}
              <div className="relative group">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-space-gradient-start/20 to-space-gradient-end/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Main container */}
                <div className="relative bg-cosmic-navy/60 backdrop-blur-md p-4 rounded-full border border-space-gradient-start/20 group-hover:border-space-gradient-start/40 transition-all duration-300">
                  {/* Inner circle */}
                  <div className="w-20 h-20 rounded-full bg-cosmic-deep/80 flex items-center justify-center overflow-hidden">
                    <Image
                      src="images\jr-images\jr logo.webp"
                      alt="HackX Logo"
                      width={60}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4 md:space-y-0 pt-16">
              {currentTimeline.data.map((item, index) => (
                <motion.div
                  key={`${activeTimeline}-${item.phase}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`flex items-center my-8 md:my-0 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-5/12">
                    <div className="bg-cosmic-navy/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 m-4 hover:border-space-gradient-start/30 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold text-space-gradient-start">
                          {item.phase}
                        </span>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-500 text-xs">
                          {item.date}
                        </span>
                      </div>

                      <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>

                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Icon and Connector */}
                  <div className="hidden md:flex w-2/12 items-center justify-center relative">
                    {/* Connector line */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 h-px w-1/2 bg-space-gradient-start/30 ${
                        index % 2 === 0 ? "right-1/2" : "left-1/2"
                      }`}
                    />
                    {/* Icon */}
                    <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-space-gradient-start/20 to-space-gradient-end/20 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-space-gradient-start" />
                    </div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
