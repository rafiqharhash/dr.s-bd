"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

const photos = [
  {
    src: "/images/WhatsApp Image 2026-05-11 at 3.38.15 AM.jpeg",
    alt: "Salma – Beautiful Soul",
    caption: "Beautiful Soul 🌸",
    rotation: -3,
    color: "#D4AF37",
  },
  {
    src: "/images/WhatsApp Image 2026-05-11 at 3.38.15 AM (1).jpeg",
    alt: "Salma – Unforgettable Smiles",
    caption: "Unforgettable ✨",
    rotation: 2,
    color: "#ec4899",
  },
  {
    src: "/images/WhatsApp Image 2026-05-11 at 3.38.15 AM (2).jpeg",
    alt: "Salma – Pure Elegance",
    caption: "Pure Elegance 🤍",
    rotation: -1.5,
    color: "#9333ea",
  },
  {
    src: "/images/WhatsApp Image 2026-05-11 at 3.38.15 AM (3).jpeg",
    alt: "Salma – Always Glowing",
    caption: "Always Glowing 🌟",
    rotation: 3,
    color: "#f43f5e",
  },
  {
    src: "/images/WhatsApp Image 2026-05-11 at 3.38.15 AM (4).jpeg",
    alt: "Salma – Effortlessly You",
    caption: "Effortlessly You 💫",
    rotation: -2,
    color: "#D4AF37",
  },
  {
    src: "/images/WhatsApp Image 2026-05-11 at 3.38.15 AM (5).jpeg",
    alt: "Salma – Quiet Confidence",
    caption: "Quiet Confidence 🌙",
    rotation: 1.5,
    color: "#9333ea",
  },
  {
    src: "/images/WhatsApp Image 2026-05-11 at 3.38.16 AM.jpeg",
    alt: "Salma – Those Eyes",
    caption: "Those Eyes ❤️",
    rotation: -3,
    color: "#f43f5e",
  },
  {
    src: "/images/salma-dubai.jpg",
    alt: "Salma in Dubai",
    caption: "City Lights 🌃",
    rotation: 2,
    color: "#ec4899",
  },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<(typeof photos)[0] | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <section id="gallery" className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : {}}
            className="text-gold/70 tracking-[0.35em] uppercase text-xs block mb-4"
            style={{ color: "#D4AF37" }}
          >
            ✦ Captured Moments ✦
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-title"
          >
            <span className="gradient-text-gold">The Gallery</span>
          </motion.h2>
        </div>

        {/* Polaroid grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, rotate: photo.rotation * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: photo.rotation }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              onClick={() => setLightbox(photo)}
              className="polaroid cursor-pointer group"
              data-cursor-hover="true"
              style={{
                transformOrigin: "center bottom",
                "--glow-color": photo.color,
              } as React.CSSProperties}
            >
              {/* Photo */}
              <div className="relative overflow-hidden bg-black/20" style={{ paddingBottom: "125%" }}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Color overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: photo.color }}
                />
                {/* Glowing border overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 20px ${photo.color}40` }}
                />
              </div>

              {/* Caption */}
              <div className="pt-3 pb-1 text-center">
                <p
                  className="text-white/70 text-sm font-medium tracking-wide"
                  style={{ fontFamily: "var(--font-handwriting)", fontSize: "1rem" }}
                >
                  {photo.caption}
                </p>
              </div>

              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 30px ${photo.color}40` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-white/30 text-xs tracking-widest uppercase mt-12"
        >
          Click any photo to view full-size
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lightbox-overlay"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              className="relative max-w-lg w-full mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow frame */}
              <div
                className="absolute -inset-2 rounded-2xl opacity-50 blur-xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${lightbox.color}, transparent)` }}
              />

              <div className="relative rounded-xl overflow-hidden" style={{ paddingBottom: "120%" }}>
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  quality={100}
                />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 50px ${lightbox.color}20` }} />
              </div>

              <div className="text-center mt-4">
                <p
                  className="text-white/80 text-xl"
                  style={{ fontFamily: "var(--font-handwriting)" }}
                >
                  {lightbox.caption}
                </p>
                <button
                  onClick={() => setLightbox(null)}
                  className="mt-4 text-white/40 hover:text-white/80 transition-colors text-sm tracking-widest uppercase"
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
