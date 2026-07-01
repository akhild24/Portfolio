import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Akhil from "../assets/me.png";

// ─── animation config ────────────────────────────────────────────────────────

const STAGGER = 0.08;

const clipUp = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i = 0) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.75,
      delay: i * STAGGER,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: i * STAGGER,
      ease: "easeOut",
    },
  }),
};

const photoReveal = {
  hidden: { y: -32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      delay: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ─── nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" }
];

// ─── slash list (real resume lines) ──────────────────────────────────────────

const SLASH_LIST = [
  "/ DEVOPS & CLOUD ENGINEERING",
  "/ KUBERNETES · HELM · EKS",
  "/ OBSERVABILITY PIPELINES",
];

// ─── annotations ─────────────────────────────────────────────────────────────

const BASED_IN   = "BASED IN INDORE, MP";
const RECENT_TAG = "RECENT ROLE";
const RECENT_VAL = "47BILLION — FULL STACK / RAG / VAPT";
const AVAIL_TAG  = "OPEN TO INTERNSHIPS  ↘";
const AVAIL_VAL  = "akhildwivedi453@gmail.com";

// ─── live uptime ticker ───────────────────────────────────────────────────────

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

// ─── signal accent dot ───────────────────────────────────────────────────────

function SignalDot() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      className="inline-block w-[6px] h-[6px] rounded-full bg-signal"
    />
  );
}

// ─── navbar component (sticky, lives above all sections) ─────────────────────

export function Navbar() {
  return (
    <nav className="fixed top-0 left-2 right-2 z-50 flex items-center justify-between px-10 py-5 bg-void/80 backdrop-blur-md border-b border-bone/5 transition-all duration-300">
      {/* wordmark */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0}
        className="font-mono text-[14px] tracking-[0.14em] text-bone leading-tight"
      >
        <div>AKHIL</div>
        <div>DWIVEDI</div>
      </motion.div>

      {/* center links */}
      <ul className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link, i) => (
          <motion.li
            key={link.label}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={i * 0.6 + 0.1}
          >
            <a
              href={link.href}
              className="font-mono text-[14px] tracking-[0.2em] text-ash/50 hover:text-bone transition-colors duration-300"
            >
              [ {link.label} ]
            </a>
          </motion.li>
        ))}
      </ul>

      {/* right — signal dot + uptime + contact */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0.5}
        className="flex items-center gap-6"
      >
        <div className="flex items-center gap-2">
          <SignalDot />
          <UptimeTicker />
        </div>
        <a
          href="mailto:akhildwivedi453@gmail.com"
          className="font-mono text-[14px] tracking-[0.16em] text-bone border-b border-iron pb-px hover:border-bone transition-colors duration-300"
        >
          CONTACT ↗
        </a>
      </motion.div>
    </nav>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden select-none bg-void"
    >
      {/* nav is now rendered at App level as a fixed element */}

      {/* ── giant headline ───────────────────────────────────────── */}
      {/* Line 1 — DEVOPS */}
      <div className="absolute top-[14%] left-0 right-0 overflow-hidden z-10 px-6 md:px-8">
        <div className="overflow-hidden">
          <motion.h1
            variants={clipUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-sans font-black text-bone leading-none whitespace-nowrap"
            style={{
              fontSize: "clamp(64px, 13vw, 195px)",
              letterSpacing: "-0.06em",
            }}
          >
            DEVOPS
          </motion.h1>
        </div>
      </div>

      {/* Serif italic connective — "engineering" */}
      <div
        className="absolute left-0 right-0 overflow-hidden z-10 px-6 md:px-8"
        style={{ top: "calc(14% + clamp(58px, 11.8vw, 178px))" }}
      >
        <div className="overflow-hidden">
          <motion.p
            variants={clipUp}
            initial="hidden"
            animate="visible"
            custom={1.2}
            className="font-serif italic font-normal text-ash leading-none"
            style={{
              fontSize: "clamp(24px, 3.2vw, 42px)",
              letterSpacing: "-0.02em",
              paddingLeft: "0.15em",
            }}
          >
            engineering
          </motion.p>
        </div>
      </div>

      {/* Line 2 — SYSTEMS (outline) */}
      <div
        className="absolute left-0 right-0 overflow-hidden z-10 px-6 md:px-8"
        style={{ top: "calc(14% + clamp(88px, 16vw, 240px))" }}
      >
        <div className="overflow-hidden">
          <motion.h1
            variants={clipUp}
            initial="hidden"
            animate="visible"
            custom={1.4}
            className="font-sans font-black leading-none whitespace-nowrap"
            style={{
              fontSize: "clamp(64px, 13vw, 195px)",
              letterSpacing: "-0.06em",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "2px color-mix(in srgb, var(--color-bone) 50%, transparent)",
            }}
          >
            SYSTEMS
          </motion.h1>
        </div>
      </div>

      {/* ── photo block ──────────────────────────────────────────── */}
      <motion.div
        variants={photoReveal}
        initial="hidden"
        animate="visible"
        className="absolute z-20"
        style={{
          top: "clamp(80px, 12vw, 160px)",
          right: "clamp(40px, 8vw, 140px)",
          width: "clamp(200px, 20vw, 280px)",
        }}
      >
        {/* photo — grayscale, fills the frame */}
        <div
          className="w-full bg-surface border border-bone/10 overflow-hidden"
          style={{ aspectRatio: "3/4" }}
        >
          <img
            src={Akhil}
            alt="Akhil Dwivedi"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* slash list — sits below photo, left-anchored */}
        <div className="mt-5 flex flex-col gap-[6px]">
          {SLASH_LIST.map((line, i) => (
            <motion.p
              key={line}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={2.2 + i * 0.3}
              className="font-sans font-bold text-bone leading-none"
              style={{ fontSize: "clamp(10px, 1.1vw, 14px)", letterSpacing: "0.04em" }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* ── based-in annotation ──────────────────────────────────── */}
      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={2.8}
        className="absolute z-30 font-mono text-dim tracking-[0.22em]"
        style={{
          fontSize: "10px",
          top: "clamp(54px, 8vw, 112px)",
          right: "clamp(40px, 8vw, 140px)",
        }}
      >
        {BASED_IN}
      </motion.p>

      {/* ── bottom-left: availability + email ────────────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={3.2}
        className="absolute bottom-10 left-8 z-20 flex flex-col gap-[6px]"
      >
        <p className="font-mono text-[10px] tracking-[0.18em] text-dim">
          {AVAIL_TAG}
        </p>
        <a
          href="mailto:akhildwivedi453@gmail.com"
          className="font-mono text-[13px] tracking-[0.06em] text-bone hover:text-ash transition-colors duration-300"
        >
          {AVAIL_VAL}
        </a>
      </motion.div>

      {/* ── bottom-right: recent role ─────────────────────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={3.4}
        className="absolute bottom-10 right-8 z-20 flex flex-col gap-[6px] text-right"
      >
        <p className="font-mono text-[10px] tracking-[0.18em] text-dim">
          {RECENT_TAG}  ↘
        </p>
        <p className="font-mono text-[12px] tracking-[0.04em] text-bone font-bold">
          {RECENT_VAL}
        </p>
      </motion.div>

      {/* ── thin horizontal rule at bottom ───────────────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={3.6}
        className="absolute bottom-0 left-0 right-0 h-px z-10 bg-iron/30"
      />
    </section>
  );
}