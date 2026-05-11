"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const letterLines = [
  "My dearest Dr. S,",
  "",
  "I've been trying to find the perfect way to express everything I want to say,",
  "but how do you capture a soul as vibrant as yours in just a few lines?",
  "",
  "You carry a light that changes the energy of every room you walk into.",
  "Your kindness, your effortless elegance, and that beautiful smile of yours...",
  "They make the world around you so much brighter, and so much warmer.",
  "",
  "Today is all about celebrating you.",
  "Not just for the stunning person you are on the outside,",
  "but for the incredible depth, strength, and grace you hold within.",
  "",
  "I hope this year brings you everything your heart has quietly been hoping for.",
  "May it be filled with laughter that echoes, moments that take your breath away,",
  "and love that reminds you just how deeply cherished you are.",
  "",
  "Never forget how extraordinary you are, Salma.",
  "You deserve all the happiness in the world, today and always.",
  "",
  "Happy Birthday.",
  "",
  "With all my heart,",
  "Someone who admires you endlessly 🌙",
];

export default function LetterSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });
  const isLetterInView = useInView(letterRef, { once: true, margin: "0px" });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isLetterInView) return;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= letterLines.length) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isLetterInView]);

  return (
    <section id="letter" className="relative py-24 md:py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl opacity-5"
          style={{
            background: "repeating-linear-gradient(0deg, #ffffff11 0px, #ffffff11 1px, transparent 1px, transparent 40px)"
          }}
        />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #D4AF37, transparent)", filter: "blur(50px)" }} />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f43f5e, transparent)", filter: "blur(50px)" }} />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : {}}
            className="text-rose-400/70 tracking-[0.35em] uppercase text-xs block mb-4"
          >
            ✦ From the Heart ✦
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-title gradient-text"
          >
            A Letter For You
          </motion.h2>
        </div>

        {/* Letter card */}
        <motion.div
          ref={letterRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12 relative"
          style={{ borderColor: "rgba(212, 175, 55, 0.2)" }}
        >
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/40 rounded-tl-sm"
            style={{ borderColor: "#D4AF37" }} />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/40 rounded-tr-sm"
            style={{ borderColor: "#D4AF37" }} />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/40 rounded-bl-sm"
            style={{ borderColor: "#D4AF37" }} />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/40 rounded-br-sm"
            style={{ borderColor: "#D4AF37" }} />

          {/* Wax seal decoration */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ background: "linear-gradient(135deg, #f43f5e, #9333ea)", boxShadow: "0 0 20px rgba(244,63,94,0.4)" }}>
            💌
          </div>

          {/* Letter content */}
          <div className="mt-4 space-y-0">
            {letterLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={i < visibleLines ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`leading-relaxed ${line === "" ? "h-4" : ""
                  } ${line.startsWith("My") || line.startsWith("With") || line.startsWith("Someone") || line.startsWith("Happy")
                    ? "text-rose-300 font-semibold"
                    : "text-white/70"
                  }`}
                style={{
                  fontFamily: "var(--font-handwriting)",
                  fontSize: line.startsWith("My") ? "1.6rem" : "1.2rem",
                  lineHeight: "1.9",
                }}
              >
                {line}
                {/* Typing cursor on last visible line */}
                {i === Math.min(visibleLines - 1, letterLines.length - 1) && visibleLines < letterLines.length && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    className="inline-block w-[2px] h-5 bg-rose-400 ml-1 align-middle"
                  />
                )}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
