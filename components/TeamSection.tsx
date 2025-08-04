"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Linkedin, Twitter, Instagram, Mail, Users, Phone } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect(emblaApi);
    });
    onSelect(emblaApi);
  }, [emblaApi, onSelect]);

  const teamMembers = [
    {
      name: "Pasindu Kumarage",
      role: "hackX Jr. Coordinator",
      image: "/images/team/sajith.webp",
      social: {
        email: "samantha@imssa.lk",
        phone: "123-456-7890",
      },
    },
    {
      name: "Lakshika Shankari",
      role: "hackX Jr. Coordinator",
      image: "/images/team/dinethya.webp",
      social: {
        email: "ravindu@imssa.lk",
        phone: "123-456-7890",
      },
    },
    {
      name: "Nadeesha Nilupul",
      role: "Media Coordinator",
      image: "/images/team/thenul.webp",
      social: {
        email: "ishara@imssa.lk",
        phone: "123-456-7890",
      },
    },
    {
      name: "Bodhana Jayawickrama",
      role: "ideasprint Coordinator",
      image: "/images/team/rochelle.webp",
      social: {
        email: "kasun@imssa.lk",
        phone: "123-456-7890",
      },
    },
  ];

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deep via-cosmic-navy/90 to-cosmic-blue/80" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div className="shine-effect inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
            <Users className="w-4 h-4 inline mr-2 text-space-gradient-start" />
            <span className="text-space-gradient-start font-medium">
              Meet Our Team
            </span>
          </motion.div>

          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6 bg-text-gradient bg-clip-text text-transparent">
            The Visionaries
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Meet the dedicated team behind  Jr. 8.0, working tirelessly to
            create an unforgettable experience
          </p>
        </motion.div>

        {/* Team Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] p-4"
                >
                  <div className="group relative bg-cosmic-navy/60 backdrop-blur-sm border border-space-gradient-start/10 rounded-2xl p-6 text-center transition-all duration-300 hover:border-space-gradient-start/20">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-cosmic-blue/50 shadow-inner-lg shadow-cosmic-deep">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
                      />
                      {/* Dark blue tint overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-deep/70 to-cosmic-blue/50 mix-blend-hard-light transition-all duration-500 group-hover:opacity-0" />
                    </div>

                    <h3 className="font-orbitron text-xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-space-gradient-start font-semibold mb-4">
                      {member.role}
                    </p>

                    <div className="flex justify-center gap-3">
                      <a
                        href={`mailto:${member.social.email}`}
                        className="w-10 h-10 bg-cosmic-blue/50 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-space-gradient-start/30 transition-colors duration-300"
                      >
                        <Mail size={18} />
                      </a>
                      <a
                        href={`tel:${member.social.phone}`}
                        className="w-10 h-10 bg-cosmic-blue/50 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-space-gradient-start/30 transition-colors duration-300"
                      >
                        <Phone size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Pagination */}
          <div className="flex justify-center gap-3 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                  index === selectedIndex
                    ? "w-8 bg-gradient-to-r from-space-gradient-start to-space-gradient-end"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
