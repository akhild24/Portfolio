import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ─── Palette — matches current theme tokens ─────────────────────────────────

const VOID     = "var(--color-void)";
const BONE     = "var(--color-bone)";
const ASH      = "var(--color-ash)";
const DIM      = "var(--color-dim)";
const IRON     = "var(--color-iron)";
const SMOKE    = "var(--color-smoke)";
const GRAPHITE = "var(--color-graphite)";
const LINEN    = "var(--color-linen)";
const INK      = "var(--color-ink)";
const PLATE    = "var(--color-plate)";
const MONO     = "var(--font-mono)";
const SANS     = "var(--font-sans)";
const SERIF    = "var(--font-serif)";

// Arterial red — 1px featured border + accent dot only
const ARTERIAL = "#fe1e34";

// ─── 47Billion logo — inline SVG ─────────────────────────────────────────────

function Logo47B({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Lightning bolt — teal/cyan half */}
      <path
        d="M28 4L14 26h10L18 44"
        stroke="#2dd4bf"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Lightning bolt — amber/gold half */}
      <path
        d="M18 44L32 22H22L28 4"
        stroke="#fbbf24"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Center overlap glow */}
      <circle cx="24" cy="24" r="3" fill="#2dd4bf" opacity="0.3" />
    </svg>
  );
}

// ─── IntersectionObserver hook ───────────────────────────────────────────────

function useInView(threshold = 0.1) {
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

// ─── Project data ────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    num: "01",
    name: "COE PLATFORM",
    serif: "full-stack engineering",
    stack: ["REACT", "REDUX", "TAILWIND", "FASTAPI", "MONGODB"],
    body: "Full-stack RBAC event management platform with a three-tier role system — admin, faculty, student — each with tailored dashboards and permissions. Features event creation, blog publishing, real-time notifications, and JWT-based OAuth2 authentication.",
    impact: "REPLACED UNSTRUCTURED MANUAL QUERY HANDLING",
    featured: false,
  },
  {
    num: "02",
    name: "RAG CHATBOT",
    serif: "conversational AI",
    stack: ["GEMINI API", "RAG", "FASTAPI", "VECTOR DB"],
    body: "Retrieval-augmented generation chatbot with configurable tone controls, integrated directly into the CoE platform. Context-aware answers without raising support tickets — instant resolution for repetitive form submissions.",
    impact: "~60% REDUCTION IN MANUAL QUERIES",
    featured: false,
  },
  {
    num: "03",
    name: "VAPT",
    serif: "security research",
    stack: ["GREY-BOX TESTING", "BURP SUITE", "OWASP"],
    body: "Grey-box vulnerability assessment and penetration testing on the live production system. Identified auth bypasses, broken RBAC enforcement, and input validation gaps. Delivered a structured bug report formally adopted as the patch prioritization roadmap.",
    impact: "50+ CRITICAL VULNERABILITIES",
    featured: true,
  },
];

// ─── Section Title ───────────────────────────────────────────────────────────

function WorkTitle() {
  const [ref, visible] = useInView(0.25);

  return (
    <div
      ref={ref}
      style={{
        background: VOID,
        width: "100%",
        padding: "120px 0 64px",
        paddingLeft: "clamp(36px, 6vw, 80px)",
        paddingRight: "clamp(36px, 6vw, 80px)",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* section label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          fontFamily: MONO, fontSize: "11px",
          letterSpacing: "0.15em", color: DIM,
          textTransform: "uppercase",
          marginBottom: 48,
        }}
      >
        WORK EXPERIENCE
      </motion.div>

      {/* oversized headline */}
      <div style={{ lineHeight: 0.92 }}>
        <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: "105%" }}
            animate={visible ? { y: "0%" } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: SANS, fontWeight: 900,
              fontSize: "clamp(52px, 9vw, 120px)",
              color: BONE, textTransform: "uppercase",
              letterSpacing: "-0.06em",
            }}
          >
            SELECTED
          </motion.div>
        </div>
        <div style={{ overflow: "hidden", display: "flex", alignItems: "baseline", gap: "0.3em" }}>
          <motion.div
            initial={{ y: "105%" }}
            animate={visible ? { y: "0%" } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(30px, 4.5vw, 60px)",
              color: ASH, letterSpacing: "-0.02em",
            }}
          >
            work
          </motion.div>
          <motion.div
            initial={{ y: "105%" }}
            animate={visible ? { y: "0%" } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: MONO, fontSize: "11px",
              letterSpacing: "0.12em", color: DIM,
              textTransform: "uppercase",
              paddingBottom: "0.5em",
            }}
          >
            — 3 DELIVERABLES
          </motion.div>
        </div>
      </div>

      {/* company context bar with logo */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          marginTop: 48,
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <Logo47B size={24} />
        <span style={{
          fontFamily: SANS, fontWeight: 700,
          fontSize: "14px", letterSpacing: "0.04em",
          color: BONE, textTransform: "uppercase",
        }}>
          47BILLION
        </span>

        <span style={{ width: 24, height: 1, background: IRON, display: "inline-block" }} />

        <span style={{
          fontFamily: MONO, fontSize: "11px",
          letterSpacing: "0.12em", color: DIM,
          textTransform: "uppercase",
        }}>
          SDE INTERN
        </span>

        <span style={{ width: 24, height: 1, background: IRON, display: "inline-block" }} />

        <span style={{
          fontFamily: MONO, fontSize: "11px",
          letterSpacing: "0.12em", color: DIM,
          textTransform: "uppercase",
        }}>
          APR – JUN 2025
        </span>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.7 }}
        style={{
          marginTop: 56,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{
          fontFamily: MONO, fontSize: "9px",
          letterSpacing: "0.25em", color: IRON,
          textTransform: "uppercase",
        }}>
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1, height: 32,
            background: `linear-gradient(to bottom, ${IRON}, transparent)`,
          }}
        />
      </motion.div>
    </div>
  );
}

// ─── Sticky Scroll Card ──────────────────────────────────────────────────────

function StickyCard({ project, index, progress, total }) {
  // Scale: earlier cards scale down as you scroll past them
  const targetScale = 1 - (total - index - 1) * 0.04;
  const rangeStart = index / total;
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);

  // Opacity: earlier cards dim as they recede
  const targetOpacity = index === total - 1 ? 1 : 0.65;
  const opacity = useTransform(progress, [rangeStart, 1], [1, targetOpacity]);

  // Stacking offset — each card sits 28px lower
  const stickyTop = 80 + index * 28;

  // Content entrance animations
  const [cardRef, entered] = useInView(0.2);

  return (
    <div
      style={{
        position: "sticky",
        top: stickyTop,
        height: "auto",
        minHeight: "75vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 12,
        paddingBottom: 40,
        zIndex: index + 1,
      }}
    >
      <motion.div
        ref={cardRef}
        style={{
          scale,
          opacity,
          width: "100%",
          maxWidth: 960,
          background: PLATE,
          border: project.featured
            ? `1px solid ${ARTERIAL}`
            : `1px solid var(--color-graphite)`,
          borderRadius: 10,
          padding: "clamp(32px, 4vw, 56px)",
          boxSizing: "border-box",
          transformOrigin: "top center",
          // SVZ inset highlight
          boxShadow: "rgba(255, 255, 255, 0.03) 0px 2px 8px 0px inset, 0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* ─── Card header row ─────────────────────────────────── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 16,
        }}>
          {/* Project number — large mono */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={entered ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: MONO, fontWeight: 700,
              fontSize: "clamp(36px, 4vw, 56px)",
              color: project.featured ? ARTERIAL : GRAPHITE,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {project.num}
          </motion.div>

          {/* Tech stack pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              justifyContent: "flex-end",
              maxWidth: 400,
            }}
          >
            {project.stack.map((tech, i) => (
              <span
                key={tech}
                style={{
                  fontFamily: MONO, fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: DIM,
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  border: `1px solid var(--color-graphite)`,
                  borderRadius: 4,
                  lineHeight: 1,
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ─── Project name ────────────────────────────────────── */}
        <div style={{ overflow: "hidden", marginBottom: 4 }}>
          <motion.div
            initial={{ y: "110%" }}
            animate={entered ? { y: "0%" } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: SANS, fontWeight: 900,
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.05em",
              color: BONE,
              textTransform: "uppercase",
              lineHeight: 1.0,
            }}
          >
            {project.name}
          </motion.div>
        </div>

        {/* ─── Serif italic descriptor ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(16px, 2vw, 24px)",
            letterSpacing: "-0.01em",
            color: ASH,
            marginBottom: 28,
          }}
        >
          {project.serif}
        </motion.div>

        {/* ─── Hairline separator ───────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={entered ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 1,
            background: project.featured ? `${ARTERIAL}22` : "var(--color-graphite)",
            transformOrigin: "left",
            marginBottom: 24,
          }}
        />

        {/* ─── Body text ───────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: SANS, fontWeight: 400,
            fontSize: "14px", lineHeight: 1.7,
            letterSpacing: "-0.01em",
            color: ASH,
            margin: 0,
            maxWidth: 640,
          }}
        >
          {project.body}
        </motion.p>

        {/* ─── Impact metric ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Accent dot */}
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: project.featured ? ARTERIAL : "var(--color-graphite)",
            display: "inline-block",
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: MONO, fontSize: "11px",
            letterSpacing: "0.08em",
            color: project.featured ? BONE : ASH,
            textTransform: "uppercase",
            fontWeight: 600,
          }}>
            {project.impact}
          </span>
        </motion.div>

        {/* ─── Card footer ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.55 }}
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: `1px solid ${project.featured ? `${ARTERIAL}18` : "var(--color-graphite)"}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{
            fontFamily: MONO, fontSize: "10px",
            letterSpacing: "0.15em", color: DIM,
            textTransform: "uppercase",
          }}>
            {project.featured ? "★ FEATURED" : `DELIVERABLE ${project.num}`}
          </span>

          {/* Ghost CTA with ↗ arrow */}
          <span style={{
            fontFamily: SANS, fontWeight: 400,
            fontSize: "12px", letterSpacing: "0.07em",
            color: BONE, textTransform: "uppercase",
            cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            EXPLORE
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Sticky Scroll Card Stack Container ──────────────────────────────────────

function WorkCards() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        paddingLeft: "clamp(36px, 6vw, 80px)",
        paddingRight: "clamp(36px, 6vw, 80px)",
        // Scroll space: each card gets ~100vh of scroll room
        paddingBottom: `${PROJECTS.length * 10}vh`,
      }}
    >
      {PROJECTS.map((project, i) => (
        <StickyCard
          key={project.num}
          project={project}
          index={i}
          progress={scrollYProgress}
          total={PROJECTS.length}
        />
      ))}
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function Work() {
  return (
    <section id="work" style={{ background: VOID }}>
      <WorkTitle />
      <WorkCards />
    </section>
  );
}
