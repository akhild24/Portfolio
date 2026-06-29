import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

/* ── Palette — referencing CSS vars from index.css @theme ──────────────────── */

const VOID     = "var(--color-void)";
const BONE     = "var(--color-bone)";
const ASH      = "var(--color-ash)";
const DIM      = "var(--color-dim)";
const IRON     = "var(--color-iron)";
const SMOKE    = "var(--color-smoke)";
const GRAPHITE = "var(--color-graphite)";
const PLATE    = "var(--color-plate)";
const SURFACE  = "var(--color-surface)";
const SIGNAL   = "var(--color-signal)";
const MONO     = "var(--font-mono)";
const SANS     = "var(--font-sans)";
const SERIF    = "var(--font-serif)";

const ARTERIAL = "#fe1e34";

/* ── Project data ──────────────────────────────────────────────────────────── */

const projects = [
  {
    index: "01",
    tag: "MAIN PROJECT",
    categories: ["MLOPS", "EKS", "TERRAFORM", "OBSERVABILITY"],
    title: "MLOPS\nSERVING\nPLATFORM",
    description:
      "Served HuggingFace sentence-transformer via FastAPI with Docker multi-stage builds — cut image size by 60%. Deployed across 2 auto-scaling pods on EKS with ALB ingress and HPA. Terraform IaC (dev/prod workspaces) provisioning EKS cluster, VPC, and ALB from scratch. Jenkins CI/CD on EC2 with full observability via Prometheus, Grafana, Loki, and Alertmanager.",
    stack: ["HuggingFace", "FastAPI", "Docker", "EKS", "Helm", "Terraform", "Jenkins", "Prometheus", "Grafana", "Loki"],
    metrics: [
      { val: "60%", label: "Image Size Cut" },
      { val: "2", label: "Auto-Scaling Pods" },
      { val: "0", label: "Idle AWS Spend" },
    ],
    status: "DEPLOYED",
    link: "https://github.com/akhild24",
  },
  {
    index: "02",
    tag: "INTERNSHIP · 47BILLION",
    categories: ["RAG", "LLM", "GEMINI API", "SSE"],
    title: "BRSR AI\nASSISTANT",
    description:
      "RAG-based AI chatbot using Gemini APIs with 7 AI action buttons — explain, summarize, refine, compliance check, recommend, compare with best practices. Configurable tone controls via streaming SSE. Significantly reduced manual query handling for form-heavy compliance workflows.",
    stack: ["Python", "FastAPI", "Gemini API", "SSE", "MongoDB", "React"],
    metrics: [
      { val: "7", label: "AI Action Buttons" },
      { val: "SSE", label: "Streaming Output" },
    ],
    status: "DEPLOYED",
    link: "https://github.com/akhild24/finalai",
  },
  {
    index: "03",
    tag: "INTERNSHIP · 47BILLION",
    categories: ["REACT", "FASTAPI", "RBAC", "MONGODB"],
    title: "COE\nPLATFORM",
    description:
      "Production RBAC event management platform serving admin, faculty, and student roles — eliminated unstructured manual query handling for form-heavy workflows. JWT/OAuth2 auth, real-time notifications, blog publishing, and full event lifecycle management.",
    stack: ["React", "Redux", "FastAPI", "MongoDB", "JWT", "OAuth2", "Tailwind"],
    metrics: [
      { val: "3", label: "RBAC Tiers" },
      { val: "5+", label: "Core Modules" },
    ],
    status: "DEPLOYED",
    link: "https://github.com/sujaldef/centerofexcellence",
  },
  {
    index: "04",
    tag: "SECURITY · 47BILLION",
    categories: ["VAPT", "OWASP TOP 10", "GREY-BOX", "PENTEST"],
    title: "VAPT\nENGAGEMENT",
    description:
      "Grey-box penetration testing on a live production platform — identified 50+ critical vulnerabilities including auth bypasses, broken RBAC, and input validation gaps. Delivered structured bug report adopted by the engineering team for patch prioritization. Methodology based on OWASP Top 10.",
    stack: ["Burp Suite", "OWASP", "Nmap", "Python", "RBAC Analysis"],
    metrics: [
      { val: "50+", label: "Vulnerabilities" },
      { val: "OWASP", label: "Methodology" },
    ],
    status: "COMPLETED",
    link: null,
  },
  {
    index: "05",
    tag: "HACKATHON · UDBHAV'26",
    categories: ["FULLSTACK", "DEVOPS", "BACKEND", "DEPLOYMENT"],
    title: "UDAAN",
    description:
      "Top 10 nationally at Udbhav'26 — 24-hour hackathon, 275+ teams. Led backend integration, Git workflow, and full deployment pipeline under time constraints. Production-grade infra delivered under hackathon conditions.",
    stack: ["React", "FastAPI", "Docker", "AWS", "PostgreSQL", "Git"],
    metrics: [
      { val: "Top 10", label: "of 275+ Teams" },
      { val: "24h", label: "Build Time" },
    ],
    status: "COMPLETED",
    link: null,
  },
  {
    index: "06",
    tag: "CLOUD · AWS EKS",
    categories: ["MICROSERVICES", "KUBERNETES", "HELM", "REST"],
    title: "MICRO\nSERVICES\nARCH",
    description:
      "Full microservices architecture on AWS — EKS cluster, VPC, node groups, and namespaces provisioned from scratch using Linux-based toolchain with no scaffolding. Helm charts for environment-aware deployments. Diagnosed pod eviction failures and multi-service networking issues. Cloud cost optimization with teardown automation — eliminated idle EKS spend.",
    stack: ["FastAPI", "Docker", "Kubernetes", "Helm", "EKS", "VPC", "PostgreSQL", "MongoDB"],
    metrics: [
      { val: "EKS", label: "Orchestration" },
      { val: "0", label: "Idle Spend" },
    ],
    status: "DEPLOYED",
    link: "https://github.com/akhild24",
  },
];

const CARD_COUNT = projects.length;
// Header gets ~12% of total scroll, the rest is split among cards
const HEADER_ZONE = 0.10;
const CARD_ZONE = (1 - HEADER_ZONE) / CARD_COUNT;

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN — Projects Section
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Track which card is active
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const cardProgress = Math.max(0, (v - HEADER_ZONE) / (1 - HEADER_ZONE));
    const idx = Math.min(Math.floor(cardProgress * CARD_COUNT), CARD_COUNT - 1);
    setActiveIndex(idx);
  });

  // Hooks for header animation — must be at component top level
  const headerOpacity = useTransform(scrollYProgress, [0, HEADER_ZONE], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, HEADER_ZONE], [0, -60]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        // Each card gets 100vh of scroll + 1.5vh for the header intro
        height: `${(CARD_COUNT + 1.5) * 100}vh`,
        position: "relative",
      }}
    >
      {/* Sticky viewport container */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        background: VOID,
      }}>

        {/* ── Section header — fades out as first card arrives ────────── */}
        <motion.div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            padding: "100px clamp(24px, 6vw, 80px) 48px",
            borderBottom: `1px solid ${GRAPHITE}`,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            zIndex: 5,
            background: VOID,
            opacity: headerOpacity,
            y: headerY,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{
              fontFamily: MONO,
              fontSize: "10px",
              color: IRON,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}>/ PROJECTS & SKILLS</span>
            <h2 style={{
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: "clamp(56px, 10vw, 130px)",
              color: BONE,
              letterSpacing: "-0.06em",
              lineHeight: 0.95,
              margin: 0,
            }}>
              PRO
              <span style={{
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "2px rgba(252,252,252,0.2)",
              }}>JECTS</span>
            </h2>
          </div>
          <div style={{
            fontFamily: MONO,
            fontSize: "10px",
            color: IRON,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textAlign: "right",
            lineHeight: 2,
            flexShrink: 0,
          }}>
            <div>6 PROJECTS</div>
            <div>2025 — 2026</div>
            <div style={{ color: ARTERIAL }}>SELECTED WORK</div>
          </div>
        </motion.div>

        {/* ── Progress indicator (right edge) ────────────────────────── */}
        <div style={{
          position: "absolute",
          right: "clamp(24px, 4vw, 48px)",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 20,
        }}>
          {projects.map((_, i) => (
            <div key={i} style={{
              width: i === activeIndex ? "20px" : "6px",
              height: "2px",
              background: i === activeIndex ? ARTERIAL : GRAPHITE,
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>

        {/* ── Card index counter (bottom-left) ───────────────────────── */}
        <div style={{
          position: "absolute",
          bottom: "28px",
          left: "clamp(24px, 6vw, 80px)",
          zIndex: 20,
          fontFamily: MONO,
          fontSize: "11px",
          letterSpacing: "0.15em",
          color: DIM,
        }}>
          <span style={{ color: BONE, fontWeight: 700 }}>
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          {" "}/{" "}
          <span>{String(CARD_COUNT).padStart(2, "0")}</span>
        </div>

        {/* ── Cards — each slides in/out driven by scroll ────────────── */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.index}
              project={project}
              cardIndex={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PROJECT CARD — scroll-driven slide animation
   ═══════════════════════════════════════════════════════════════════════════════ */

function ProjectCard({ project, cardIndex, scrollYProgress }) {
  // Each card's scroll range
  const cardStart = HEADER_ZONE + cardIndex * CARD_ZONE;
  const cardMid   = cardStart + CARD_ZONE * 0.15;          // entrance done
  const cardHold  = cardStart + CARD_ZONE * 0.80;          // start exit
  const cardEnd   = cardStart + CARD_ZONE;

  // Slide in from right → hold → slide out left
  const x = useTransform(
    scrollYProgress,
    [cardStart, cardMid, cardHold, cardEnd],
    ["100%",    "0%",    "0%",     "-100%"]
  );

  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardMid, cardHold, cardEnd],
    [0,         1,       1,        0]
  );

  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardMid, cardHold, cardEnd],
    [0.92,      1,       1,        0.96]
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        x,
        opacity,
        scale,
        padding: "0 clamp(24px, 6vw, 80px)",
        display: "flex",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <div style={{
        width: "100%",
        background: SURFACE,
        border: `1px solid ${GRAPHITE}`,
        borderTop: `2px solid ${ARTERIAL}`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "72vh",
        maxHeight: "80vh",
        overflow: "hidden",
        position: "relative",
        pointerEvents: "auto",
      }}>

        {/* ── LEFT — content ──────────────────────────────────────────── */}
        <div style={{
          padding: "44px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: `1px solid ${GRAPHITE}`,
          overflowY: "auto",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Tag + counter */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: MONO,
              fontSize: "10px",
              color: IRON,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}>
              <span>/ {project.tag}</span>
              <span style={{ color: GRAPHITE }}>{project.index} / {String(CARD_COUNT).padStart(2, "0")}</span>
            </div>

            {/* Categories */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {project.categories.map((cat) => (
                <span key={cat} style={{
                  fontFamily: MONO,
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: DIM,
                  border: `1px solid ${GRAPHITE}`,
                  padding: "3px 8px",
                  textTransform: "uppercase",
                }}>{cat}</span>
              ))}
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: "clamp(32px, 4vw, 56px)",
              color: BONE,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              margin: 0,
              whiteSpace: "pre-line",
            }}>{project.title}</h3>

            {/* Serif connective */}
            <span style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "16px",
              color: ASH,
              letterSpacing: "-0.01em",
            }}>delivered</span>

            {/* Description */}
            <p style={{
              fontFamily: MONO,
              fontSize: "11px",
              color: DIM,
              lineHeight: 1.8,
              margin: 0,
            }}>{project.description}</p>
          </div>

          {/* ── Bottom block ──────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "32px" }}>

            {/* Metrics */}
            <div style={{
              display: "flex",
              gap: "28px",
              paddingBottom: "16px",
              borderBottom: `1px solid ${PLATE}`,
            }}>
              {project.metrics.map((m) => (
                <div key={m.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{
                    fontFamily: SANS,
                    fontWeight: 900,
                    fontSize: "22px",
                    color: BONE,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}>{m.val}</span>
                  <span style={{
                    fontFamily: MONO,
                    fontSize: "9px",
                    color: IRON,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}>{m.label}</span>
                </div>
              ))}
            </div>

            {/* Stack pills */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {project.stack.map((s) => (
                <span key={s} style={{
                  fontFamily: MONO,
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: IRON,
                  border: `1px solid ${SMOKE}`,
                  padding: "3px 8px",
                  background: PLATE,
                  textTransform: "uppercase",
                }}>{s}</span>
              ))}
            </div>

            {/* Status + link */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: SIGNAL,
                }} />
                <span style={{
                  fontFamily: MONO,
                  fontSize: "9px",
                  color: SIGNAL,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}>{project.status}</span>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: MONO,
                    fontSize: "10px",
                    color: ARTERIAL,
                    textDecoration: "none",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    borderBottom: `1px solid ${ARTERIAL}`,
                    paddingBottom: "2px",
                    cursor: "pointer",
                  }}
                >VIEW SOURCE ↗</a>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT — decorative panel ─────────────────────────────── */}
        <div style={{
          position: "relative",
          background: "#0d0d12",
          overflow: "hidden",
        }}>
          {/* Dot grid bg */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id={`dots-${project.index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill={PLATE} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#dots-${project.index})`} />
          </svg>

          {/* Giant index number — bleeds bottom right */}
          <span style={{
            position: "absolute",
            bottom: "-0.15em",
            right: "-0.05em",
            fontFamily: SANS,
            fontWeight: 900,
            fontSize: "clamp(180px, 28vw, 340px)",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: `1px ${PLATE}`,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            userSelect: "none",
            zIndex: 1,
          }}>{project.index}</span>

          {/* Ghost title overlay */}
          <div style={{
            position: "absolute",
            bottom: "32px",
            left: "28px",
            fontFamily: SANS,
            fontWeight: 900,
            fontSize: "clamp(28px, 4vw, 52px)",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "1px rgba(252,252,252,0.10)",
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
            whiteSpace: "pre-line",
            zIndex: 2,
          }}>{project.title}</div>

          {/* Top label */}
          <div style={{
            position: "absolute",
            top: "20px",
            left: "24px",
            fontFamily: MONO,
            fontSize: "9px",
            color: GRAPHITE,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            zIndex: 3,
          }}>/ DSGN {project.index}</div>

          {/* Arterial red accent line */}
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "1px",
            height: "40%",
            background: `linear-gradient(to bottom, ${ARTERIAL}, transparent)`,
            zIndex: 3,
          }} />
        </div>
      </div>
    </motion.div>
  );
}