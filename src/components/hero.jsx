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

const NAV_LINKS = ["ABOUT", "WORK", "SKILLS", "CONTACT"];

// ─── slash list (real resume lines) ──────────────────────────────────────────

const SLASH_LIST = [
  "/ DEVOPS & CLOUD ENGINEERING",
  "/ KUBERNETES · HELM · EKS",
  "/ OBSERVABILITY PIPELINES",
];

// ─── annotations ─────────────────────────────────────────────────────────────

const BASED_IN   = "BASED IN INDORE, MP";
const RECENT_TAG = "RECENT ROLE";
const RECENT_VAL = "47BILLION — JENKINS / PROMETHEUS / GRAFANA";
const AVAIL_TAG  = "OPEN TO INTERNSHIPS  ↘";
const AVAIL_VAL  = "akhil@akd.dev";

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
    <span className="font-mono text-[10px] tracking-[0.18em] text-[#eeebe4]/40">
      {h}:{m}:{s}
    </span>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden select-none"
      style={{ background: "#0d1117" }}
    >
      {/* ── nav ─────────────────────────────────────────────────── */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 pt-8">
        {/* wordmark */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
          className="font-mono text-[11px] tracking-[0.14em] text-[#eeebe4] leading-tight"
        >
          <div>AKHIL</div>
          <div>DWIVEDI</div>
        </motion.div>

        {/* center links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={i * 0.6 + 0.1}
            >
              <a
                href={`#${link.toLowerCase()}`}
                className="font-mono text-[10px] tracking-[0.2em] text-[#eeebe4]/50 hover:text-[#eeebe4] transition-colors duration-300"
              >
                [ {link} ]
              </a>
            </motion.li>
          ))}
        </ul>

        {/* right — uptime + contact */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex items-center gap-6"
        >
          <UptimeTicker />
          <a
            href="mailto:akhil@akd.dev"
            className="font-mono text-[10px] tracking-[0.16em] text-[#eeebe4] border-b border-[#eeebe4]/30 pb-px hover:border-[#eeebe4] transition-colors duration-300"
          >
            CONTACT ↗
          </a>
        </motion.div>
      </nav>

      {/* ── giant headline ───────────────────────────────────────── */}
      {/* Line 1 */}
      <div className="absolute top-[14%] left-0 right-0 overflow-hidden z-10 px-6 md:px-8">
        <div className="overflow-hidden">
          <motion.h1
            variants={clipUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-sans font-black text-[#eeebe4] leading-none tracking-[-0.03em] whitespace-nowrap"
            style={{
              fontSize: "clamp(64px, 13vw, 195px)",
              WebkitTextFillColor: "#eeebe4",
            }}
          >
            DEVOPS
          </motion.h1>
        </div>
      </div>

      {/* Line 2 */}
      <div
        className="absolute left-0 right-0 overflow-hidden z-10 px-6 md:px-8"
        style={{ top: "calc(14% + clamp(62px, 12.4vw, 188px))" }}
      >
        <div className="overflow-hidden">
          <motion.h1
            variants={clipUp}
            initial="hidden"
            animate="visible"
            custom={1.4}
            className="font-sans font-black leading-none tracking-[-0.03em] whitespace-nowrap"
            style={{
              fontSize: "clamp(64px, 13vw, 195px)",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "2px rgba(238,235,228,0.6)",
            }}
          >
            ENGINEER
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
          className="w-full bg-[#1a1f2a] border border-[#eeebe4]/10 overflow-hidden"
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
              className="font-sans font-bold text-[#eeebe4] leading-none"
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
        className="absolute z-30 font-mono text-[#eeebe4]/35 tracking-[0.22em]"
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
        <p className="font-mono text-[10px] tracking-[0.18em] text-[#eeebe4]/40">
          {AVAIL_TAG}
        </p>
        <a
          href="mailto:akhil@akd.dev"
          className="font-mono text-[13px] tracking-[0.06em] text-[#eeebe4] hover:text-[#eeebe4]/60 transition-colors duration-300"
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
        <p className="font-mono text-[10px] tracking-[0.18em] text-[#eeebe4]/40">
          {RECENT_TAG}  ↘
        </p>
        <p className="font-mono text-[12px] tracking-[0.04em] text-[#eeebe4] font-bold">
          {RECENT_VAL}
        </p>
      </motion.div>

      {/* ── thin horizontal rule at bottom ───────────────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={3.6}
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: "rgba(238,235,228,0.07)" }}
      />
    </section>
  );
}