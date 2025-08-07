"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Trophy,
  Medal,
  Award,
  Star,
  Crown,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";
import Image from "next/image"; 

export default function AwardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

 const awardsData = [
    {
      position: "1st Place",
      title: "Champion",
      prize: "LKR 75,000",
      icon: Trophy,/*"Images/firstplace.png",*/ // Use image path
      color: "from-yellow-400 via-yellow-500 to-yellow-600",
      bgGradient: "from-yellow-500/20 via-yellow-500/10 to-transparent",
      shadowColor: "rgba(251, 191, 36, 0.5)",
      glowColor: "yellow",
      
      

    },
    {
      position: "2nd Place",
      title: "First Runner-up",
      prize: "LKR 50,000",
      icon: Award, /*"Images/secondplace.png"*/// Use image path
      color: "from-gray-300 via-gray-400 to-gray-500",
      bgGradient: "from-gray-400/20 via-gray-400/10 to-transparent",
      shadowColor: "rgba(156, 163, 175, 0.5)",
      glowColor: "gray",
    },
    {
      position: "3rd Place",
      title: "Second Runner-up",
      prize: "LKR 30,000",
      icon: Medal,/*"Images/thirdplace.png",*/ // Use image path
      color: "from-amber-600 via-amber-700 to-amber-800",
      bgGradient: "from-amber-700/20 via-amber-700/10 to-transparent",
      shadowColor: "rgba(217, 119, 6, 0.5)",
      glowColor: "amber",
    },
  ];
// ...existing code...

// Remove this block; the correct icon rendering is already handled inside the map callback below.

  // Reorder for display: 2nd, 1st, 3rd
  const awards = [awardsData[1], awardsData[0], awardsData[2]];
  const animationDelays = [0.2, 0, 0.2];

  return (
    <section
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-4 overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/backgrounds/bg.png')] bg-cover bg-center bg-no-repeat" />
        {/* Subtle gradient overlay for seamless transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/15" />
        {/* Top and bottom fade effects */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div className="shine-effect inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
            <Trophy className="w-4 h-4 inline  text-space-gradient-start" />
            <span className="text-space-gradient-start font-medium">
              Competition Awards
            </span>
          </motion.div>

          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6 bg-text-gradient bg-clip-text text-transparent">
            Awards
          </h2>

          <motion.p
            className="text-xl text-white/60 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Exceptional prizes and transformative opportunities for innovative
            minds
          </motion.p>
        </motion.div>

        {/* Main Awards Grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-12 items-end mb-20 px-4 sm:px-0">
          {awards.map((award, index) => {
            const isFirstPlace = award.position === "1st Place";
            return (
              <motion.div
                key={award.position}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        scale: isFirstPlace ? 1.08 : 1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.8,
                  delay: animationDelays[index],
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
              >
                {/* Card */}
                <motion.div
                  className="relative h-full rounded-3xl overflow-hidden"
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    boxShadow: isFirstPlace
                      ? `0 0 40px -5px ${award.shadowColor}`
                      : "none",
                  }}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${award.bgGradient}`}
                  />

                  {/* Glass card */}
                  <div className="relative h-full bg-white/1 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-white/20 transition-all duration-500">
                    {/* Content */}
                    <div className="text-center">
                      {/* Icon container */}
                      <motion.div
                        className="relative mx-auto mb-6 sm:mb-8"
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-gradient-to-br ${award.color} flex items-center justify-center shadow-2xl`}
                        >
                          <award.icon
                            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                            aria-label={`${award.position} icon`}
                          />
                        </div>
                      </motion.div>

                      {/* Title section */}
                      <div className="mb-6">
                        <p className="text-sm font-medium text-white/60 mb-2">
                          {award.position}
                        </p>
                        <h3 className="font-orbitron text-2xl sm:text-3xl font-bold text-white mb-4">
                          {award.title}
                        </h3>

                        {/* Prize amount */}
                        <div className="relative">
                          <p
                            className={`font-orbitron text-3xl sm:text-4xl font-bold bg-gradient-to-r ${award.color} bg-clip-text text-transparent`}
                          >
                            {award.prize}
                          </p>
                          <p className="text-sm text-white/50 mt-1">
                            Cash Prize
                          </p>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
