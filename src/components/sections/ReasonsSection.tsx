"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const reasons = [
  { icon: "✨", title: "Your Light", text: "You have this rare ability to light up any room you enter — without even trying. People gravitate toward you.", color: "#D4AF37" },
  { icon: "🌹", title: "Your Strength", text: "You've faced challenges with quiet grace and unbreakable spirit. That kind of inner strength is truly beautiful.", color: "#f43f5e" },
  { icon: "🌙", title: "Your Depth", text: "There's so much more to you than meets the eye. Every conversation reveals new layers worth discovering.", color: "#9333ea" },
  { icon: "💫", title: "Your Style", text: "Whether it's Dubai nights or café mornings, you have an effortless elegance that's completely, uniquely yours.", color: "#ec4899" },
  { icon: "🌸", title: "Your Kindness", text: "The way you treat people — with such warmth and genuine care — says everything about who you are inside.", color: "#f43f5e" },
  { icon: "🎯", title: "Your Ambition", text: "You know what you want from life, and you go after it. That clarity and drive is something rare to find.", color: "#D4AF37" },
  { icon: "🦋", title: "Your Growth", text: "Watching you evolve, bloom, and step into yourself has been the most beautiful thing to witness.", color: "#9333ea" },
  { icon: "❤️", title: "Simply You", text: "There is no one quite like you in this world. And the world is genuinely better because you're in it.", color: "#ec4899" },
];

export default function ReasonsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-50px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="reasons" className="relative py-24 md:py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(147,51,234,0.15) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(244,63,94,0.15) 0%, transparent 60%)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : {}}
            className="text-rose-400/70 tracking-[0.35em] uppercase text-xs block mb-4"
          >
            ✦ Just Some Reasons ✦
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-title text-white"
          >
            Why You&apos;re{" "}
            <span className="gradient-text">Extraordinary</span>
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group glass rounded-2xl p-6 cursor-default overflow-hidden"
              style={{
                borderColor: hoveredIndex === index ? `${reason.color}50` : "rgba(255,255,255,0.08)",
                transition: "border-color 0.3s ease",
              }}
            >
              {/* Glow on hover */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${reason.color}20, transparent 70%)` }}
                  />
                )}
              </AnimatePresence>

              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: `linear-gradient(90deg, transparent, ${reason.color}, transparent)` }}
              />

              {/* Icon */}
              <motion.div
                className="text-4xl mb-4"
                animate={hoveredIndex === index ? { scale: 1.2, y: -3 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                {reason.icon}
              </motion.div>

              {/* Content */}
              <h3
                className="text-lg font-semibold mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: hoveredIndex === index ? reason.color : "white",
                  transition: "color 0.3s ease",
                }}
              >
                {reason.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{reason.text}</p>

              {/* Number */}
              <div
                className="absolute top-4 right-4 text-4xl font-bold opacity-5"
                style={{ fontFamily: "var(--font-display)", color: reason.color }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <blockquote
            className="text-xl md:text-2xl text-white/50 italic max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-handwriting)", fontSize: "clamp(1.2rem, 3vw, 1.8rem)" }}
          >
            &quot;You are not just beautiful — you are magic.&quot;
          </blockquote>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-rose-500/30" />
            <span className="text-rose-400/50 text-xs tracking-widest">with love</span>
            <div className="w-8 h-[1px] bg-rose-500/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
