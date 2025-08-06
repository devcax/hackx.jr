import dynamic from "next/dynamic";
import { Suspense } from "react";
import StarryBackground from "@/components/StarryBackground";
import LoadingSpinner from "@/components/LoadingSpinner";
import FloatingNavigation from "@/components/FloatingNavigation";

// Lazy load components for better performance
const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  loading: () => <LoadingSpinner />,
});

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  loading: () => <LoadingSpinner />,
});

const TimelineSection = dynamic(() => import("@/components/TimelineSection"), {
  loading: () => <LoadingSpinner />,
});

const AwardsSection = dynamic(() => import("@/components/AwardsSection"), {
  loading: () => <LoadingSpinner />,
});

const CompetitionDetails = dynamic(
  () => import("@/components/CompetitionDetails"),
  {
    loading: () => <LoadingSpinner />,
  }
);

const TeamSection = dynamic(() => import("@/components/TeamSection"), {
  loading: () => <LoadingSpinner />,
});

const PartnersSection = dynamic(() => import("@/components/PartnersSection"), {
  loading: () => <LoadingSpinner />,
});

const MemoriesSection = dynamic(() => import("@/components/MemoriesSection"), {
  loading: () => <LoadingSpinner />,
});

const FAQSection = dynamic(() => import("@/components/FAQSection"), {
  loading: () => <LoadingSpinner />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <LoadingSpinner />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <StarryBackground />
      <FloatingNavigation />

      <section id="hero">
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
        </Suspense>
      </section>

      <section id="about">
        <Suspense fallback={<LoadingSpinner />}>
          <AboutSection />
        </Suspense>
      </section>

      <section id="timeline">
        <Suspense fallback={<LoadingSpinner />}>
          <TimelineSection />
        </Suspense>
      </section>

      <section id="awards">
        <Suspense fallback={<LoadingSpinner />}>
          <AwardsSection />
        </Suspense>
      </section>

      <section id="details">
        <Suspense fallback={<LoadingSpinner />}>
          <CompetitionDetails />
        </Suspense>
      </section>

      <section id="team">
        <Suspense fallback={<LoadingSpinner />}>
          <TeamSection />
        </Suspense>
      </section>

      

      <section id="memories">
        <Suspense fallback={<LoadingSpinner />}>
          <MemoriesSection />
        </Suspense>
      </section>

      <section id="faq">
        <Suspense fallback={<LoadingSpinner />}>
          <FAQSection />
        </Suspense>
      </section>

      <Footer />
    </main>
  );
}
