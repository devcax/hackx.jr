"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Sparkles, Target, Users, Trophy, ArrowRight } from "lucide-react";
import LetterGlitch from "./ui/LetterGlitch";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Target,
      title: "Sustainable Innovation",
      description: "Focus on groundbreaking ideas that shape the future",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Inter-School",
      description: "Connecting brilliant minds across all Schools",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Trophy,
      title: "Premier Platform",
      description: "Present ideas to esteemed industry experts",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Sparkles,
      title: "Investor Support",
      description: "Build connections and gain investor backing",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Background image only */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/backgrounds/bg.png')] bg-cover bg-center bg-no-repeat" />
        {/* Subtle gradient overlay for seamless transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
        {/* Top and bottom fade effects */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with left-aligned text and right-aligned mascot */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between gap-6 mb-20"
        >
          <div className="text-left">
            <motion.div className="shine-effect inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
              <Sparkles className="w-4 h-4 inline text-space-gradient-start" />
              <span className="text-white/80 font-medium">About hackX Jr.</span>
            </motion.div>

            <h2 className="font-orbitron text-4xl md:text-6xl lg:text-6xl font-bold mb-6 py-1">
              <motion.span
                className="inline-block bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent py-1"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Empowering
              </motion.span>{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-space-gradient-start to-space-gradient-end bg-clip-text text-transparent py-1"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Innovation
              </motion.span>
            </h2>

            <motion.p
              className="text-xl text-white/60 max-w-2xl text-left"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Where visionary ideas meet transformative opportunities
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Image
              src="images\mascott.webp"
              alt="hackX Jr. Mascot"
              width={320}
              height={320}
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                className="relative"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-space-gradient-start to-space-gradient-end rounded-full" />
                <p className="text-lg text-gray-300 pl-6 leading-relaxed">
                  <span className="text-2xl font-bold bg-gradient-to-r from-space-gradient-start to-space-gradient-end bg-clip-text text-transparent">
                    hackX Jr.
                  </span>{" "}
                  is Sri Lanka's premier inter-school hackathon,
                  organized by the{" "}
                  <span className="text-white font-semibold">IMSSA</span> of the
                  University of Kelaniya partnering with Ministry of Science and Technology
                </p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-space-gradient-start to-space-gradient-end rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold text-slate-800">8</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Eighth Edition
                  </h3>
                </div>
                <p className="text-gray-400">
                  Celebrating the Eighth Edition of empowering creativity, with the theme “Give Shapes to Ideas.”{" "}
                  <span className="text-white font-medium">
                    "Sustainable Innovation"
                  </span>
                </p>
              </motion.div>

              <p className="text-gray-300 leading-relaxed">
                hackX Jr. 8.0 offers school students a unique platform to showcase their innovative ideas, gain exposure to real-world problem solving, and take their first step in transforming ideas into reality.
              </p>
            </div>

            <motion.button
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-space-gradient-start to-space-gradient-end rounded-full font-medium text-slate-800 shadow-lg shadow-space-gradient-start/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About hackX Jr.
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 overflow-hidden"
                whileHover={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-space-gradient-start/20 to-space-gradient-end/20 blur-3xl" />

                <div className="relative text-center space-y-6">
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Image
                      src="/images/jr-images/jr logo.png"
                      alt="hackX Jr. 8.0 Logo"
                      width={200}
                      height={120}
                      className="object-contain"
                    />
                  </motion.div>
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold bg-gradient-to-r from-space-gradient-start to-space-gradient-end bg-clip-text text-transparent">
                      A Decade of Innovation
                    </p>
                    <p className="text-white/60">2016 - 2025</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                    <div>
                      <p className="text-2xl font-bold text-white">250+</p>
                      <p className="text-sm text-white/60">Participants</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">50+</p>
                      <p className="text-sm text-white/60">Schools</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">100+</p>
                      <p className="text-sm text-white/60">Submissions</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full overflow-hidden transition-all duration-300 group-hover:border-white/20">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <div className="relative w-14 h-14 rounded-lg bg-gradient-to-br from-space-gradient-start/20 to-space-gradient-end/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-space-gradient-start" />
                </div>

                <h3 className="font-orbitron text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-5 rounded-bl-3xl`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}