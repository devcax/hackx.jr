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



// Floating Particles Component
const FloatingParticles = () => {
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
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214, 221, 230, ${particle.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(214, 221, 230, 0.5)";
        ctx.fill();
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

// TextGenerateEffect Component
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

// GlitchyBadge Component
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
        className="inline-block px-8 md:px-10 py-4 md:py-5 rounded-full bg-gradient-to-r from-cosmic-navy to-cosmic-blue border border-space-gradient-start/40 backdrop-blur-md relative overflow-hidden"
        animate={{
          boxShadow: [
            "0 0 20px rgba(214, 221, 230, 0.3)",
            "0 0 40px rgba(214, 221, 230, 0.6)",
            "0 0 20px rgba(214, 221, 230, 0.3)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
        />
        <span
          className={cn(
            "font-orbitron text-xs md:text-sm font-semibold text-white relative z-10",
            glitch && "animate-pulse"
          )}
          style={{
            textShadow: glitch
              ? "2px 2px 0 #2b062bff, -2px -2px 0 #00ffff"
              : "none","alignItems": "center",
            display: "flex",}}
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
      <div className="bg-gray-600 rounded-2xl mx-auto max-w-10xl relative overflow-hidden">
        <div className="relative h-[50vh] md:h-[60vh] flex flex-col justify-center bg-gray-700 rounded-2xl">
          {/* Mouse following glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 hidden md:block rounded-2xl"
            style={{
              background: `radial-gradient(600px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(214, 221, 230, 0.06), transparent 40%)`,
            }}
          />

          {/* Floating Particles */}
          <FloatingParticles />

          {/* Background Video with Parallax */}
          <motion.div className="absolute inset-0 z-0 rounded-2xl overflow-hidden" style={{ y }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-30"
            >
              <source src="/videos/slideshow.mp4" type="video/mp4" />
              <source src="/videos/slideshow.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            {/* Enhanced overlay with animated gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(55, 65, 81, 0.8) 0%, rgba(55, 65, 81, 0.6) 50%, rgba(55, 65, 81, 0.8) 100%)",
              }}
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(55, 65, 81, 0.8) 0%, rgba(55, 65, 81, 0.6) 50%, rgba(55, 65, 81, 0.8) 100%)",
                  "linear-gradient(135deg, rgba(55, 65, 81, 0.7) 0%, rgba(55, 65, 81, 0.5) 50%, rgba(55, 65, 81, 0.7) 100%)",
                  "linear-gradient(135deg, rgba(55, 65, 81, 0.8) 0%, rgba(55, 65, 81, 0.6) 50%, rgba(55, 65, 81, 0.8) 100%)",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
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
                    <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.4 }}
  className="font-orbitron text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-3 md:mb-4"
>
  <motion.span
    style={{
      background:
        "linear-gradient(135deg, #D6DDE6 0%, #AAB6C2 50%, #FFFFFF 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
    animate={{
      filter: [
        "drop-shadow(0 0 20px rgba(214, 221, 230, 0.5))",
        "drop-shadow(0 0 30px rgba(214, 221, 230, 0.8))",
        "drop-shadow(0 0 20px rgba(214, 221, 230, 0.5))",
      ],
    }}
    transition={{ duration: 3, repeat: Infinity }}
  >
    hackX Jr. 8.0 
  </motion.span>
</motion.h1>
                    <motion.span
                      className="text-xl sm:text-2xl md:text-3xl"
                      style={{
                        background:
                          "linear-gradient(135deg, #D6DDE6 0%, #AAB6C2 50%, #FFFFFF 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                      animate={{
                        filter: [
                          "drop-shadow(0 0 20px rgba(214, 221, 230, 0.5))",
                          "drop-shadow(0 0 30px rgba(214, 221, 230, 0.8))",
                          "drop-shadow(0 0 20px rgba(214, 221, 230, 0.5))",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      
                    </motion.span>
                  </motion.h1>
                </motion.div>

                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-center md:text-left">
                  <TextGenerateEffect
                    words="Inter-School Hackathon"
                    className="font-ethnocentric text-lg sm:text-xl md:text-2xl font-light text-space-gradient-start"
                    enableFlicker={true}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="font-rajdhani text-sm sm:text-base md:text-lg text-gray-300"
                  >
                    <span className="inline-block">
                      The Legacy{" "}
                      <motion.span
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          color: ["#D6DDE6", "#AAB6C2", "#D6DDE6"],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Continues...
                      </motion.span>
                    </span>
                  </motion.p>
                </div>

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
                <motion.div
                  className="absolute inset-0 blur-3xl"
                  animate={{
                    background: [
                      "radial-gradient(circle, rgba(214, 221, 230, 0.2) 0%, transparent 70%)",
                      "radial-gradient(circle, rgba(214, 221, 230, 0.3) 0%, transparent 70%)",
                      "radial-gradient(circle, rgba(214, 221, 230, 0.2) 0%, transparent 70%)",
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
                   
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                          top: `${20 + i * 15}%`,
                          left: `${10 + i * 15}%`,
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

          {/* Enhanced Scroll Indicator */}
          <motion.button
            onClick={scrollToNext}
            className="absolute bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 text-space-gradient-start hover:text-white transition-colors duration-300 z-20"
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
                  "radial-gradient(circle, rgba(214, 221, 230, 0) 0%, rgba(214, 221, 230, 0.4) 100%)",
                  "radial-gradient(circle, rgba(214, 221, 230, 0.4) 0%, rgba(214, 221, 230, 0) 100%)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>

          {/* Enhanced gradient blend */}
          <div className="absolute bottom-0 left-0 w-full h-12 md:h-20 bg-gradient-to-t from-gray-700 to-transparent pointer-events-none z-10 rounded-b-2xl" />
        </div>
      </div>
    </section>
  );
}

