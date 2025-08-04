"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Handshake } from "lucide-react";

export default function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const partners = [
    { name: "Google", logo: "https://logo.clearbit.com/google.com?size=200" },
    {
      name: "Microsoft",
      logo: "https://logo.clearbit.com/microsoft.com?size=200",
    },
    { name: "GitHub", logo: "https://logo.clearbit.com/github.com?size=200" },
    { name: "Vercel", logo: "https://logo.clearbit.com/vercel.com?size=200" },
    { name: "Stripe", logo: "https://logo.clearbit.com/stripe.com?size=200" },
    { name: "Notion", logo: "https://logo.clearbit.com/notion.so?size=200" },
    { name: "Figma", logo: "https://logo.clearbit.com/figma.com?size=200" },
    { name: "Slack", logo: "https://logo.clearbit.com/slack.com?size=200" },
  ];
  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-blue/80 via-cosmic-navy/90 to-cosmic-deep" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[10rem] left-10 w-72 h-72 bg-space-gradient-start/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-space-gradient-end/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div className="shine-effect inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
            <Handshake className="w-4 h-4 text-space-gradient-start" />
            <span className="text-space-gradient-start font-medium">
              Our Partners
            </span>
          </motion.div>

          <h2 className="font-orbitron text-4xl md:text-6xl lg:text-6xl font-bold mb-6 bg-text-gradient bg-clip-text text-transparent py-1">
            Powering the Future Together
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            We are proud to collaborate with a diverse network of
            forward-thinking organizations and industry leaders.
          </p>
        </motion.div>

        {/* Partners Logo Grid */}
        <div className="group w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]">
            {partners.map((partner, index) => (
              <li key={index}>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-20"
                />
              </li>
            ))}
            {partners.map((partner, index) => (
              <li key={`clone-${index}`} aria-hidden="true">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-20"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
