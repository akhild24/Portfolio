import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { VOID, BONE, IRON, GRAPHITE, DIM, ASH, MONO, SANS, SERIF, ARTERIAL } from "../theme";

const INTERVAL = 30000;

/* ── Project data ────────────────────────────────────────────────────────────── */
const projects = [
  {
    index: "01",
    year: "2025.Q2",
    tag: "MAIN PROJECT",
    connective: "engineered for production",
    categories: ["MLOPS", "EKS", "TERRAFORM", "OBSERVABILITY"],
    title: "MLOPS\nSERVING\nPLATFORM",
    shortTitle: "MLOPS SERVING PLATFORM",
    description:
      "Serves all-MiniLM-L6-v2 sentence-transformer via FastAPI — multi-stage Docker build bakes model weights into the image, eliminating runtime downloads. HPA scales 2–5 pods on CPU > 70% / Mem > 80%. Terraform IaC across dev/prod workspaces provisions VPC, EKS, NAT GW, and ALB from scratch. Jenkins CI/CD on EC2. Full observability: Prometheus p95 latency alerts, Grafana dashboards, Loki log aggregation, Alertmanager.",
    stack: ["HuggingFace", "FastAPI", "Docker", "EKS", "Helm", "Terraform", "Jenkins", "Prometheus", "Grafana", "Loki"],
    metrics: [
      { val: "2–5",  label: "HPA Pod Range" },
      { val: "3",    label: "Alert Rules" },
    ],
    status: "DEPLOYED",
    link: "https://github.com/akhild24/model-deployment",
  },
  {
    index: "02",
    year: "2026.Q1",
    tag: "HACKATHON · UDBHAV'26",
    connective: "shipped in 24 hours",
    categories: ["FULLSTACK", "DEVOPS", "BACKEND", "DEPLOYMENT"],
    title: "UDAAN",
    shortTitle: "UDAAN",
    description:
      "Top 10 nationally at Udbhav'26 — 24-hour hackathon, 275+ teams. Led backend integration, Git workflow, and full deployment pipeline under time constraints. Production-grade infra delivered under hackathon conditions.",
    stack: ["React", "FastAPI", "Gemini API integration", "Docker", "AWS", "MongoDB", "Git"],
    metrics: [
      { val: "Top 10", label: "of 275 Teams" },
      { val: "24h",    label: "Build Time" },
    ],
    status: "COMPLETED",
    link: "https://github.com/akhild24/Argus_Ai",
  },
  {
    index: "03",
    year: "2025.Q1",
    tag: "CLOUD · AWS EKS",
    connective: "async, event-driven architecture",
    categories: ["MICROSERVICES", "KUBERNETES", "RABBITMQ", "HELM"],
    title: "MICRO\nSERVICES\nARCH",
    shortTitle: "MICROSERVICES ARCH",
    description:
      "Python microservices on AWS EKS — users authenticate via JWT, upload a video, which is queued through RabbitMQ and processed asynchronously by a converter service. MongoDB and PostgreSQL provisioned via Helm. Covers Kubernetes networking, IAM roles, stateful service management, and end-to-end async communication.",
    stack: ["Python", "Docker", "Kubernetes", "Helm", "EKS", "RabbitMQ", "MongoDB", "PostgreSQL", "JWT"],
    metrics: [
      { val: "4",     label: "Microservices" },
      { val: "Async", label: "RabbitMQ Queue" },
    ],
    status: "COMPLETED",
    link: "https://github.com/akhild24",
  },
  {
    index: "04",
    year: "2025.Q2",
    tag: "SECURITY · 47BILLION",
    connective: "grey-box, production target",
    categories: ["VAPT", "OWASP TOP 10", "GREY-BOX", "PENTEST"],
    title: "VAPT\nENGAGEMENT",
    shortTitle: "VAPT ENGAGEMENT",
    description:
      "Grey-box penetration testing on a live production platform — identified 50+ critical vulnerabilities including auth bypasses, broken RBAC, and input validation gaps. Delivered structured bug report adopted by the engineering team for patch prioritization. Methodology based on OWASP Top 10.",
    stack: ["Postman", "OWASP", "Python", "RBAC Analysis", "Manual Testing"],
    metrics: [
      { val: "50+",   label: "Vulnerabilities" },
      { val: "OWASP", label: "Methodology" },
    ],
    status: "COMPLETED",
    link: null,
  },
  {
    index: "05",
    year: "2025.Q2",
    tag: "INTERNSHIP · 47BILLION",
    connective: "built for compliance automation",
    categories: ["RAG", "LLM", "GEMINI API", "SSE"],
    title: "BRSR AI\nASSISTANT",
    shortTitle: "BRSR AI ASSISTANT",
    description:
      "RAG-based AI chatbot using Gemini APIs with 7 AI action buttons — explain, summarize, refine, compliance check, recommend, compare with best practices. Configurable tone controls via streaming SSE. Significantly reduced manual query handling for form-heavy compliance workflows.",
    stack: ["Python", "FastAPI", "Gemini API", "SSE", "MongoDB", "React"],
    metrics: [
      { val: "7",   label: "AI Action Buttons" },
      { val: "SSE", label: "Streaming Output" },
    ],
    status: "DEPLOYED",
    link: "https://github.com/akhild24/finalai",
  },
  {
    index: "06",
    year: "2025.Q2",
    tag: "INTERNSHIP · 47BILLION",
    connective: "engineered at scale",
    categories: ["REACT", "FASTAPI", "RBAC", "MONGODB"],
    title: "COE\nPLATFORM",
    shortTitle: "COE PLATFORM",
    description:
      "Production RBAC event management platform serving admin, faculty, and student roles — eliminated unstructured manual query handling for form-heavy workflows. JWT/OAuth2 auth, real-time notifications, blog publishing, and full event lifecycle management.",
    stack: ["React", "Redux", "FastAPI", "MongoDB", "JWT", "OAuth2", "Tailwind"],
    metrics: [
      { val: "3",  label: "RBAC Tiers" },
      { val: "5+", label: "Core Modules" },
    ],
    status: "DEPLOYED",
    link: "https://github.com/sujaldef/centerofexcellence",
  },
];

const CARD_COUNT = projects.length;

/* ── Sidebar index item ──────────────────────────────────────────────────────── */
function IndexItem({ project, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  const active = isActive || hovered;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        background: "transparent",
        border: "none",
        padding: "14px 0",
        cursor: "pointer",
        borderTop: `1px solid ${isActive ? ARTERIAL : GRAPHITE}`,
        textAlign: "left",
        width: "100%",
        transition: "border-color 0.2s",
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: MONO,
        fontSize: "9px",
        color: isActive ? ARTERIAL : IRON,
        letterSpacing: "0.14em",
        lineHeight: 1,
        paddingTop: "2px",
        flexShrink: 0,
        transition: "color 0.2s",
      }}>{project.index}</span>

      {/* Title */}
      <span style={{
        fontFamily: MONO,
        fontSize: "9px",
        color: isActive ? BONE : (hovered ? ASH : DIM),
        letterSpacing: "0.08em",
        lineHeight: 1.5,
        textTransform: "uppercase",
        transition: "color 0.2s",
      }}>{project.shortTitle}</span>

      {/* Active red bar on right */}
      {isActive && (
        <div style={{
          marginLeft: "auto",
          width: "2px",
          height: "100%",
          minHeight: "14px",
          background: ARTERIAL,
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
      )}
    </button>
  );
}

/* ── Mobile dot selector ─────────────────────────────────────────────────────── */
function MobileProjectSelector({ activeIndex, goTo, projects: projs }) {
  return (
    <div style={{
      display: "flex",
      gap: "6px",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px 16px",
      borderBottom: `1px solid ${GRAPHITE}`,
      overflowX: "auto",
      flexWrap: "wrap",
    }}>
      {projs.map((p, i) => (
        <button
          key={p.index}
          onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
          style={{
            fontFamily: MONO,
            fontSize: "8px",
            letterSpacing: "0.08em",
            color: i === activeIndex ? BONE : DIM,
            background: i === activeIndex ? ARTERIAL + "20" : "transparent",
            border: `1px solid ${i === activeIndex ? ARTERIAL : GRAPHITE}`,
            padding: "6px 10px",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {p.index}
        </button>
      ))}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────────────── */
export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection]     = useState(1);
  const [paused, setPaused]           = useState(false);
  const [progress, setProgress]       = useState(0);
  const startRef = useRef(null);
  const frameRef = useRef(null);

  const goTo = useCallback((idx, dir) => {
    setDirection(dir);
    setActiveIndex(idx);
    setProgress(0);
    startRef.current = performance.now();
  }, []);

  const next = useCallback(() => goTo((activeIndex + 1) % CARD_COUNT, 1),  [activeIndex, goTo]);
  const prev = useCallback(() => goTo((activeIndex - 1 + CARD_COUNT) % CARD_COUNT, -1), [activeIndex, goTo]);

  useEffect(() => {
    if (paused) { cancelAnimationFrame(frameRef.current); return; }
    startRef.current = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startRef.current) / INTERVAL, 1);
      setProgress(p);
      if (p < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDirection(1);
        setActiveIndex((i) => (i + 1) % CARD_COUNT);
        setProgress(0);
        startRef.current = performance.now();
        frameRef.current = requestAnimationFrame(tick);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [paused, activeIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section
      id="projects"
      style={{
        background: VOID,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Section header ─────────────────────────────────────────────── */}
      <div style={{
        padding: "80px clamp(16px, 6vw, 80px) 24px",
        borderBottom: `1px solid ${GRAPHITE}`,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexShrink: 0,
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{
            fontFamily: MONO,
            fontSize: "10px",
            color: IRON,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>/ PROJECTS &amp; SKILLS</span>
          <h2 style={{
            fontFamily: SANS,
            fontWeight: 900,
            fontSize: "clamp(42px, 13vw, 195px)",
            color: BONE,
            letterSpacing: "-0.06em",
            lineHeight: 0.9,
            margin: 0,
            paddingRight: "0.08em",
          }}>
            PRO
            <span style={{
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: `1.5px ${BONE}`,
            }}>JECTS</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
          <div style={{
            fontFamily: MONO,
            fontSize: "10px",
            color: IRON,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textAlign: "right",
            lineHeight: 2,
          }}>
            <div>6 PROJECTS</div>
            <div>2025 — 2026</div>
            <div style={{ color: ARTERIAL }}>SELECTED WORK</div>
          </div>

          {/* Counter */}
          <div style={{ fontFamily: MONO, fontSize: "13px", letterSpacing: "0.15em", color: DIM }}>
            <span style={{ color: BONE, fontWeight: 700 }}>{String(activeIndex + 1).padStart(2, "0")}</span>
            {" / "}
            <span>{String(CARD_COUNT).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* ── Progress bar ───────────────────────────────────────────────── */}
      <div style={{ height: "1px", background: GRAPHITE, position: "relative", flexShrink: 0 }}>
        <div style={{
          position: "absolute",
          left: 0, top: 0, height: "1px",
          width: `${progress * 100}%`,
          background: ARTERIAL,
          transition: "width 0.1s linear",
        }} />
      </div>

      {/* ── Mobile project selector (visible on small screens) ─────────── */}
      <div className="block md:hidden">
        <MobileProjectSelector activeIndex={activeIndex} goTo={goTo} projects={projects} />
      </div>

      {/* ── Body: sidebar + card ───────────────────────────────────────── */}
      <div className="projects-body">

        {/* ── Left sidebar index — hidden on mobile ───────────────────── */}
        <div className="projects-sidebar hidden md:flex" style={{
          borderRight: `1px solid ${GRAPHITE}`,
          padding: "24px clamp(12px, 2vw, 28px)",
          flexDirection: "column",
          justifyContent: "center",
          overflowY: "auto",
        }}>
          {/* Sidebar label */}
          <div style={{
            fontFamily: MONO,
            fontSize: "8px",
            color: IRON,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}>PROJECT INDEX</div>

          {projects.map((p, i) => (
            <IndexItem
              key={p.index}
              project={p}
              isActive={i === activeIndex}
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
            />
          ))}

          {/* Keyboard hint */}
          <div style={{
            marginTop: "20px",
            fontFamily: MONO,
            fontSize: "8px",
            color: IRON,
            letterSpacing: "0.12em",
            lineHeight: 2,
          }}>
            <div>← → KEYBOARD NAV</div>
          </div>
        </div>

        {/* ── Card stage ─────────────────────────────────────────────── */}
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: "16px clamp(12px, 4vw, 56px) 24px",
          overflow: "hidden",
          flex: 1,
        }}>
          <AnimatePresence mode="wait" custom={direction}>
            <ProjectCard
              key={activeIndex}
              project={projects[activeIndex]}
              direction={direction}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom dot bar ─────────────────────────────────────────────── */}
      <div style={{
        padding: "0 clamp(16px, 6vw, 80px) 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flexShrink: 0,
        borderTop: `1px solid ${GRAPHITE}`,
        paddingTop: "14px",
      }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
              style={{
                width: i === activeIndex ? "24px" : "6px",
                height: "2px",
                background: i === activeIndex ? ARTERIAL : GRAPHITE,
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}