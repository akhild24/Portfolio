import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Akhil from "../assets/me.jpeg";
import CircuitBoard from "./CircuitBoard";
import { VOID, BONE, ASH, DIM, IRON, INK, LINEN, SMOKE, PLATE, SIGNAL, MONO, SANS, SERIF } from "../theme";

// ─── PANEL 1 — Title (linen inverted surface) ──────────────────────────────
function TitlePanel() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.25 });
  return (
    <div
      ref={ref}
      style={{
        background: LINEN,
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* section label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.05 }}
        style={{
          position: "absolute", top: 28, left: "clamp(16px, 4vw, 36px)",
          fontFamily: MONO, fontSize: "11px",
          letterSpacing: "0.15em", color: INK,
          textTransform: "uppercase",
        }}
      >
        ABOUT ME
      </motion.div>

      {/* panel number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute", top: 28, right: "clamp(16px, 4vw, 36px)",
          fontFamily: MONO, fontWeight: 700,
          fontSize: "clamp(15px, 1.8vw, 22px)", color: INK,
        }}
      >
        1/3
      </motion.div>

      {/* big title */}
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
                letterSpacing: "-0.06em", display: "block",
              }}
            >
              {word}
            </motion.div>
          </div>
        ))}
      </div>

      {/* bottom hairline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={visible ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "1px", background: IRON, transformOrigin: "left",
        }}
      />
    </div>
  );
}

// ─── PANEL 2 — Manifesto (void canvas) ─────────────────────────────────────
const LINES = [
  { t: "INFRASTRUCTURE",  bright: true  },
  { t: "IS NOT JUST",     bright: false },
  { t: "AUTOMATION,",     bright: true  },
  { t: "BUT",             bright: false, serif: true, serifWord: "a tool" },
  { t: "FOR",             bright: false },
  { t: "SCALE",           bright: true  },
  { t: "AND RESILIENCE.", bright: false },
];

function ManifestoPanel() {
  const panelRef = useRef(null);
  const visible = useInView(panelRef, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Smooth fade-in/out and translate quote based on scroll position
  const opacity = useTransform(smoothProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  const y = useTransform(smoothProgress, [0.15, 0.35, 0.65, 0.85], [80, 0, 0, -80]);

  return (
    <div
      ref={panelRef}
      style={{
        background: VOID,
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px clamp(16px, 5vw, 40px)",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* panel number */}
      <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.35 }}
        style={{ position: "absolute", top: 36, left: "clamp(16px, 4vw, 36px)", fontFamily: MONO, fontWeight: 700, fontSize: "clamp(15px, 1.8vw, 22px)", color: BONE }}>
        2/3
      </motion.div>

      {/* center label */}
      <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.35, delay: 0.05 }}
        style={{ position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)", fontFamily: MONO, fontSize: "11px", letterSpacing: "0.18em", color: DIM, textTransform: "uppercase", whiteSpace: "nowrap" }}>
        FOR ME
      </motion.div>

      {/* right label */}
      <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.35, delay: 0.05 }}
        style={{ position: "absolute", top: 40, right: "clamp(16px, 4vw, 36px)", fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", color: DIM, textTransform: "uppercase" }}>
        DSGN/2
      </motion.div>

      {/* signal accent dot — the only color punctuation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={visible ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", top: 38, left: 74,
          width: 8, height: 8, borderRadius: "50%",
          background: SIGNAL,
        }}
      />

      <motion.div style={{ opacity, y }}>
        {LINES.map((line, i) => (
          <div key={i} style={{ overflow: "hidden", lineHeight: 1.02 }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.25em",
                paddingBottom: "0.04em",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: SANS, fontWeight: 900,
                  fontSize: "clamp(24px, 6.5vw, 88px)",
                  letterSpacing: "-0.06em",
                  color: line.bright ? BONE : SMOKE,
                  textTransform: "uppercase",
                }}
              >
                {line.t}
              </span>
              {/* serif italic connective after "BUT" */}
              {line.serif && (
                <span
                  style={{
                    fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
                    fontSize: "clamp(16px, 3.2vw, 42px)",
                    letterSpacing: "-0.02em",
                    color: ASH,
                  }}
                >
                  {line.serifWord}
                </span>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── PANEL 3 — Photo wipe + bio + circuit board (void canvas) ──────────────
function BioPanel() {
  const panelRef = useRef(null);
  const entered = useInView(panelRef, { once: true, amount: 0.01 });

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
        background: VOID,
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        zIndex: 3,
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
          position: "absolute", top: 28, left: "clamp(16px, 4vw, 36px)",
          fontFamily: MONO, fontSize: "11px",
          letterSpacing: "0.13em", color: DIM,
          textTransform: "uppercase",
        }}
      >
        ABOUT ME
      </motion.div>

      {/* panel number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute", top: 28, right: "clamp(16px, 4vw, 36px)",
          fontFamily: MONO, fontWeight: 700,
          fontSize: "clamp(15px, 1.8vw, 22px)", color: BONE,
        }}
      >
        3/3
      </motion.div>

      {/* ── two-column layout ─────────────────────────────────────── */}
      <div className="about-bio-layout" style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "clamp(40px, 5vw, 80px)",
        paddingTop: 80,
        paddingLeft: "clamp(16px, 6vw, 120px)",
        paddingRight: "clamp(16px, 6vw, 120px)",
        boxSizing: "border-box",
        flexWrap: "wrap",
      }}>
        {/* ── LEFT COLUMN — photo + name + experience ─────────────── */}
        <div style={{ flex: "0 0 auto" }}>
          {/* PHOTO — wipe clip driven by scroll */}
          <div className="about-photo" style={{ width: 280, height: 300, position: "relative", overflow: "visible" }}>
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

          {/* NAME — serif italic "hello" + sans caps name */}
          <motion.div
            style={{
              marginTop: 28,
              width: 280,
              textAlign: "center",
              opacity: nameOpacity,
              y: nameY,
            }}
            className="about-name"
          >
            <div style={{
              fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
              fontSize: "16px", letterSpacing: "-0.01em", color: ASH,
              marginBottom: 6,
            }}>
              hello, I'm
            </div>
            <div style={{
              fontFamily: SANS, fontWeight: 900,
              fontSize: "18px", letterSpacing: "0.06em", color: BONE,
              textTransform: "uppercase",
            }}>
              AKHIL DWIVEDI
            </div>
          </motion.div>

          {/* MY EXPERIENCE + bio */}
          <motion.div style={{ marginTop: 44, opacity: expOpacity, y: expY }}>
            <div style={{
              fontFamily: MONO, fontSize: "11px",
              letterSpacing: "0.18em", color: DIM,
              textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: 6,
              marginBottom: 20,
            }}>
              MY EXPERIENCE <span style={{ fontSize: "12px" }}>↘</span>
            </div>
            <p className="about-bio-text" style={{
              fontFamily: MONO, fontSize: "12px", lineHeight: 2.0,
              letterSpacing: "0.1em", color: ASH,
              textTransform: "uppercase", margin: 0, maxWidth: 520,
            }}>
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

        {/* ── RIGHT COLUMN — circuit board pipeline ────────────────── */}
        <motion.div
          style={{
            flex: "1 1 400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400,
            paddingTop: 40,
            opacity: expOpacity,
            y: expY,
          }}
        >
          <CircuitBoard />
        </motion.div>
      </div>
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" style={{ background: VOID }}>
      <TitlePanel />
      <ManifestoPanel />
      <BioPanel />
    </section>
  );
}