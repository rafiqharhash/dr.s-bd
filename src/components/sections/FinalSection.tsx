"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  shape: "circle" | "rect" | "star";
}

interface Heart {
  id: number;
  x: number;
  delay: number;
  size: number;
}

interface FireworkBurst {
  id: number;
  x: number;
  y: number;
  color: string;
}

const colors = ["#f43f5e", "#ec4899", "#D4AF37", "#9333ea", "#a855f7", "#ffffff", "#fb7185"];

export default function FinalSection() {
  const [triggered, setTriggered] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [fireworks, setFireworks] = useState<FireworkBurst[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const trigger = () => {
    if (triggered) return;
    setTriggered(true);

    // Confetti
    const c: ConfettiPiece[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      rotation: Math.random() * 720,
      shape: (["circle", "rect", "star"] as const)[Math.floor(Math.random() * 3)],
    }));
    setConfetti(c);

    // Hearts
    const h: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 2,
      size: Math.random() * 24 + 16,
    }));
    setHearts(h);

    // Fireworks
    const fw: FireworkBurst[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 15 + (i * 15) % 70,
      y: 10 + Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setFireworks(fw);
  };

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(trigger, 500);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <section id="finale" ref={ref} className="relative min-h-[100dvh] flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
      {/* Background - fullscreen photo with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/salma-cafe.jpg"
          alt="Salma – Final Surprise"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080818]/85 via-[#080818]/70 to-[#080818]/90" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(147,51,234,0.2) 0%, transparent 70%)" }} />
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {triggered && confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute pointer-events-none z-20"
            style={{
              left: `${piece.x}%`,
              top: -20,
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: piece.shape === "circle" ? "50%" : piece.shape === "rect" ? "2px" : "0",
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ y: "110vh", opacity: [1, 1, 0], rotate: piece.rotation }}
            transition={{ duration: piece.duration, delay: piece.delay, ease: "easeIn" }}
          />
        ))}
      </AnimatePresence>

      {/* Floating Hearts */}
      <AnimatePresence>
        {triggered && hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none z-20 text-rose-400"
            style={{ left: `${heart.x}%`, bottom: "10%", fontSize: heart.size }}
            initial={{ y: 0, opacity: 0.9, scale: 1 }}
            animate={{ y: -500, opacity: 0, scale: 0.3 }}
            transition={{ duration: 3.5 + heart.delay, delay: heart.delay, ease: "easeOut" }}
          >
            ❤
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Fireworks */}
      <AnimatePresence>
        {triggered && fireworks.map((fw) => (
          <motion.div
            key={fw.id}
            className="absolute pointer-events-none z-20"
            style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: fw.color, left: "50%", top: "50%" }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((i / 8) * Math.PI * 2) * (60 + Math.random() * 40),
                  y: Math.sin((i / 8) * Math.PI * 2) * (60 + Math.random() * 40),
                  opacity: [1, 1, 0],
                  scale: [1, 0.5, 0],
                }}
                transition={{ duration: 1.5, delay: fw.id * 0.3, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-5xl mb-4 flex justify-center gap-3">
            {["✨", "🎂", "✨"].map((e, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -10, 0], rotate: [0, i === 1 ? 10 : -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {e}
              </motion.span>
            ))}
          </div>
          <span className="text-rose-400/70 tracking-[0.35em] uppercase text-xs">
            ✦ One Final Message ✦
          </span>
        </motion.div>

        {/* Main message */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="section-title text-white leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          No matter where life goes...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="gradient-text-gold text-2xl md:text-4xl font-bold mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          I hope this made you smile.
        </motion.p>

        {/* Photo frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1, duration: 0.8, type: "spring" }}
          className="relative mx-auto w-64 h-80 md:w-80 md:h-96 my-10"
        >
          {/* Glow rings */}
          <div className="absolute -inset-4 rounded-2xl opacity-40"
            style={{ background: "radial-gradient(circle, #f43f5e, transparent)", filter: "blur(30px)" }} />
          <div className="absolute -inset-2 rounded-2xl opacity-30"
            style={{ background: "radial-gradient(circle, #D4AF37, transparent)", filter: "blur(15px)" }} />

          {/* Photo */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gold/20"
            style={{ borderColor: "rgba(212,175,55,0.3)" }}>
            <Image
              src="/images/salma-cafe.jpg"
              alt="Salma"
              fill
              className="object-cover object-center"
              sizes="400px"
            />
            {/* Gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080818]/50 via-transparent to-transparent" />
          </div>

          {/* Name label */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass-rose rounded-full px-6 py-2 border"
            style={{ borderColor: "rgba(244,63,94,0.3)" }}>
            <span
              className="text-white text-sm tracking-widest"
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              Happy Birthday, Salma ❤️
            </span>
          </div>
        </motion.div>

        {/* Confetti trigger button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4 }}
          className="mt-12"
        >
          <motion.button
            onClick={() => {
              setTriggered(false);
              setTimeout(() => {
                setConfetti([]);
                setHearts([]);
                setFireworks([]);
                setTriggered(false);
              }, 100);
              setTimeout(trigger, 200);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-glow text-white text-sm font-medium tracking-widest uppercase"
            data-cursor-hover="true"
          >
            🎉 Celebrate Again! 🎉
          </motion.button>
        </motion.div>

        {/* Bottom signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-rose-500/40" />
            <motion.span
              className="text-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ❤️
            </motion.span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-rose-500/40" />
          </div>
          <p
            className="text-white/30 text-sm tracking-widest italic"
            style={{ fontFamily: "var(--font-handwriting)" }}
          >
            Made with love, just for you.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
