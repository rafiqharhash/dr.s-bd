"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const memories = [
  {
    date: "That One Day",
    emoji: "☀️",
    title: "The Way You Smile",
    description: "There's something about your smile that makes everything around you brighter. It's impossible not to smile back.",
    color: "#f43f5e",
  },
  {
    date: "Every Time",
    emoji: "✨",
    title: "Your Effortless Elegance",
    description: "You carry yourself with such grace — whether in a crowded room or a quiet café, you always stand out.",
    color: "#D4AF37",
  },
  {
    date: "Always",
    emoji: "🌙",
    title: "Dubai Nights",
    description: "Some moments feel like they're from a movie. Standing in front of those lights, looking like you owned the city.",
    color: "#9333ea",
  },
  {
    date: "A Quiet Morning",
    emoji: "☕",
    title: "The Café Girl",
    description: "Glasses on, mind somewhere else entirely. Thinking deeply, living fully. That's so you.",
    color: "#ec4899",
  },
  {
    date: "Every Chapter",
    emoji: "📖",
    title: "Your Beautiful Journey",
    description: "Life has taken you to beautiful places, and there are so many more adventures waiting for you.",
    color: "#f43f5e",
  },
  {
    date: "Right Now",
    emoji: "🎂",
    title: "Your Birthday!",
    description: "Today is about you. Every single wonderful, unique, irreplaceable thing that makes you, YOU.",
    color: "#D4AF37",
  },
];

function TimelineCard({ memory, index }: { memory: typeof memories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`flex items-center gap-4 md:gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"} mb-12 md:mb-16`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="flex-1 glass rounded-2xl p-6 md:p-8 group hover:scale-[1.02] transition-all duration-500"
        style={{
          borderColor: `${memory.color}30`,
          boxShadow: `0 0 0 1px ${memory.color}20`,
        }}
      >
        <div className="flex items-start gap-4">
          <motion.span
            className="text-3xl md:text-4xl flex-shrink-0"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
          >
            {memory.emoji}
          </motion.span>
          <div>
            <span className="text-white/30 text-xs tracking-[0.25em] uppercase">{memory.date}</span>
            <h3
              className="text-white text-xl md:text-2xl font-semibold mt-1 mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {memory.title}
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">{memory.description}</p>
          </div>
        </div>

        {/* Glow line at bottom */}
        <motion.div
          className="mt-4 h-[1px] w-0 group-hover:w-full transition-all duration-700 rounded-full"
          style={{ background: `linear-gradient(90deg, ${memory.color}, transparent)` }}
        />
      </motion.div>

      {/* Center dot */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          className="w-4 h-4 rounded-full border-2 relative z-10"
          style={{
            borderColor: memory.color,
            backgroundColor: `${memory.color}30`,
            boxShadow: `0 0 15px ${memory.color}60`,
          }}
        />
      </div>

      {/* Empty space for opposite side */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export default function TimelineSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section id="timeline" className="relative py-24 md:py-32 px-6">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full timeline-line opacity-20" />
        <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f43f5e, transparent)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #9333ea, transparent)", filter: "blur(40px)" }} />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-rose-400/70 tracking-[0.35em] uppercase text-xs mb-4"
          >
            ✦ Memories & Moments ✦
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-title gradient-text"
          >
            Our Timeline
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isTitleInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 mx-auto w-24 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, #f43f5e, transparent)" }}
          />
        </div>

        {/* Timeline items */}
        {memories.map((memory, index) => (
          <TimelineCard key={index} memory={memory} index={index} />
        ))}
      </div>
    </section>
  );
}
