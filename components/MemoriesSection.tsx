"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { Camera, X } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function MemoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const memories = [
    {
      id: 1,
      image: "/images/gallery/1.webp",
      title: "hackX Jr. 8.0 Grand Finale",
      description: "Teams presenting their innovative solutions",
    },
    {
      id: 2,
      image: "/images/gallery/2.webp",
      title: "Mentorship Sessions",
      description: "Industry experts guiding participants",
    },
    {
      id: 3,
      image: "/images/gallery/3.webp",
      title: "Winners Celebration",
      description: "Celebrating innovative minds",
    },
    {
      id: 4,
      image: "/images/gallery/4.webp",
      title: "Networking Sessions",
      description: "Building valuable connections",
    },
    {
      id: 5,
      image: "/images/gallery/5.webp",
      title: "Pitch Presentations",
      description: "Teams showcasing their startups",
    },
    {
      id: 6,
      image: "/images/gallery/6.webp",
      title: "Workshops & Training",
      description: "Skill development sessions",
    },
  ];

  // By duplicating the slides, we provide more items for Swiper's loop mode,
  // ensuring a seamless transition in both directions.
  const loopedMemories = [...memories, ...memories];

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "unset";
  };

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/backgrounds/bg.png')] bg-cover bg-center bg-no-repeat" />
        {/* Subtle gradient overlay for seamless transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/15" />
        {/* Top and bottom fade effects */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div className="shine-effect inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
            <Camera className="w-4 h-4 inline  text-space-gradient-start" />
            <span className="text-space-gradient-start font-medium">
              Memories
            </span>
          </motion.div>

          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6 bg-text-gradient bg-clip-text text-transparent">
            Moments of Innovation
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Relive the inspiring moments from previous hackX Jr. events and see the
            passion for innovation in action
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:px-12"
        >
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 150,
              modifier: 1.2,
              slideShadows: true,
            }}
            pagination={{
              type: "progressbar",
              clickable: true,
            }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="memories-swiper"
            breakpoints={{
              320: {
                spaceBetween: 20,
              },
              768: {
                spaceBetween: 30,
              },
              1024: {
                spaceBetween: 40,
              },
            }}
          >
            {loopedMemories.map((memory, index) => (
              <SwiperSlide
                key={`${memory.id}-${index}`}
                className="max-w-sm rounded-2xl overflow-hidden"
              >
                <motion.div
                  className="group cursor-pointer h-full"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openLightbox(memory.image)}
                >
                  <div className="relative h-full bg-cosmic-navy/60 backdrop-blur-sm border border-space-gradient-start/20 rounded-2xl overflow-hidden hover:border-space-gradient-start/40 transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={memory.image}
                        alt={memory.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Hover content */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <div className="w-16 h-16 bg-space-gradient-start/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-space-gradient-start/40">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-orbitron text-lg font-semibold text-white mb-2">
                        {memory.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {memory.description}
                      </p>
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-space-gradient-start/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(214, 221, 230, 0)",
                          "0 0 20px rgba(214, 221, 230, 0.3)",
                          "0 0 0px rgba(214, 221, 230, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <motion.div
            className="relative max-w-4xl max-h-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Memory"
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            <motion.button
              className="absolute top-4 right-4 w-12 h-12 bg-cosmic-navy/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-space-gradient-start/20 transition-colors duration-300"
              onClick={closeLightbox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Custom styles for Swiper */}
      <style jsx global>{`
        .memories-swiper {
          padding-bottom: 50px;
        }

        .memories-swiper .swiper-slide {
          background: transparent;
          width: 350px;
        }

        .memories-swiper .swiper-pagination {
          bottom: 0 !important;
          top: auto !important;
        }

        .memories-swiper .swiper-pagination-progressbar {
          height: 4px !important;
          background: rgba(214, 221, 230, 0.2);
          border-radius: 10px;
          width: 30% !important;
          margin: 0 auto;
          left: 35%;
        }

        .memories-swiper .swiper-pagination-progressbar-fill {
          background: #d6dde6;
          border-radius: 10px;
        }

        .memories-swiper .swiper-button-next,
        .memories-swiper .swiper-button-prev {
          color: #d6dde6;
          background: rgba(19, 40, 51, 0.6);
          backdrop-filter: blur(4px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid rgba(214, 221, 230, 0.2);
        }

        .memories-swiper .swiper-button-next:after,
        .memories-swiper .swiper-button-prev:after {
          font-size: 18px;
        }
      `}</style>
    </section>
  );
}
