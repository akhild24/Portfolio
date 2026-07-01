import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";

/* ── Palette ─────────────────────────────────────────────────────────────────── */
const VOID     = "var(--color-void)";
const BONE     = "var(--color-bone)";
const IRON     = "var(--color-iron)";
const GRAPHITE = "var(--color-graphite)";
const DIM      = "var(--color-dim)";
const MONO     = "var(--font-mono)";
const SANS     = "var(--font-sans)";
const ARTERIAL = "#fe1e34";

const INTERVAL = 3000; // ms per card

/* ── Project data ────────────────────────────────────────────────────────────── */
export const projects = [
  {
    index: "01",
    tag: "MAIN PROJECT",
    categories: ["MLOPS", "EKS", "TERRAFORM", "OBSERVABILITY"],
    title: "MLOPS\nSERVING\nPLATFORM",
    description:
      "Served HuggingFace sentence-transformer via FastAPI with Docker multi-stage builds — cut image size by 60%. Deployed across 2 auto-scaling pods on EKS with ALB ingress and HPA. Terraform IaC (dev/prod workspaces) provisioning EKS cluster, VPC, and ALB from scratch. Jenkins CI/CD on EC2 with full observability via Prometheus, Grafana, Loki, and Alertmanager.",
    stack: ["HuggingFace", "FastAPI", "Docker", "EKS", "Helm", "Terraform", "Jenkins", "Prometheus", "Grafana", "Loki"],
    metrics: [
      { val: "60%",  label: "Image Size Cut" },
      { val: "2",    label: "Auto-Scaling Pods" },
      { val: "0",    label: "Idle AWS Spend" },
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
      { val: "7",   label: "AI Action Buttons" },
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
      { val: "3",  label: "RBAC Tiers" },
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
      { val: "50+",   label: "Vulnerabilities" },
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
      { val: "24h",    label: "Build Time" },
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
      { val: "0",   label: "Idle Spend" },
    ],
    status: "DEPLOYED",
    link: "https://github.com/akhild24",
  },
];

const CARD_COUNT = projects.length;

/* ═══════════════════════════════════════════════════════════════════════════════
   Projects — orchestration only, no card markup here
   ═══════════════════════════════════════════════════════════════════════════════ */
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

  // RAF-driven progress bar + auto-advance
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

  // Keyboard nav
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
      {/* ── Section header ─────────────────────────────────────────────────── */}
      <div style={{
        padding: "80px clamp(24px, 6vw, 80px) 32px",
        borderBottom: `1px solid ${GRAPHITE}`,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexShrink: 0,
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
            fontSize: "clamp(48px, 8vw, 110px)",
            color: BONE,
            letterSpacing: "-0.06em",
            lineHeight: 0.95,
            margin: 0,
          }}>
            PRO
            <span style={{
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "2px rgba(252,252,252,0.18)",
            }}>JECTS</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px" }}>
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

          {/* PREV / NEXT */}
          <div style={{ display: "flex", gap: "8px" }}>
            {[["PREV", prev], ["NEXT", next]].map(([label, fn]) => (
              <button
                key={label}
                onClick={fn}
                style={{
                  fontFamily: MONO,
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  color: BONE,
                  background: "transparent",
                  border: `1px solid ${GRAPHITE}`,
                  padding: "8px 16px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = ARTERIAL; e.currentTarget.style.color = ARTERIAL; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = GRAPHITE; e.currentTarget.style.color = BONE; }}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Progress bar ───────────────────────────────────────────────────── */}
      <div style={{ height: "1px", background: GRAPHITE, position: "relative", flexShrink: 0 }}>
        <div style={{
          position: "absolute",
          left: 0, top: 0, height: "1px",
          width: `${progress * 100}%`,
          background: ARTERIAL,
        }} />
      </div>

      {/* ── Card stage ─────────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "32px clamp(24px, 6vw, 80px) 40px",
      }}>
        <AnimatePresence mode="wait" custom={direction}>
          <ProjectCard
            key={activeIndex}
            project={projects[activeIndex]}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
      <div style={{
        padding: "0 clamp(24px, 6vw, 80px) 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        {/* Dot indicators */}
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

        {/* Counter */}
        <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", color: DIM }}>
          <span style={{ color: BONE, fontWeight: 700 }}>{String(activeIndex + 1).padStart(2, "0")}</span>
          {" / "}
          <span>{String(CARD_COUNT).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}