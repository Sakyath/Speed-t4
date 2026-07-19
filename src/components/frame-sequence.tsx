import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 100;
const framePath = (i: number) => `/bike/f${String(i * 3 + 1).padStart(3, "0")}.webp`;

/**
 * FrameSequence — scroll-scrubbed cinematic 360° of the bike.
 * The container is `heightVh` tall; the bike stays pinned inside a sticky wrapper.
 * Frame index maps to scroll progress across the section.
 */
export function FrameSequence({
  heightVh = 500,
  children,
  reverse = false,
}: {
  heightVh?: number;
  children?: React.ReactNode;
  reverse?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  // Preload frames progressively.
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.decoding = "async";
      img.onload = () => {
        loaded += 1;
        if (loaded >= 8 && !cancelled) setReady(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
  }, []);

  // rAF-scheduled scroll → frame swap.
  useEffect(() => {
    const section = sectionRef.current;
    const target = imgRef.current;
    if (!section || !target) return;
    let raf = 0;
    let last = -1;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      const idx = Math.min(
        FRAME_COUNT - 1,
        Math.floor((reverse ? 1 - p : p) * (FRAME_COUNT - 1)),
      );
      if (idx !== last) {
        const img = imagesRef.current[idx];
        if (img && img.complete && img.src) {
          target.src = img.src;
        }
        last = idx;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reverse]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${heightVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient hero background */}
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="absolute inset-0 grid-lines opacity-30" aria-hidden />
        {/* Ember glow */}
        <div
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.19 45 / 0.28), transparent 60%)" }}
          aria-hidden
        />
        {/* Particles */}
        <Particles />
        {/* Bike */}
        <div className="absolute left-1/2 top-1/2 aspect-[16/9] w-[130vw] max-w-[1900px] -translate-x-1/2 -translate-y-1/2">
          <img
            ref={imgRef}
            src={framePath(0)}
            alt="Triumph Speed T4 rotating in a cinematic studio"
            className="h-full w-full select-none object-cover"
            style={{
              filter: "brightness(1.02) contrast(1.06) drop-shadow(0 40px 60px oklch(0 0 0 / 0.55))",
              opacity: ready ? 1 : 0,
              transition: "opacity 500ms ease",
              willChange: "contents",
            }}
            draggable={false}
            fetchPriority="high"
          />
          {/* Dark vignette blends the studio backdrop into the dark theme */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 55% 60% at 50% 55%, transparent 0%, transparent 42%, oklch(0.10 0.008 40 / 0.55) 62%, oklch(0.10 0.008 40) 82%)",
            }}
          />
        </div>
        {/* Floor reflection */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: "linear-gradient(180deg, transparent, oklch(0.05 0.008 40) 90%)",
          }}
          aria-hidden
        />
        {children}
      </div>
    </section>
  );
}

function Particles() {
  const dots = Array.from({ length: 26 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {dots.map((i) => {
        const size = 1 + ((i * 7) % 4);
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 8) * 0.4;
        const dur = 8 + ((i * 3) % 10);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              animation: `float-slow ${dur}s ease-in-out ${delay}s infinite`,
              opacity: 0.35 + ((i % 5) * 0.1),
              boxShadow: "0 0 8px oklch(0.72 0.19 45 / 0.4)",
            }}
          />
        );
      })}
    </div>
  );
}
