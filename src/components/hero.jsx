import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Akhil from "../assets/me.jpeg";

// ─── animation config ────────────────────────────────────────────────────────

const STAGGER = 0.08;

const clipUp = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i = 0) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, delay: i * STAGGER, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * STAGGER, ease: "easeOut" },
  }),
};

const photoReveal = {
  hidden: { y: -24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── constants ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "ABOUT",    href: "#about"    },
  { label: "WORK",     href: "#work"     },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS",   href: "#skills"   },
  { label: "CONTACT",  href: "#contact"  },
];

const SLASH_LIST = [
  "/ DEVOPS & CLOUD ENGINEERING",
  "/ KUBERNETES · HELM · EKS",
  "/ OBSERVABILITY PIPELINES",
];

const BASED_IN   = "BASED IN INDORE, MP";
const RECENT_TAG = "RECENT ROLE";
const RECENT_VAL = "47BILLION — FULL STACK / RAG / VAPT";
const AVAIL_TAG  = "OPEN TO INTERNSHIPS  ↘";
const AVAIL_VAL  = "akhildwivedi453@gmail.com";

// ─── uptime ticker ────────────────────────────────────────────────────────────

function UptimeTicker() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const s = String(elapsed % 60).padStart(2, "0");
  return (
    <span className="font-mono text-[10px] tracking-[0.18em] text-dim">
      {h}:{m}:{s}
    </span>
  );
}

// ─── signal dot ──────────────────────────────────────────────────────────────

function SignalDot() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      className="inline-block w-[6px] h-[6px] rounded-full bg-signal"
    />
  );
}

// ─── mobile menu ─────────────────────────────────────────────────────────────

function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-void/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          onClick={onClose}
        >
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              onClick={onClose}
              className="font-mono text-[16px] tracking-[0.25em] text-ash/70 hover:text-bone transition-colors duration-300"
            >
              [ {link.label} ]
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── navbar ──────────────────────────────────────────────────────────────────

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-2 right-2 z-50 flex items-center justify-between px-4 sm:px-10 py-4 sm:py-5 bg-void/80 backdrop-blur-md border-b border-bone/5">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0}
          className="font-mono text-[12px] sm:text-[14px] tracking-[0.14em] text-bone leading-tight">
          <div>AKHIL</div>
          <div>DWIVEDI</div>
        </motion.div>

        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link, i) => (
            <motion.li key={link.label} variants={fadeIn} initial="hidden" animate="visible" custom={i * 0.6 + 0.1}>
              <a href={link.href}
                className="font-mono text-[14px] tracking-[0.2em] text-ash/50 hover:text-bone transition-colors duration-300">
                [ {link.label} ]
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0.5}
          className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <SignalDot />
            <UptimeTicker />
          </div>
          <button className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-bone origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-bone" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-bone origin-center" />
          </button>
        </motion.div>
      </nav>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

// ─── headline block (shared between mobile + desktop) ────────────────────────

function HeadlineStack() {
  return (
    <div className="flex flex-col">
      {/* DEVOPS */}
      <div className="overflow-hidden">
        <motion.h1
          variants={clipUp} initial="hidden" animate="visible" custom={1}
          className="font-sans font-black text-bone leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(48px, 13vw, 195px)", letterSpacing: "-0.06em" }}
        >
          DEVOPS
        </motion.h1>
      </div>

      {/* engineering */}
      <div className="overflow-hidden">
        <motion.p
          variants={clipUp} initial="hidden" animate="visible" custom={1.2}
          className="font-serif italic font-normal text-ash leading-none"
          style={{ fontSize: "clamp(20px, 3.2vw, 42px)", letterSpacing: "-0.02em", paddingLeft: "0.15em" }}
        >
          engineering
        </motion.p>
      </div>

      {/* SYSTEMS outline */}
      <div className="overflow-hidden">
        <motion.h1
          variants={clipUp} initial="hidden" animate="visible" custom={1.4}
          className="font-sans font-black leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(48px, 13vw, 195px)",
            letterSpacing: "-0.06em",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "2px color-mix(in srgb, var(--color-bone) 50%, transparent)",
          }}
        >
          SYSTEMS
        </motion.h1>
      </div>
    </div>
  );
}

// ─── photo block (shared between mobile + desktop) ────────────────────────────

function PhotoBlock({ custom = 2.2, showBasedIn = true }) {
  return (
    <motion.div variants={photoReveal} initial="hidden" animate="visible">
      {/* BASED IN label — only on desktop */}
      {showBasedIn && (
        <motion.p
          variants={fadeIn} initial="hidden" animate="visible" custom={2.6}
          className="font-mono text-[10px] tracking-[0.22em] text-dim mb-2"
        >
          {BASED_IN}
        </motion.p>
      )}

      {/* photo */}
      <div className="w-full bg-surface border border-bone/10 overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img src={Akhil} alt="Akhil Dwivedi" className="w-full h-full object-cover grayscale" />
      </div>

      {/* slash list */}
      <div className="mt-3 flex flex-col gap-[6px]">
        {SLASH_LIST.map((line, i) => (
          <motion.p
            key={line}
            variants={fadeIn} initial="hidden" animate="visible" custom={custom + i * 0.3}
            className="font-sans font-bold text-bone leading-none"
            style={{ fontSize: "11px", letterSpacing: "0.04em" }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

// ─── main hero ────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section id="hero" className="relative w-full min-h-screen select-none bg-void overflow-hidden">

      {/* ── MOBILE layout (< 640px) ── */}
      <div className="flex sm:hidden flex-col px-4 pb-8 min-h-screen justify-between" style={{ paddingTop: "72px" }}>

        <div className="flex flex-col gap-6 mt-4">
          {/* headline */}
          <div className="w-full">
            <HeadlineStack />
          </div>

          {/* photo — centered below the heading */}
          <div className="w-full flex justify-center">
            <div className="w-[65vw] max-w-[240px]">
              <PhotoBlock custom={2.2} showBasedIn={true} />
            </div>
          </div>
        </div>

        {/* availability */}
        <motion.div
          variants={fadeIn} initial="hidden" animate="visible" custom={3.2}
          className="flex flex-col gap-[6px] mt-8 text-center"
        >
          <p className="font-mono text-[9px] tracking-[0.18em] text-dim">{AVAIL_TAG}</p>
          <a href="mailto:akhildwivedi453@gmail.com"
            className="font-mono text-[11px] tracking-[0.06em] text-bone hover:text-ash transition-colors duration-300 break-all">
            {AVAIL_VAL}
          </a>
        </motion.div>
      </div>

      {/* ── DESKTOP layout (≥ 640px): absolute positioned, original feel ── */}
      <div className="hidden sm:block">
        {/* headline — left, stops before photo column */}
        <div
          className="absolute z-10 px-6 md:px-8"
          style={{ top: "14%", left: 0, right: "clamp(160px, 26vw, 400px)" }}
        >
          <HeadlineStack />
        </div>

        {/* photo — right column */}
        <div
          className="absolute z-20"
          style={{
            top: "clamp(80px, 10vw, 140px)",
            right: "clamp(16px, 4vw, 140px)",
            width: "clamp(130px, 20vw, 280px)",
          }}
        >
          <PhotoBlock custom={2.2} showBasedIn={true} />
        </div>

        {/* bottom-left: availability */}
        <motion.div
          variants={fadeIn} initial="hidden" animate="visible" custom={3.2}
          className="absolute bottom-10 left-8 z-20 flex flex-col gap-[6px]"
        >
          <p className="font-mono text-[10px] tracking-[0.18em] text-dim">{AVAIL_TAG}</p>
          <a href="mailto:akhildwivedi453@gmail.com"
            className="font-mono text-[13px] tracking-[0.06em] text-bone hover:text-ash transition-colors duration-300">
            {AVAIL_VAL}
          </a>
        </motion.div>

        {/* bottom-right: recent role */}
        <motion.div
          variants={fadeIn} initial="hidden" animate="visible" custom={3.4}
          className="absolute bottom-10 right-8 z-20 flex flex-col gap-[6px] text-right"
        >
          <p className="font-mono text-[10px] tracking-[0.18em] text-dim">{RECENT_TAG}  ↘</p>
          <p className="font-mono text-[12px] tracking-[0.04em] text-bone font-bold">{RECENT_VAL}</p>
        </motion.div>
      </div>

      {/* ── hairline bottom rule ── */}
      <motion.div
        variants={fadeIn} initial="hidden" animate="visible" custom={3.6}
        className="absolute bottom-0 left-0 right-0 h-px z-10 bg-iron/30"
      />
    </section>
  );
}