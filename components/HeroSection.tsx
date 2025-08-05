"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

// Enhanced Floating Particles with Multiverse Theme
const MultiverseParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      type: 'particle' | 'rift' | 'portal';
      angle: number;
    }> = [];

    // Create different types of cosmic elements
    for (let i = 0; i < 60; i++) {
      const type = i < 40 ? 'particle' : i < 55 ? 'rift' : 'portal';
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === 'portal' ? Math.random() * 20 + 10 : 
              type === 'rift' ? Math.random() * 5 + 2 : 
              Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * (type === 'particle' ? 0.5 : 0.2),
        speedY: (Math.random() - 0.5) * (type === 'particle' ? 0.5 : 0.2),
        opacity: type === 'portal' ? Math.random() * 0.3 + 0.2 :
                type === 'rift' ? Math.random() * 0.4 + 0.3 :
                Math.random() * 0.5 + 0.3,
        type,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.angle += 0.01;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.save();

        if (particle.type === 'portal') {
          // Draw dimensional portal
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
          );
          gradient.addColorStop(0, `rgba(192, 192, 192, ${particle.opacity})`);
          gradient.addColorStop(0.7, `rgba(128, 128, 128, ${particle.opacity * 0.5})`);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Portal ring
          ctx.strokeStyle = `rgba(160, 160, 160, ${particle.opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.8, 0, Math.PI * 2);
          ctx.stroke();
          
        } else if (particle.type === 'rift') {
          // Draw cosmic rift
          ctx.strokeStyle = `rgba(192, 192, 192, ${particle.opacity})`;
          ctx.lineWidth = particle.size;
          ctx.shadowBlur = 15;
          ctx.shadowColor = `rgba(160, 160, 160, ${particle.opacity})`;
          
          const length = 30;
          ctx.beginPath();
          ctx.moveTo(
            particle.x - Math.cos(particle.angle) * length,
            particle.y - Math.sin(particle.angle) * length
          );
          ctx.lineTo(
            particle.x + Math.cos(particle.angle) * length,
            particle.y + Math.sin(particle.angle) * length
          );
          ctx.stroke();
          
        } else {
          // Draw digital particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 160, 160, ${particle.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(192, 192, 192, ${particle.opacity})`;
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none rounded-2xl"
      style={{ zIndex: 1 }}
    />
  );
};

// Space-Time Shards Component
const SpaceTimeShards = () => {
  return (
    <>
      {/* Floating dimensional shards */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-[300px] h-[200px] bg-gradient-to-br from-gray-500/10 via-gray-400/5 to-gray-600/10 border border-gray-400/20 backdrop-blur-sm rounded-lg"
        animate={{
          rotateX: [15, 20, 15],
          rotateY: [-20, -15, -20],
          rotateZ: [10, 15, 10],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      />
      
      <motion.div
        className="absolute top-[40%] right-[15%] w-[250px] h-[350px] bg-gradient-to-br from-gray-400/10 via-gray-500/5 to-gray-300/10 border border-gray-400/20 backdrop-blur-sm rounded-lg"
        animate={{
          rotateX: [-10, -5, -10],
          rotateY: [25, 30, 25],
          rotateZ: [-15, -10, -15],
          y: [0, -15, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      />
      
      <motion.div
        className="absolute bottom-[25%] left-[30%] w-[200px] h-[280px] bg-gradient-to-br from-gray-600/10 via-gray-400/5 to-gray-500/10 border border-gray-400/20 backdrop-blur-sm rounded-lg"
        animate={{
          rotateX: [20, 25, 20],
          rotateY: [-30, -25, -30],
          rotateZ: [5, 10, 5],
          y: [0, -25, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      />
    </>
  );
};

// Dimensional Portals Component
const DimensionalPortals = () => {
  return (
    <>
      <motion.div
        className="absolute top-[15%] right-[25%] w-[150px] h-[150px] rounded-full border-2 border-gray-400/30"
        style={{
          background: "radial-gradient(circle at center, rgba(220, 220, 220, 0.1) 0%, rgba(128, 128, 128, 0.05) 40%, transparent 70%)"
        }}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(192, 192, 192, 0.2)",
            "0 0 40px rgba(192, 192, 192, 0.4)",
            "0 0 20px rgba(192, 192, 192, 0.2)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-[30%] right-[35%] w-[100px] h-[100px] rounded-full border-2 border-gray-400/30"
        style={{
          background: "radial-gradient(circle at center, rgba(220, 220, 220, 0.1) 0%, rgba(128, 128, 128, 0.05) 40%, transparent 70%)"
        }}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(192, 192, 192, 0.2)",
            "0 0 40px rgba(192, 192, 192, 0.4)",
            "0 0 20px rgba(192, 192, 192, 0.2)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <motion.div
        className="absolute top-[60%] left-[15%] w-[120px] h-[120px] rounded-full border-2 border-gray-400/30"
        style={{
          background: "radial-gradient(circle at center, rgba(220, 220, 220, 0.1) 0%, rgba(128, 128, 128, 0.05) 40%, transparent 70%)"
        }}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(192, 192, 192, 0.2)",
            "0 0 40px rgba(192, 192, 192, 0.4)",
            "0 0 20px rgba(192, 192, 192, 0.2)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </>
  );
};

// Cosmic Rifts Component
const CosmicRifts = () => {
  return (
    <>
      <motion.div
        className="absolute top-[25%] left-[20%] w-[400px] h-[2px] origin-center"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(160, 160, 160, 0.4) 50%, transparent 100%)",
          transform: "rotate(-15deg)"
        }}
        animate={{
          scaleX: [1, 1.2, 1],
          boxShadow: [
            "0 0 10px rgba(160, 160, 160, 0.3)",
            "0 0 30px rgba(192, 192, 192, 0.6)",
            "0 0 10px rgba(160, 160, 160, 0.3)"
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-[70%] right-[20%] w-[300px] h-[2px] origin-center"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(160, 160, 160, 0.4) 50%, transparent 100%)",
          transform: "rotate(25deg)"
        }}
        animate={{
          scaleX: [1, 1.2, 1],
          boxShadow: [
            "0 0 10px rgba(160, 160, 160, 0.3)",
            "0 0 30px rgba(192, 192, 192, 0.6)",
            "0 0 10px rgba(160, 160, 160, 0.3)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", direction: "reverse" }}
      />
      
      <motion.div
        className="absolute top-[45%] left-[50%] w-[250px] h-[2px] origin-center"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(160, 160, 160, 0.4) 50%, transparent 100%)",
          transform: "rotate(-30deg)"
        }}
        animate={{
          scaleX: [1, 1.2, 1],
          boxShadow: [
            "0 0 10px rgba(160, 160, 160, 0.3)",
            "0 0 30px rgba(192, 192, 192, 0.6)",
            "0 0 10px rgba(160, 160, 160, 0.3)"
          ]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </>
  );
};

// Enhanced Text Generate Effect with Gradient Flicker
const TextGenerateEffect = ({
  words,
  className,
  enableFlicker = false,
}: {
  words: string;
  className?: string;
  enableFlicker?: boolean;
}) => {
  const wordsArray = words.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn(className)}
    >
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          variants={child}
          className="inline-block mr-1.5"
          animate={
            enableFlicker
              ? {
                opacity: [1, 0.8, 1],
                filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
              }
              : {}
          }
          transition={
            enableFlicker
              ? {
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.1,
              }
              : {}
          }
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Glitchy Coming Soon Badge
const GlitchyBadge = () => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="relative"
    >
      <motion.div
        className="inline-block px-8 md:px-10 py-4 md:py-5 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-500/40 backdrop-blur-md relative overflow-hidden"
        animate={{
          boxShadow: [
            "0 0 20px rgba(160, 160, 160, 0.3)",
            "0 0 40px rgba(192, 192, 192, 0.6)",
            "0 0 20px rgba(160, 160, 160, 0.3)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Animated gradient sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
        />

        <span
          className={cn(
            "font-orbitron text-xs md:text-sm font-semibold text-gray-200 relative z-10",
            glitch && "animate-pulse"
          )}
          style={{
            textShadow: glitch
              ? "2px 2px 0 #888, -2px -2px 0 #aaa"
              : "none",
          }}
        >
          COMING SOON
        </span>
      </motion.div>
    </motion.div>
  );
};

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Mouse following glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-4 px-4">
      {/* Multiverse Container with enhanced styling */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl mx-auto max-w-10xl relative overflow-hidden">
        <div className="relative h-[50vh] md:h-[60vh] flex flex-col justify-center rounded-2xl">
          {/* Mouse following glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 hidden md:block rounded-2xl"
            style={{
              background: `radial-gradient(600px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(160, 160, 160, 0.08), transparent 40%)`,
            }}
          />

          {/* Multiverse Particles */}
          <MultiverseParticles />
          
          {/* Space-Time Shards */}
          <SpaceTimeShards />
          
          {/* Dimensional Portals */}
          <DimensionalPortals />
          
          {/* Cosmic Rifts */}
          <CosmicRifts />

          {/* Background Video with Parallax */}
          <motion.div className="absolute inset-0 z-0 rounded-2xl overflow-hidden" style={{ y }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-5"
            >
              <source src="/videos/hero.webm" type="video/webm" />
            </video>
            {/* Enhanced overlay with animated gradient */}
            <motion.div
              className="absolute inset-0 bg-black/60"
              animate={{
                background: [
                  "radial-gradient(ellipse at 30% 20%, rgba(64, 64, 64, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(96, 96, 96, 0.2) 0%, transparent 50%)",
                  "radial-gradient(ellipse at 30% 20%, rgba(96, 96, 96, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(64, 64, 64, 0.3) 0%, transparent 50%)",
                  "radial-gradient(ellipse at 30% 20%, rgba(64, 64, 64, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(96, 96, 96, 0.2) 0%, transparent 50%)"
                ]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Main content */}
          <motion.div
            className="relative z-10 w-full max-w-5xl mx-auto px-4 h-full flex items-center justify-center"
            style={{ opacity }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
              {/* Left Column: Text Content */}
              <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center">
                {/* Enhanced Main title with 3D tilt on hover */}
                <motion.div
                  whileHover={{ rotateY: 5, rotateX: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  className="w-full"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="font-orbitron text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 flex flex-col md:flex-row items-center md:items-baseline justify-center md:justify-start gap-2 md:gap-4"
                  >
                    <motion.span
                      style={{
                        background:
                          "linear-gradient(135deg, #E5E5E5 0%, #B8B8B8 50%, #FFFFFF 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                      animate={{
                        filter: [
                          "drop-shadow(0 0 20px rgba(192, 192, 192, 0.5))",
                          "drop-shadow(0 0 30px rgba(224, 224, 224, 0.8))",
                          "drop-shadow(0 0 20px rgba(192, 192, 192, 0.5))",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      hackX 8.0
                    </motion.span>
                    <motion.span
                      className="text-xl sm:text-2xl md:text-3xl"
                      style={{
                        background:
                          "linear-gradient(135deg, #E5E5E5 0%, #B8B8B8 50%, #FFFFFF 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                      animate={{
                        filter: [
                          "drop-shadow(0 0 20px rgba(192, 192, 192, 0.5))",
                          "drop-shadow(0 0 30px rgba(224, 224, 224, 0.8))",
                          "drop-shadow(0 0 20px rgba(192, 192, 192, 0.5))",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Jr.
                    </motion.span>
                  </motion.h1>
                </motion.div>

                {/* Enhanced Subtitle */}
                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-center md:text-left">
                  <TextGenerateEffect
                    words="Inter-School Hackathon"
                    className="font-ethnocentric text-lg sm:text-xl md:text-2xl font-light text-gray-300"
                    enableFlicker={true}
                  />

                  {/* Animated tagline */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="font-rajdhani text-sm sm:text-base md:text-lg text-gray-400"
                  >
                    <span className="inline-block">
                      The Legacy{" "}
                      <motion.span
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          color: ["#9CA3AF", "#D1D5DB", "#9CA3AF"],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Continues...
                      </motion.span>
                    </span>
                  </motion.p>
                </div>

                {/* Glitchy Coming Soon Badge */}
                <div className="flex justify-center md:justify-start w-full">
                  <GlitchyBadge />
                </div>
              </div>

              {/* Right Column: Enhanced Mascot */}
              <motion.div
                className="hidden md:flex items-center justify-center relative"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                style={{ paddingLeft: "100px" }}
              >
                {/* Enhanced glow behind mascot */}
                <motion.div
                  className="absolute inset-0 blur-3xl"
                  animate={{
                    background: [
                      "radial-gradient(circle, rgba(160, 160, 160, 0.2) 0%, transparent 70%)",
                      "radial-gradient(circle, rgba(192, 192, 192, 0.3) 0%, transparent 70%)",
                      "radial-gradient(circle, rgba(160, 160, 160, 0.2) 0%, transparent 70%)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 300 },
                    rotate: { duration: 0.5 },
                  }}
                  className="relative"
                >
                  <Image
                    src="\images\jr-images\JR mascot with lap.png"
                    alt="hackX Jr Mascot"
                    width={600}
                    height={600}
                    className="filter grayscale hover:grayscale-0 transition-all duration-500 ease-in-out cursor-pointer relative z-10"
                  />

                  {/* Enhanced sparkle effects on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gray-300 rounded-full"
                        style={{
                          top: `${15 + i * 12}%`,
                          left: `${8 + i * 12}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Scroll indicator */}
          <motion.button
            onClick={scrollToNext}
            className="absolute bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-300 z-20"
            animate={{
              y: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to next section"
          >
            <ChevronDown size={32} className="md:w-10 md:h-10" />
            <motion.div
              className="absolute inset-0 blur-xl"
              animate={{
                background: [
                  "radial-gradient(circle, rgba(160, 160, 160, 0) 0%, rgba(192, 192, 192, 0.4) 100%)",
                  "radial-gradient(circle, rgba(192, 192, 192, 0.4) 0%, rgba(160, 160, 160, 0) 100%)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>

          {/* Enhanced gradient blend */}
          <div className="absolute bottom-0 left-0 w-full h-12 md:h-20 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none z-10 rounded-b-2xl" />
        </div>
      </div>
    </section>
  );
}
