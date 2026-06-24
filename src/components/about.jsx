import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Akhil from "../assets/me.png";

function useInView(threshold = 0.05) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeUp({ children, delay = 0, visible, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Palette — all values reference CSS variables from index.css @theme ── */
const BG    = "var(--color-dark)";
const WHITE = "var(--color-cream)";
const DIM   = "var(--color-dim)";
const BODY  = "var(--color-body)";
const DIV   = "var(--color-panel)";
const DIMQ  = "var(--color-elevated)";
const LIGHT = "var(--color-light)";
const INK   = "var(--color-ink)";
const MONO  = "var(--font-mono)";
const SANS  = "var(--font-sans)";

// ─── PANEL 1 ───────────────────────────────────────────────────────────────
function TitlePanel() {
  const [ref, visible] = useInView(0.25);
  return (
    <div
      ref={ref}
      style={{
        background: LIGHT,
        width: "100%",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.05 }}
        style={{
          position: "absolute", top: 28, left: 36,
          fontFamily: MONO, fontSize: "11px",
          letterSpacing: "0.15em", color: INK,
          textTransform: "uppercase",
        }}
      >
        ABOUT ME
      </motion.div>

      <div style={{ lineHeight: 0.9, textAlign: "center" }}>
        {["ABOUT", "ME"].map((word, i) => (
          <div key={word} style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ y: "102%" }}
              animate={visible ? { y: "0%" } : {}}
              transition={{ duration: 0.75, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: SANS, fontWeight: 900,
                fontSize: "clamp(50px, 9vw, 100px)",
                color: INK, textTransform: "uppercase",
                letterSpacing: "-0.03em", display: "block",
              }}
            >
              {word}
            </motion.div>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={visible ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "1px", background: DIV, transformOrigin: "left",
        }}
      />
    </div>
  );
}

// ─── PANEL 2 ───────────────────────────────────────────────────────────────
const LINES = [
  { t: "INFRASTRUCTURE",  bright: true  },
  { t: "IS NOT JUST",     bright: false },
  { t: "AUTOMATION,",     bright: true  },
  { t: "BUT A TOOL FOR",  bright: false },
  { t: "SCALE",           bright: true  },
  { t: "AND RESILIENCE.", bright: false },
];

function ManifestoPanel() {
  const [ref, visible] = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{
        background: BG, width: "100%", minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "80px 40px", boxSizing: "border-box", position: "relative",
      }}
    >
      <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.35 }}
        style={{ position: "absolute", top: 36, left: 36, fontFamily: MONO, fontWeight: 700, fontSize: "clamp(15px, 1.8vw, 22px)", color: WHITE }}>
        2/5
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.35, delay: 0.05 }}
        style={{ position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)", fontFamily: MONO, fontSize: "11px", letterSpacing: "0.18em", color: DIM, textTransform: "uppercase", whiteSpace: "nowrap" }}>
        FOR ME
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.35, delay: 0.05 }}
        style={{ position: "absolute", top: 40, right: 36, fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", color: DIM, textTransform: "uppercase" }}>
        DSGN/2
      </motion.div>

      <div>
        {LINES.map((line, i) => (
          <div key={i} style={{ overflow: "hidden", lineHeight: 1.02 }}>
            <motion.div
              initial={{ y: "105%" }}
              animate={visible ? { y: "0%" } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: SANS, fontWeight: 900,
                fontSize: "clamp(38px, 6.5vw, 88px)",
                letterSpacing: "-0.03em",
                color: line.bright ? WHITE : DIMQ,
                textTransform: "uppercase", display: "block", paddingBottom: "0.04em",
              }}
            >
              {line.t}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PANEL 3 — Photo wipe + bio ────────────────────────────────────────────
// Scroll offset "start 80%" → "start 20%":
//   progress = 0 when panel-top is 80% down the viewport (just peeking in)
//   progress = 1 when panel-top is 20% down the viewport (well inside view)
// This gives a generous animation window in the middle of the viewport.

function BioPanel() {
  const panelRef = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setEntered(true); },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: panelRef,
    // start: panel-top enters at 85% viewport height (near bottom)
    // end:   panel-top is at 15% viewport height (well past center)
    offset: ["start 85%", "start 15%"],
  });

  // Smooth out the raw scroll so it doesn't stutter
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  // Photo wipes top→bottom: clipPath bottom-inset 100%→0%
  const clipBottom = useTransform(smooth, [0, 0.6], [100, 0]);
  const photoClip = useTransform(clipBottom, (v) => `inset(0% 0% ${v}% 0%)`);

  // Photo slight upward parallax as it reveals
  const photoY = useTransform(smooth, [0, 0.6], [30, 0]);

  // Name fades in while photo is mid-reveal
  const nameOpacity = useTransform(smooth, [0.35, 0.65], [0, 1]);
  const nameY       = useTransform(smooth, [0.35, 0.65], [20, 0]);

  // Experience block comes in last
  const expOpacity  = useTransform(smooth, [0.6, 0.9], [0, 1]);
  const expY        = useTransform(smooth, [0.6, 0.9], [20, 0]);

  return (
    <div
      ref={panelRef}
      style={{
        background: BG,
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        boxSizing: "border-box",
        paddingBottom: 100,
      }}
    >
      {/* eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute", top: 28, left: 36,
          fontFamily: MONO, fontSize: "11px",
          letterSpacing: "0.13em", color: DIM,
          textTransform: "uppercase",
        }}
      >
        ABOUT ME
      </motion.div>

      {/* content column */}
      <div style={{ marginLeft: "clamp(120px, 30vw, 480px)", paddingTop: 80 }}>

        {/* PHOTO — wipe clip driven by scroll */}
        <div style={{ width: 280, height: 300, position: "relative", overflow: "visible" }}>
          <motion.div
            style={{
              width: 280,
              height: 300,
              clipPath: photoClip,
              y: photoY,
              willChange: "clip-path, transform",
            }}
          >
            <img
              src={Akhil}
              alt="Akhil Dwivedi"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
                filter: "grayscale(1)",
              }}
            />
          </motion.div>
        </div>

        {/* NAME */}
        <motion.div
          style={{
            marginTop: 28,
            width: 280,
            textAlign: "center",
            opacity: nameOpacity,
            y: nameY,
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: "13px", letterSpacing: "0.12em", color: WHITE, textTransform: "uppercase", marginBottom: 4 }}>
            HELLO!
          </div>
          <div style={{ fontFamily: MONO, fontSize: "13px", letterSpacing: "0.12em", color: WHITE, textTransform: "uppercase" }}>
            I'M AKHIL DWIVEDI
          </div>
        </motion.div>

        {/* MY EXPERIENCE + bio */}
        <motion.div style={{ marginTop: 44, opacity: expOpacity, y: expY }}>
          <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.18em", color: DIM, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            MY EXPERIENCE <span style={{ fontSize: "12px" }}>↘</span>
          </div>
          <p style={{ fontFamily: MONO, fontSize: "12px", lineHeight: 2.0, letterSpacing: "0.1em", color: BODY, textTransform: "uppercase", margin: 0, maxWidth: 520 }}>
            A 4TH YEAR CSE STUDENT BUILDING PRODUCTION-GRADE
            <br />
            INFRA. PREVIOUSLY INTERN AT 47BILLION — FULL STACK
            <br />
            DEV · RAG · VAPT · AI · CLOUD MENTOR AT GDG ON CAMPUS,
            <br />
            PUSHING 40+ STUDENTS TOWARD GCP CERTIFICATION.
            <br />
            TOP 10 OF 275 TEAMS AT UDBHAV'26.
            <br />
            50+ VULNERABILITIES IDENTIFIED ON A LIVE PRODUCTION SYSTEM.
          </p>
        </motion.div>

      </div>
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" style={{ background: BG }}>
      <TitlePanel />
      <ManifestoPanel />
      <BioPanel />
    </section>
  );
}