"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only run mouse tracking on devices that support hover (desktop)
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSurprise = () => {
    // Dispatch an event to initialize global audio if needed
    window.dispatchEvent(new CustomEvent("initAudio"));
    
    const el = document.getElementById("timeline");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/salma-dubai.jpg"
            alt="Salma in Dubai"
            fill
            priority
            quality={100}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Deep cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080818]/70 via-[#080818]/30 to-[#080818]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080818]/60 via-transparent to-[#080818]/60" />
          {/* Vignette */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(8,8,24,0.8) 100%)"
          }} />
        </div>
      </motion.div>

      {/* Parallax mouse effect layer */}
      <motion.div
        className="absolute inset-0 z-1 pointer-events-none"
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #9333ea, transparent)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #f43f5e, transparent)", filter: "blur(60px)" }} />
      </motion.div>

      {/* Floating sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300 pointer-events-none select-none z-10"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`,
            fontSize: `${10 + (i % 3) * 8}px`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* Main hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-3 text-rose-400/80 tracking-[0.35em] uppercase text-xs md:text-sm font-medium">
            <span className="w-8 h-[1px] bg-rose-400/50" />
            A Celebration of You
            <span className="w-8 h-[1px] bg-rose-400/50" />
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1
            className="section-title text-white leading-none mb-2"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 7vw, 5.5rem)" }}
          >
            Happy Birthday
          </h1>
          <div
            className="gradient-text-gold leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 14vw, 10rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Salma
          </div>
          <motion.span
            className="text-4xl md:text-5xl block mt-2"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          A little corner on the internet{" "}
          <span className="text-rose-300">made specially for you.</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12"
        >
          <button
            onClick={scrollToSurprise}
            className="btn-glow text-white font-medium text-sm md:text-base tracking-widest uppercase"
            data-cursor-hover="true"
          >
            <span className="flex items-center gap-3">
              ✨ Open Your Surprise ✨
            </span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-rose-500/80 to-transparent"
          />
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        </motion.div>
      </motion.div>

      {/* Location badge - elegant touch */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 right-8 z-10 glass rounded-full px-4 py-2 flex items-center gap-2"
      >
        <span className="text-yellow-400 text-sm">★</span>
        <span className="text-white/50 text-xs tracking-widest uppercase">Dubai, UAE</span>
      </motion.div>
    </section>
  );
}
