"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronUp, Menu, X, Rocket } from "lucide-react";
import Image from "next/image";

export default function FloatingNavigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "timeline", label: "Timeline" },
    // { id: "awards", label: "Awards" },
    // { id: "details", label: "Details" },
    { id: "team", label: "Team" },
    { id: "partners", label: "Partners" },
    { id: "memories", label: "Memories" },
    { id: "faq", label: "FAQ" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Show navigation after scrolling 100px
      setIsVisible(scrollY > 100);

      // Show back to top after scrolling 500px
      setShowBackToTop(scrollY > 500);

      // Update active section based on scroll position
      const sections = navItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id: item.id,
              top: rect.top,
              bottom: rect.bottom,
            };
          }
          return null;
        })
        .filter(Boolean);

      const currentSection = sections.find(
        (section) => section && section.top <= 100 && section.bottom > 100
      );

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Navigation */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-0 right-0 z-50 flex justify-center"
          >
            <motion.div className="bg-cosmic-navy/80 backdrop-blur-md border border-space-gradient-start/20 rounded-full px-6 py-3 shadow-2xl">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <motion.button
                  onClick={scrollToTop}
                  className="flex items-center gap-2 mr-2"
                  aria-label="Scroll to top"
                >
                  <Image
                    src="\images\jr-images\jr logo.png"
                    alt="hackX Jr. Logo"
                    width={70}
                    height={40}
                    className="object-contain"
                  />
                </motion.button>

                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-space-gradient-start/20 text-space-gradient-start"
                        : "text-gray-300 hover:text-space-gradient-start hover:bg-space-gradient-start/10"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center justify-between w-full">
                <motion.button
                  onClick={scrollToTop}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  aria-label="Scroll to top"
                >
                  <Image
                    src="\images\jr-images\jr logo.png"
                    alt="hackX Jr. Logo"
                    width={50}
                    height={30}
                    className="object-contain"
                  />
                </motion.button>

                <motion.button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-10 h-10 rounded-full bg-space-gradient-start/20 flex items-center justify-center text-space-gradient-start ml-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
              </div>
            </motion.div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-4 right-4 mt-2 bg-cosmic-navy/90 backdrop-blur-md border border-space-gradient-start/20 rounded-2xl p-4 shadow-2xl"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {navItems.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          activeSection === item.id
                            ? "bg-space-gradient-start/20 text-space-gradient-start"
                            : "text-gray-300 hover:text-space-gradient-start hover:bg-space-gradient-start/10"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-space-gradient-start to-space-gradient-end rounded-full flex items-center justify-center shadow-2xl z-50 hover:shadow-3xl transition-all duration-300"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(214, 221, 230, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="w-6 h-6 text-cosmic-deep" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
