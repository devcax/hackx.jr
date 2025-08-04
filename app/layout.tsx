import "./globals.css";
import type { Metadata } from "next";
import { Orbitron, Rajdhani, Exo } from "next/font/google";
import { ethnocentric } from "@/public/fonts/ethnocentric";
import SmoothScroll from "@/components/SmoothScroll";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const exo = Exo({
  subsets: ["latin"],
  variable: "--font-exo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hackX Jr.",
  description:
    "hackX Jr. is a renowned inter-school hackathon organized by IMSSA, University of Kelaniya. Join us for the eighth edition focusing on Sustainable Innovation.",
  keywords:
    "hackX Jr,hackX Jr 8.0, inter-school hackathon, university, innovation, Sri Lanka, IMSSA, Kelaniya",
  authors: [{ name: "IMSSA - University of Kelaniya" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0A121A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} ${exo.variable} ${ethnocentric.variable}`}
    >
      <body className="bg-cosmic-deep text-white font-rajdhani overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
