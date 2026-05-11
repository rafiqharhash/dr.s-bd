"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "timeline", label: "Timeline" },
  { id: "reasons", label: "Love" },
  { id: "gallery", label: "Gallery" },
  { id: "letter", label: "Letter" },
  { id: "music", label: "Music" },
  { id: "finale", label: "Surprise" },
];

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Active section detection
      const sections = navItems.map(({ id }) => document.getElementById(id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Desktop nav */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-500 ${
          scrolled ? "glass shadow-2xl" : "bg-transparent"
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
              activeSection === item.id
                ? "text-white bg-rose-500/20 border border-rose-500/30"
                : "text-white/40 hover:text-white/80"
            }`}
            data-cursor-hover="true"
          >
            {item.label}
          </button>
        ))}
      </motion.nav>

      {/* Mobile hamburger */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setMenuOpen(p => !p)}
        className="fixed top-6 right-6 z-50 md:hidden glass w-10 h-10 rounded-full flex items-center justify-center"
        data-cursor-hover="true"
      >
        <div className="flex flex-col gap-1">
          <span className={`w-5 h-[1.5px] bg-white transition-all ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`w-5 h-[1.5px] bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-[1.5px] bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </div>
      </motion.button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-56 z-40 glass-dark flex flex-col items-start justify-center gap-4 px-8 md:hidden border-l border-white/10"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => scrollTo(item.id)}
                className={`text-sm tracking-widest uppercase transition-colors ${
                  activeSection === item.id ? "text-rose-400" : "text-white/50 hover:text-white"
                }`}
                data-cursor-hover="true"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo / name top left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="fixed top-6 left-6 z-50"
      >
        <button
          onClick={() => scrollTo("hero")}
          className="text-white/40 hover:text-white transition-colors text-xs tracking-[0.3em] uppercase"
          data-cursor-hover="true"
        >
          ❤️ Salma
        </button>
      </motion.div>
    </>
  );
}
