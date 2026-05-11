"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const playlist = [
  { id: 1, title: "E'id El'Oshaq", artist: "Kadim Al Sahir", duration: "--:--", emoji: "🎵", src: "/audio/E'id El'Oshaq.m4a" },
  { id: 2, title: "Isma'ini BiKilmat", artist: "Kadim Al Sahir", duration: "--:--", emoji: "🎶", src: "/audio/Isma'ini BiKilmat.m4a" },
  { id: 3, title: "Love Condition", artist: "Special Selection", duration: "--:--", emoji: "🎵", src: "/audio/Love Condition.m4a" },
  { id: 4, title: "Men Zaman", artist: "Classic Melody", duration: "--:--", emoji: "🎶", src: "/audio/Men Zaman.m4a" },
  { id: 5, title: "Morafref Eldlal", artist: "Special Selection", duration: "--:--", emoji: "🎵", src: "/audio/Morafref Eldlal.m4a" },
  { id: 6, title: "Youmyat Ragol Mahzoom", artist: "Kadim Al Sahir", duration: "--:--", emoji: "🎶", src: "/audio/Youmyat Ragol Mahzoom.m4a" },
];

const WaveBar = ({ delay, isPlaying }: { delay: number, isPlaying: boolean }) => (
  <div
    className={`wave-bar ${!isPlaying ? 'opacity-30' : ''}`}
    style={{
      height: `${Math.random() * 20 + 8}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${Math.random() * 0.5 + 0.6}s`,
      animationPlayState: isPlaying ? 'running' : 'paused'
    }}
  />
);

export default function MusicSection() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  // Initialize audio context to bypass autoplay restrictions on mobile Safari
  useEffect(() => {
    const handleInitAudio = () => {
      if (audioRef.current) {
        // Play and immediately pause to unlock audio context
        audioRef.current.play().then(() => {
          audioRef.current?.pause();
        }).catch(err => console.log("Audio unlock interaction needed", err));
      }
    };
    window.addEventListener("initAudio", handleInitAudio);
    return () => window.removeEventListener("initAudio", handleInitAudio);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
          setHasError(true);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 0;
      setCurrentTime(current);
      setDuration(total);
      setProgress(total > 0 ? (current / total) * 100 : 0);
    }
  };

  const handleEnded = () => {
    setCurrentTrack(prev => (prev + 1) % playlist.length);
  };

  const handleError = () => {
    console.error("Audio file not found or failed to load.");
    setHasError(true);
    setIsPlaying(false);
  };

  const handleLoadedData = () => {
    setHasError(false);
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrack(prev => (prev + 1) % playlist.length);
    setProgress(0);
    if (!isPlaying) setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrack(prev => (prev - 1 + playlist.length) % playlist.length);
    setProgress(0);
    if (!isPlaying) setIsPlaying(true);
  };

  const handleTrackSelect = (index: number) => {
    if (currentTrack === index) {
      togglePlay();
    } else {
      setCurrentTrack(index);
      setProgress(0);
      setIsPlaying(true);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const m = Math.floor(timeInSeconds / 60);
    const s = Math.floor(timeInSeconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const track = playlist[currentTrack];

  return (
    <section id="music" className="relative py-24 md:py-32 px-6 min-h-[100dvh] flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl opacity-10 rounded-full"
          style={{ background: "radial-gradient(circle, #9333ea, transparent)", filter: "blur(80px)" }} />
      </div>

      <div className="max-w-3xl w-full mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : {}}
            className="text-purple-400/70 tracking-[0.35em] uppercase text-xs block mb-4"
          >
            ✦ Your Soundtrack ✦
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-title text-white"
          >
            Songs for{" "}
            <span className="gradient-text">You</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden"
          style={{ borderColor: "rgba(147, 51, 234, 0.2)" }}
        >
          {hasError && (
            <div className="absolute top-0 left-0 right-0 bg-rose-500/20 text-rose-300 text-xs text-center py-2 z-10 backdrop-blur-md">
              Waiting for audio file ({track.src})
            </div>
          )}

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={track.src}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onError={handleError}
            onLoadedData={handleLoadedData}
            preload="metadata"
          />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-8 mt-4">
            <div className="relative w-32 h-32 md:w-24 md:h-24 flex-shrink-0">
              <div
                className={`w-full h-full rounded-full ${isPlaying ? "vinyl" : "vinyl vinyl-paused"}`}
                style={{ animationDuration: "3s" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#080818] border-2 border-purple-500/30 flex items-center justify-center text-sm md:text-base">
                    🎵
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: isPlaying ? "0 0 30px rgba(147,51,234,0.5)" : "none",
                  transition: "box-shadow 0.5s ease",
                }}
              />
            </div>

            <div className="flex-1 min-w-0 text-center md:text-left">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-1">Now Playing</p>
              <h3
                className="text-white text-2xl md:text-2xl font-semibold truncate"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {track.title}
              </h3>
              <p className="text-white/50 text-sm">{track.artist}</p>

              <div className="flex items-end justify-center md:justify-start gap-[3px] mt-4 h-6">
                {Array.from({ length: 18 }).map((_, i) => (
                  <WaveBar key={i} delay={i * 0.05} isPlaying={isPlaying} />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 px-2 md:px-0">
            <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden mb-2 cursor-pointer" onClick={(e) => {
              if (audioRef.current && duration) {
                const bounds = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - bounds.left;
                const newProgress = x / bounds.width;
                audioRef.current.currentTime = newProgress * duration;
              }
            }}>
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #9333ea, #f43f5e)",
                  boxShadow: "0 0 8px rgba(147,51,234,0.6)",
                }}
              />
            </div>
            <div className="flex justify-between text-white/40 text-xs font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{duration ? formatTime(duration) : track.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mb-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="text-white/40 hover:text-white transition-colors text-2xl"
              data-cursor-hover="true"
            >
              ⏮
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl shadow-lg"
              style={{
                background: "linear-gradient(135deg, #9333ea, #f43f5e)",
                boxShadow: "0 0 20px rgba(147,51,234,0.4)",
              }}
              data-cursor-hover="true"
            >
              {isPlaying ? "⏸" : "▶"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="text-white/40 hover:text-white transition-colors text-2xl"
              data-cursor-hover="true"
            >
              ⏭
            </motion.button>
          </div>

          <div className="space-y-2">
            {playlist.map((item, index) => (
              <motion.div
                key={item.id}
                onClick={() => handleTrackSelect(index)}
                whileHover={{ x: 4 }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
                  currentTrack === index
                    ? "bg-purple-500/20 border border-purple-500/30"
                    : "hover:bg-white/5 border border-transparent"
                }`}
                data-cursor-hover="true"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm opacity-50 w-4 text-center">{index + 1}</span>
                  <div>
                    <p className={`text-sm font-medium ${currentTrack === index ? "text-white" : "text-white/70"}`}>
                      {item.title}
                    </p>
                    <p className="text-white/30 text-xs">{item.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {currentTrack === index && isPlaying && (
                    <div className="flex items-end gap-[2px] h-4">
                      {[0, 0.1, 0.2].map((d, i) => (
                        <div key={i} className="wave-bar" style={{ width: "2px", height: "100%", animationDelay: `${d}s` }} />
                      ))}
                    </div>
                  )}
                  <span className="text-white/40 text-xs font-mono">{item.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-white/20 text-xs mt-6 tracking-widest uppercase">
            🎵 These songs were handpicked for you
          </p>
        </motion.div>
      </div>
    </section>
  );
}
