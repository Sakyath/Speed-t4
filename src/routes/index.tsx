import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Gauge, Zap, Cog, Fuel, Weight, Droplet, Wind, Thermometer,
  ShieldCheck, Lightbulb, Usb, MonitorSmartphone, Armchair, Wrench,
  Mountain, Route as RouteIcon, Rocket, ChevronRight, ArrowUpRight, Menu,
  Phone, Mail, MapPin, Instagram, Facebook, Youtube,
} from "lucide-react";
import { FrameSequence } from "@/components/frame-sequence";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Loader, TriumphMark } from "@/components/loader";
import { MagneticButton } from "@/components/magnetic-button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Triumph Speed T4 — Pure Roadster. Built For Everyday Thrills." },
      { name: "description", content: "Meet the Triumph Speed T4. A 398cc pure roadster with 31 PS, liquid cooling and a 6-speed gearbox. Explore, configure and book your test ride." },
    ],
  }),
  component: Index,
});

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Loader />
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Performance />
        <Features />
        <ColorShowcase />
        <ParallaxStory />
        <Specifications />
        <Gallery />
        <BookTestRide />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Overview", "hero"],
    ["Performance", "performance"],
    ["Features", "features"],
    ["Colors", "colors"],
    ["Specs", "specs"],
    ["Gallery", "gallery"],
  ] as const;
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3" aria-label="Triumph home">
          <TriumphMark className="h-5 w-auto text-foreground" />
        </button>
        <nav className="hidden items-center gap-8 rounded-full glass px-6 py-2 md:flex" aria-label="Primary">
          {links.map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="hidden md:block">
          <MagneticButton onClick={() => scrollTo("book")} className="!px-5 !py-2 text-xs">
            Book Test Ride <ChevronRight className="h-3.5 w-3.5" />
          </MagneticButton>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-white/15 bg-white/5 p-2 backdrop-blur md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
      {open && (
        <div className="mx-6 mb-4 rounded-2xl glass p-4 md:hidden">
          {links.map(([label, id]) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setOpen(false); }}
              className="block w-full py-2 text-left text-sm uppercase tracking-[0.2em] text-muted-foreground"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { scrollTo("book"); setOpen(false); }}
            className="mt-3 w-full rounded-full bg-ember px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Book Test Ride
          </button>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.45, 0.7], [1, 1, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div id="hero" ref={wrapRef} className="relative">
      <FrameSequence heightVh={520}>
        {/* Overlay content */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center">
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="mt-[16vh] px-6 text-center"
          >
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-ember animate-ember-pulse" />
              New 2026 · Pure Roadster
            </div>
            <h1 className="mt-6 text-balance font-display text-[15vw] font-black leading-[0.86] tracking-[-0.04em] sm:text-[13vw] md:text-[12vw] lg:text-[9.5rem]">
              <span className="block bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
                SPEED
              </span>
              <span className="-mt-2 block bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent">
                T4
              </span>
            </h1>
          </motion.div>

          <motion.div
            style={{ y: subY }}
            className="pointer-events-auto absolute inset-x-0 bottom-16 flex flex-col items-center gap-6 px-6"
          >
            <p className="max-w-md text-center text-sm text-muted-foreground md:text-base">
              Pure Roadster. Built for everyday thrills.
              <br />
              <span className="text-foreground/70">398cc · 31 PS · 6-Speed</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <MagneticButton onClick={() => scrollTo("performance")}>
                Explore <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton variant="ghost" onClick={() => scrollTo("specs")}>
                Specifications
              </MagneticButton>
              <MagneticButton variant="ghost" onClick={() => scrollTo("book")}>
                Book Test Ride
              </MagneticButton>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              <span className="inline-block h-px w-6 bg-white/30" />
              Scroll to orbit
            </div>
          </motion.div>
        </div>
      </FrameSequence>
    </div>
  );
}

/* ---------------- PERFORMANCE ---------------- */
const stats = [
  { icon: Cog, label: "Engine", value: "398", unit: "cc" },
  { icon: Zap, label: "Power", value: "31", unit: "PS" },
  { icon: Gauge, label: "Torque", value: "36", unit: "Nm" },
  { icon: Wrench, label: "Gearbox", value: "6", unit: "Speed" },
  { icon: Thermometer, label: "Cooling", value: "Liquid", unit: "Cooled" },
  { icon: Fuel, label: "Fuel Tank", value: "13", unit: "L" },
  { icon: Weight, label: "Kerb Weight", value: "~180", unit: "kg" },
  { icon: Droplet, label: "Mileage", value: "~30", unit: "km/l" },
];

function Performance() {
  return (
    <section id="performance" className="relative overflow-hidden py-32 md:py-40">
      <SectionAura />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Performance"
          title={<>Refined force.<br />Everyday composure.</>}
          copy="A 398cc liquid-cooled single, tuned for tractable urban pace and effortless highway cruising."
        />
        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
              className="group relative overflow-hidden rounded-3xl glass p-6 md:p-8"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-ember opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60" />
              <s.icon className="h-5 w-5 text-ember" />
              <div className="mt-8 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-bold tracking-tight md:text-5xl">{s.value}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.unit}</span>
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURES ---------------- */
const features = [
  { icon: ShieldCheck, title: "Dual-Channel ABS", copy: "Confident stops in every condition." },
  { icon: Lightbulb, title: "Full LED Lighting", copy: "Signature Triumph twin-pod illumination." },
  { icon: Usb, title: "USB Charging", copy: "Keep your devices topped up on the go." },
  { icon: MonitorSmartphone, title: "Digital Console", copy: "Analog-digital cluster with trip data." },
  { icon: Armchair, title: "Comfortable Ergonomics", copy: "Neutral triangle for all-day riding." },
  { icon: Wrench, title: "Wide Handlebar", copy: "Effortless leverage, urban-friendly." },
  { icon: Mountain, title: "Strong Chassis", copy: "Tubular steel frame, planted feel." },
  { icon: RouteIcon, title: "Premium Suspension", copy: "41mm forks and pre-load rear monoshock." },
  { icon: Wind, title: "City Ready", copy: "Slim tank, low seat, easy filtering." },
  { icon: Rocket, title: "Highway Stability", copy: "Composed at the limit, mile after mile." },
];

function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Features"
          title={<>Engineered<br />with intent.</>}
          copy="Every detail on the Speed T4 is designed to disappear — until you need it."
        />
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/10">
                  <f.icon className="h-5 w-5 text-ember" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="mt-6 text-base font-semibold tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- COLORS ---------------- */
const colorways = [
  { name: "Diablo Red", hex: "#B0221B", frame: 1 },
  { name: "Cosmic Yellow", hex: "#E5B24A", frame: 76 },
  { name: "Racing Green", hex: "#1F5F3E", frame: 151 },
  { name: "Storm Grey", hex: "#4A4C4E", frame: 226 },
];

function ColorShowcase() {
  const [active, setActive] = useState(0);
  const current = colorways[active];
  const frameSrc = `/bike/f${String(current.frame).padStart(3, "0")}.webp`;
  return (
    <section id="colors" className="relative overflow-hidden py-32 md:py-40">
      <SectionAura tint={current.hex} />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Colorways"
          title={<>Signature<br />finishes.</>}
          copy="Hand-applied heritage colorways and a Triumph tri-stripe on every tank."
        />
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] glass">
            <div
              className="absolute inset-0 transition-colors duration-1000"
              style={{
                background: `radial-gradient(ellipse at 50% 55%, ${current.hex}22, transparent 60%)`,
              }}
            />
            <motion.img
              key={frameSrc}
              src={frameSrc}
              alt={`Triumph Speed T4 in ${current.name}`}
              initial={{ opacity: 0, scale: 1.02, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
              className="absolute inset-0 h-full w-full object-contain"
              draggable={false}
            />
            <div className="absolute bottom-5 left-6 flex items-center gap-3 rounded-full bg-black/40 px-4 py-2 text-xs backdrop-blur">
              <span
                className="h-3 w-3 rounded-full ring-2 ring-white/30"
                style={{ background: current.hex }}
              />
              {current.name}
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3">
            {colorways.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-500 ${
                  active === i
                    ? "border-white/20 bg-white/[0.05] ring-ember"
                    : "border-white/8 bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="h-8 w-8 rounded-full ring-1 ring-white/20 transition-transform group-hover:scale-110"
                    style={{ background: c.hex }}
                  />
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Colorway 0{i + 1}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className={`h-4 w-4 transition-opacity ${active === i ? "opacity-100 text-ember" : "opacity-30"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PARALLAX STORY ---------------- */
function ParallaxStory() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  const lines = [
    "Designed for the City.",
    "Built for the Highway.",
    "Made for Every Ride.",
  ];

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-48">
      <motion.div
        style={{ y: y2 }}
        className="pointer-events-none absolute inset-0 opacity-40"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, oklch(0.72 0.19 45 / 0.25), transparent 55%), radial-gradient(ellipse at 70% 70%, oklch(0.35 0.1 40 / 0.4), transparent 55%)",
          }}
        />
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div style={{ y: y1 }} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] glass">
          <motion.img
            src="/bike/f040.webp"
            alt="Triumph Speed T4 profile"
            style={{ scale }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.3em] text-white/70">
            Ride No. 04 — Ember Dawn
          </div>
        </motion.div>

        <div className="flex flex-col gap-8">
          {lines.map((line, i) => (
            <motion.h2
              key={line}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              className="font-display text-5xl font-black leading-[0.95] tracking-[-0.03em] md:text-7xl"
            >
              <span
                className={
                  i === 1
                    ? "bg-gradient-to-r from-white via-[oklch(0.85_0.15_50)] to-white bg-clip-text text-transparent"
                    : "text-white"
                }
              >
                {line}
              </span>
            </motion.h2>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-md text-base text-muted-foreground"
          >
            Whether you're carving through downtown streets or opening it up on
            an empty highway, the Speed T4 answers every input with the same
            unshakeable composure.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SPECS ---------------- */
const specGroups: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }[] = [
  { icon: Cog, label: "Engine", value: "398cc, Liquid-cooled, Single-cylinder DOHC" },
  { icon: Wrench, label: "Transmission", value: "6-Speed manual, wet multi-plate clutch" },
  { icon: Mountain, label: "Dimensions", value: "2086 × 800 × 1071 mm (L × W × H)" },
  { icon: Armchair, label: "Seat Height", value: "790 mm" },
  { icon: RouteIcon, label: "Ground Clearance", value: "158 mm" },
  { icon: Fuel, label: "Fuel Tank", value: "13 Litres" },
  { icon: Droplet, label: "Mileage", value: "~30 km/l (claimed)" },
  { icon: Gauge, label: "Tyres", value: "110/70-17 (Front), 150/60-17 (Rear)" },
  { icon: ShieldCheck, label: "Brakes", value: "300mm disc (F), 230mm disc (R), Dual-channel ABS" },
  { icon: Wind, label: "Suspension", value: "41mm forks (F), pre-load monoshock (R)" },
];

function Specifications() {
  return (
    <section id="specs" className="relative overflow-hidden py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Specifications"
          title={<>The numbers,<br />in full.</>}
          copy="Every measurement, tuned for balance. Every component, considered."
        />
        <div className="mt-16 overflow-hidden rounded-3xl glass">
          {specGroups.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              className={`grid grid-cols-[auto_1fr_2fr] items-center gap-6 px-6 py-5 md:px-10 ${
                i !== specGroups.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/10">
                <s.icon className="h-4 w-4 text-ember" />
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {s.label}
              </div>
              <div className="text-sm text-foreground md:text-base">{s.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- GALLERY ---------------- */
const galleryFrames = [10, 22, 34, 46, 58, 70, 82, 94];
function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <section id="gallery" className="relative overflow-hidden py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Gallery"
          title={<>Every angle,<br />cinematic.</>}
          copy="Studio-shot from every side. Click any frame to enter the lightbox."
        />
        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          {galleryFrames.map((f, i) => {
            const src = `/bike/f${String(f).padStart(3, "0")}.webp`;
            const tall = i % 3 === 0;
            return (
              <motion.button
                key={f}
                onClick={() => setLightbox(f)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
                className={`group relative overflow-hidden rounded-2xl glass ${
                  tall ? "row-span-2 aspect-[4/5]" : "aspect-[4/3]"
                }`}
                aria-label={`View gallery image ${i + 1}`}
              >
                <img
                  src={src}
                  loading="lazy"
                  alt={`Triumph Speed T4 view ${i + 1}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-3 right-3 rounded-full bg-black/50 p-2 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {lightbox !== null && (
        <button
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-6 backdrop-blur-xl"
          aria-label="Close lightbox"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            src={`/bike/f${String(lightbox).padStart(3, "0")}.webp`}
            alt="Triumph Speed T4"
            className="max-h-full max-w-full rounded-2xl object-contain"
          />
        </button>
      )}
    </section>
  );
}

/* ---------------- BOOK ---------------- */
function BookTestRide() {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Test ride requested. Your dealer will be in touch.");
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 900);
  };
  return (
    <section id="book" className="relative overflow-hidden py-32 md:py-40">
      <SectionAura />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 rounded-[2.5rem] glass p-6 md:grid-cols-[1fr_1.1fr] md:p-12">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-ember">
                Book · Test · Ride
              </div>
              <h2 className="mt-4 font-display text-4xl font-black leading-[0.95] tracking-[-0.03em] md:text-6xl">
                Feel the T4.<br />
                <span className="text-muted-foreground">In your city.</span>
              </h2>
              <p className="mt-6 max-w-md text-sm text-muted-foreground">
                Reserve a personal test ride at your nearest Triumph dealership. A specialist will
                contact you within 24 hours to confirm.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-ember" />
                <div>
                  <div className="text-foreground">1800 210 1000</div>
                  <div className="text-muted-foreground">Mon–Sat, 9am–7pm</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-ember" />
                <div>
                  <div className="text-foreground">rides@triumph.co</div>
                  <div className="text-muted-foreground">Concierge team</div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" required autoComplete="name" />
            <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
            <Field label="Email" name="email" type="email" required autoComplete="email" className="sm:col-span-2" />
            <Field label="City" name="city" required autoComplete="address-level2" />
            <Field label="Preferred dealer" name="dealer" placeholder="Nearest showroom" />
            <div className="sm:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-ember focus:outline-none focus:ring-1 focus:ring-ember"
                placeholder="Anything we should know?"
              />
            </div>
            <div className="sm:col-span-2 flex items-center justify-between gap-4">
              <p className="text-[11px] text-muted-foreground">
                By submitting, you agree to be contacted about your test ride.
              </p>
              <MagneticButton type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Reserve My Ride"}
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required, autoComplete, placeholder, className,
}: {
  label: string; name: string; type?: string; required?: boolean;
  autoComplete?: string; placeholder?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}{required && <span className="ml-1 text-ember">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-full border border-white/10 bg-white/[0.03] px-5 text-sm placeholder:text-muted-foreground/60 focus:border-ember focus:outline-none focus:ring-1 focus:ring-ember"
      />
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[oklch(0.09_0.008_40)] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <TriumphMark className="h-6 w-auto text-foreground" />
            <p className="mt-4 max-w-xs text-xs text-muted-foreground">
              For over a century, Triumph Motorcycles has hand-built machines
              that define character on two wheels.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.25em] text-muted-foreground" aria-label="Footer">
            <button onClick={() => scrollTo("hero")} className="hover:text-foreground">Overview</button>
            <button onClick={() => scrollTo("performance")} className="hover:text-foreground">Performance</button>
            <button onClick={() => scrollTo("features")} className="hover:text-foreground">Features</button>
            <button onClick={() => scrollTo("specs")} className="hover:text-foreground">Specs</button>
            <button onClick={() => scrollTo("book")} className="hover:text-foreground">Book</button>
          </nav>

          <div className="flex items-center gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-colors hover:border-ember hover:text-ember"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
          <div className="flex items-center gap-3">
            <MapPin className="h-3.5 w-3.5" />
            Hinckley · London · Delhi · Bangkok
          </div>
          <div>© {new Date().getFullYear()} Triumph Motorcycles. All rights reserved. Fan-made cinematic showcase.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SHARED ---------------- */
function SectionHead({
  eyebrow, title, copy,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[0.4em] text-ember"
        >
          {eyebrow}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-[-0.035em] md:text-7xl"
        >
          {title}
        </motion.h2>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="max-w-md text-sm text-muted-foreground md:text-base"
      >
        {copy}
      </motion.p>
    </div>
  );
}

function SectionAura({ tint }: { tint?: string }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.05]" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${tint ? tint + "22" : "oklch(0.72 0.19 45 / 0.16)"}, transparent 60%)`,
        }}
      />
    </>
  );
}
