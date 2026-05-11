"use client";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic imports for performance
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/ui/ParticleField"), { ssr: false });
const FloatingNav = dynamic(() => import("@/components/ui/FloatingNav"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"));
const TimelineSection = dynamic(() => import("@/components/sections/TimelineSection"));
const ReasonsSection = dynamic(() => import("@/components/sections/ReasonsSection"));
const GallerySection = dynamic(() => import("@/components/sections/GallerySection"));
const PoetrySection = dynamic(() => import("@/components/sections/PoetrySection"));
const LetterSection = dynamic(() => import("@/components/sections/LetterSection"));
const MusicSection = dynamic(() => import("@/components/sections/MusicSection"));
const FinalSection = dynamic(() => import("@/components/sections/FinalSection"));

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <main className="relative min-h-[100dvh] bg-[#080818]">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Loading screen */}
      <AnimatePresence mode="wait">
        {!loaded && (
          <LoadingScreen onComplete={handleLoadComplete} />
        )}
      </AnimatePresence>

      {/* Main site content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Always-on elements */}
            <CustomCursor />
            <ParticleField />
            <FloatingNav />

            {/* Sections */}
            <HeroSection />
            <TimelineSection />
            <ReasonsSection />
            <GallerySection />
            <PoetrySection />
            <LetterSection />
            <MusicSection />
            <FinalSection />

            {/* Footer */}
            <footer className="relative py-8 px-6 text-center border-t border-white/5">
              <p className="text-white/20 text-xs tracking-widest">
                Made with{" "}
                <motion.span
                  className="text-rose-500"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ display: "inline-block" }}
                >
                  ❤️
                </motion.span>
                {" "}especially for Salma · {new Date().getFullYear()}
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden easter egg - Ctrl+K */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 0.3, 0], y: [10, 0, -10] }}
          transition={{ duration: 5, delay: 10, repeat: Infinity, repeatDelay: 30 }}
          className="text-white/20 text-xs tracking-widest"
        >
          💌 psst... you&apos;re the best thing that happened to anyone who knows you
        </motion.div>
      </div>
    </main>
  );
}
