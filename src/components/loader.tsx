import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FIRST = "/bike/f001.webp";
// Preload a scattered set so the first scroll is instant.
const PRELOAD = [1, 15, 30, 45, 60, 75, 90].map(
  (i) => `/bike/f${String(i).padStart(3, "0")}.webp`,
);

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const total = PRELOAD.length;
    const started = performance.now();
    PRELOAD.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded += 1;
        setProgress(Math.round((loaded / total) * 100));
      };
      img.src = src;
    });
    // Ensure minimum reveal time for cinematic feel.
    const int = setInterval(() => {
      setProgress((p) => (p < 98 ? p + 1 : p));
    }, 24);
    const finish = () => {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, 1400 - elapsed);
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => setDone(true), 420);
      }, wait);
    };
    const img = new Image();
    img.onload = finish;
    img.onerror = finish;
    img.src = FIRST;
    return () => clearInterval(int);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.6, 0.05, 0.15, 1] } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <div className="absolute inset-0 grid-lines opacity-40" />
          <div
            className="absolute inset-0 opacity-70"
            style={{ background: "radial-gradient(ellipse at 50% 50%, oklch(0.72 0.19 45 / 0.15), transparent 60%)" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative flex flex-col items-center"
          >
            <TriumphMark className="h-10 w-auto text-foreground" />
            <div className="mt-8 h-px w-[220px] overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-ember"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>
            <div className="mt-3 flex w-[220px] items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>Speed T4</span>
              <span className="tabular-nums text-foreground/70">{progress.toString().padStart(3, "0")}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function TriumphMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 40" className={className} aria-label="Triumph" role="img">
      <defs>
        <linearGradient id="tri-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <g fill="url(#tri-g)">
        <path d="M20 4 L36 32 L20 24 L4 32 Z" opacity="0.9" />
      </g>
      <text
        x="50"
        y="27"
        fontFamily="Inter, sans-serif"
        fontSize="20"
        fontWeight="800"
        letterSpacing="6"
        fill="currentColor"
      >
        TRIUMPH
      </text>
    </svg>
  );
}
