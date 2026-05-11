"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function PoetrySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const verses = [
    "ياطيبَ لَيلَةِ ميلادٍ لَهَوتُ بِها",
    "بِأَحوَرٍ ساحِرِ العَينَينِ مَكمورِ",
    "وَالجَوُّ يَنثُرُ دُرّاً غَيرِ مُنتَظِمٍ",
    "وَالأَرضُ بارِزَةٌ في ثَوبِ كافورِ",
    "وَالنَرجِسُ الغَضُّ يَحكي حُسنُ مَنظَرِهِ",
    "صَفراءَ صافِيَةٍ في كَأسِ بَلَّورِ",
  ];

  return (
    <section id="poetry" className="relative py-24 md:py-32 px-6 flex items-center justify-center overflow-hidden min-h-[70dvh]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] max-w-4xl opacity-[0.15]"
          style={{ background: "radial-gradient(ellipse, #D4AF37, transparent 60%)", filter: "blur(60px)" }} />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center relative z-10 glass rounded-3xl p-8 md:p-16"
        dir="rtl"
        style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}
      >
        <div className="mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-gold/60 tracking-[0.3em] uppercase text-sm font-semibold"
            style={{ color: "#D4AF37", fontFamily: "var(--font-arabic)" }}
          >
            ✦ ليلة الميلاد ✦
          </motion.span>
        </div>

        <div 
          className="space-y-6 md:space-y-8 text-2xl md:text-4xl lg:text-[2.5rem] leading-[2] md:leading-[2] text-white/90"
          style={{ fontFamily: "var(--font-arabic)", fontWeight: 400 }}
        >
          {verses.map((verse, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
              className={i % 2 !== 0 ? "text-rose-300" : "text-[#D4AF37]"}
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              {verse}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
