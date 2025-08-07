"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  
  Facebook,
  
  Mail,
  MapPin,
  ChevronRight,
  ChevronUp,
  Phone,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/hackXJunior/" },
    
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },

    { name: "Timeline", href: "#timeline" },
    { name: "Team", href: "#team" },

    { name: "Memories", href: "#memories" },
    
    
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: "Department of Industrial Management, University of Kelaniya",
      href: "https://www.google.com/maps?client=firefox-b-d&um=1&ie=UTF-8&fb=1&gl=lk&sa=X&geocode=KdsZmeccWOI6MWRE3YdDTFjZ&daddr=XWC8%2BX83,+University+of+Kelaniya,+Peliyagoda,"
    },
    {
      icon: Mail,
      text: "hackxjr.mit@gmail.com",
      href: "mailto:hackxjr.mit@gmail.com",
    },
    {
      icon: Phone,
      text: "+94 12 345 6789",
      href: "tel:+94123456789",
    },
  ];

  return (
    <>
      <footer
        ref={ref}
        className="relative border-t border-white/10 pt-20 pb-10 px-4"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/backgrounds/bg.png')] bg-cover bg-center bg-no-repeat" />
          {/* Subtle gradient overlay for seamless transitions */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: Brand Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="\images\jr-images\jr logo.png"
                alt="hackX Logo"
                width={130}
                height={80}
                className="object-contain mb-4"
              />

              <p className="text-gray-400 text-sm mb-6">
                Inter-School hackathon for school students across Sri Lanka. A flagship event organized by the Department of Industrial Management, University of Kelaniya.
              </p>
              <div className="flex items-center gap-4">
                <img
                  key="department-logo"
                  src="/images/dep-logo.webp"
                  alt="Department of Industrial Management"
                  width={200}
                  className="h-auto"
                />
              </div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-orbitron text-lg font-semibold text-white mb-5 relative pb-2">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 group"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 text-space-gradient-start/70 group-hover:text-space-gradient-start transition-colors" />
                      <span className="text-sm">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Contact Us */}
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-orbitron text-lg font-semibold text-white mb-5 relative pb-2">
                Contact Us
                {/* <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-space-gradient-start rounded-full"></span> */}
              </h4>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.text}
                    href={item.href}
                    className={`group flex items-center gap-3 ${
                      !item.href && "pointer-events-none"
                    }`}
                  >
                    <item.icon className="w-4 h-4 text-space-gradient-start/80 flex-shrink-0 transition-colors duration-300 group-hover:text-white" />
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        item.href
                          ? "text-gray-400 group-hover:text-white"
                          : "text-gray-400"
                      }`}
                    >
                      {item.text}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>


            {/* Column 4: Connect With Us */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-orbitron text-lg font-semibold text-white mb-5 relative pb-2">
                Connect With Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-cosmic-navy/60 border border-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-space-gradient-start/30 hover:border-space-gradient-start/50 transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border-t border-space-gradient-start/20 mt-16 pt-6 text-center content-center"
          >
            <p className="text-gray-400 text-sm text-left">
              Organized by the Department of Industrial Management, University of Kelaniya  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; © 2025 hackX Jr. All rights reserved.
            </p>
            
          </motion.div>
        </div>
      </footer>
    </>
  );
}
