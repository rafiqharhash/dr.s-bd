"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    // Generate floating hearts
    const h = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * 20 + 12,
    }));
    setHearts(h);

    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("reveal"), 200);
          setTimeout(() => onComplete(), 1800);
          return 100;
        }
        return prev + Math.random() * 4 + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse at center, #0f0f28 0%, #080818 100%)" }}
      >
        {/* Animated star field */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 3 + "s",
              animationDuration: Math.random() * 3 + 2 + "s",
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}

        {/* Floating hearts */}
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-rose-500/30 pointer-events-none select-none"
            style={{
              left: `${heart.x}%`,
              bottom: "-50px",
              fontSize: `${heart.size}px`,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              opacity: [0, 0.6, 0],
              rotate: [0, heart.x > 50 ? 20 : -20],
            }}
            transition={{
              duration: 4 + heart.delay,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            ❤
          </motion.div>
        ))}

        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #f43f5e 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #9333ea 0%, transparent 70%)", filter: "blur(40px)" }} />

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center z-10 px-8"
        >
          {/* Heart icon */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-8 block"
          >
            ❤️
          </motion.div>

          <motion.h1
            className="section-title gradient-text mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Happy Birthday
          </motion.h1>

          <motion.div
            className="text-7xl md:text-8xl font-bold mb-2"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <span className="gradient-text-gold">Salma</span>
          </motion.div>

          <motion.p
            className="text-white/50 text-sm tracking-[0.3em] uppercase mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            A special moment loading...
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="mt-10 w-64 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #f43f5e, #ec4899, #9333ea)",
                  width: `${Math.min(progress, 100)}%`,
                  transition: "width 0.1s ease",
                  boxShadow: "0 0 10px rgba(244, 63, 94, 0.6)",
                }}
              />
            </div>
            <motion.p
              className="text-center text-white/30 text-xs mt-2 tracking-widest"
              animate={phase === "reveal" ? { opacity: 0 } : { opacity: 1 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Reveal overlay */}
        <AnimatePresence>
          {phase === "reveal" && (
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-gradient-to-b from-rose-500/20 to-purple-900/20"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
