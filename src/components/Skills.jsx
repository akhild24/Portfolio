import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * No setup required. Icons are loaded as SVG files directly from the
 * devicon CDN — no npm install, no font import, no CSS class guessing.
 * Every URL below was HTTP-verified (200) before being used.
 */

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const icon = (name, variant = "original") => `${DEVICON_BASE}/${name}/${name}-${variant}.svg`;

// ── SKILL ICON ─────────────────────────────────────────────────────────────────

const SkillIcon = ({ src, label, invert = false }) => {
  const [hovered, setHovered] = useState(false);
  const [errored, setErrored] = useState(false);

  // Text-only pill: tools with no devicon, or if an image genuinely fails to load
  if (!src || errored) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 16px",
          height: "80px",
          minWidth: "90px",
          border: "1px solid #262530",
          background: "#0d0d12",
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "9px",
            letterSpacing: "0.1em",
            color: "#525260",
            textAlign: "center",
            lineHeight: 1.5,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        width: "90px",
        height: "80px",
        border: "1px solid #262530",
        background: hovered ? "#1c1c22" : "#141419",
        cursor: "default",
        transition: "background 0.15s",
        flexShrink: 0,
      }}
    >
      <motion.img
        src={src}
        alt={label}
        onError={() => setErrored(true)}
        animate={{ scale: hovered ? 1.2 : 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          width: "30px",
          height: "30px",
          objectFit: "contain",
          filter: invert ? "invert(1)" : "none",
          display: "block",
        }}
      />
      <motion.span
        animate={{ opacity: hovered ? 1 : 0.55 }}
        transition={{ duration: 0.15 }}
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "8px",
          letterSpacing: "0.1em",
          color: "#d4d2d2",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

// ── DOMAIN DATA ────────────────────────────────────────────────────────────────
// invert: true forces near-black brand logos (GitHub, Linux, Bash) to render
// white so they're visible against the dark card background.

const domains = [
  {
    id: "01",
    label: "CLOUD & DEVOPS",
    accent: "#00e38f",
    skills: [
      { src: icon("amazonwebservices", "original-wordmark"), label: "AWS" },
      { src: icon("docker"), label: "Docker" },
      { src: icon("kubernetes"), label: "Kubernetes" },
      { src: icon("terraform"), label: "Terraform" },
      { src: icon("jenkins"), label: "Jenkins" },
      { src: icon("github"), label: "GH Actions", invert: true },
      { src: icon("nginx"), label: "Nginx" },
      { src: icon("linux"), label: "Linux", invert: true },
      { src: null, label: "Helm" },
      { src: null, label: "CI / CD" },
      { src: null, label: "High\nAvailability" },
    ],
  },
  {
    id: "02",
    label: "LANGUAGES",
    accent: "#d4d2d2",
    skills: [
      { src: icon("python"), label: "Python" },
      { src: icon("javascript"), label: "JavaScript" },
      { src: icon("bash"), label: "Bash / Shell", invert: true },
      { src: icon("cplusplus"), label: "C++" },
      { src: icon("html5"), label: "HTML5" },
      { src: icon("css3"), label: "CSS3" },
    ],
  },
  {
    id: "03",
    label: "FRAMEWORKS & LIBRARIES",
    accent: "#00e38f",
    skills: [
      { src: icon("react"), label: "React" },
      { src: icon("fastapi"), label: "FastAPI" },
      { src: icon("tailwindcss"), label: "Tailwind" },
      { src: icon("redux"), label: "Redux Toolkit" },
      { src: null, label: "JWT / OAuth2" },
      { src: null, label: "REST APIs" },
    ],
  },
  {
    id: "04",
    label: "DATABASES & TOOLS",
    accent: "#d4d2d2",
    skills: [
      { src: icon("postgresql"), label: "PostgreSQL" },
      { src: icon("mongodb"), label: "MongoDB" },
      { src: icon("git"), label: "Git" },
      { src: icon("postman"), label: "Postman" },
      { src: null, label: "Version\nControl" },
      { src: null, label: "Agile" },
    ],
  },
  {
    id: "05",
    label: "OBSERVABILITY & SECURITY",
    accent: "#fe1e34",
    skills: [
      { src: icon("prometheus"), label: "Prometheus" },
      { src: icon("grafana"), label: "Grafana" },
      { src: null, label: "Loki" },
      { src: null, label: "Alertmanager" },
      { src: null, label: "OpenTelemetry" },
      { src: null, label: "VAPT" },
      { src: null, label: "OWASP Top 10" },
      { src: null, label: "Pen Testing" },
    ],
  },
];

// ── DOMAIN ROW ─────────────────────────────────────────────────────────────────

const DomainRow = ({ domain, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        borderBottom: "1px solid #1c1c22",
      }}
    >
      {/* left — label column */}
      <div
        style={{
          padding: "28px 24px",
          borderRight: "1px solid #1c1c22",
          background: "#0a0a0e",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "#393945",
          }}
        >
          {domain.id}
        </span>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: domain.accent,
              flexShrink: 0,
              marginTop: "3px",
            }}
          />
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "#d4d2d2",
              lineHeight: 1.6,
              textTransform: "uppercase",
            }}
          >
            {domain.label}
          </span>
        </div>

        <div
          style={{
            width: "20px",
            height: "1px",
            background: domain.accent,
            opacity: 0.7,
            marginTop: "4px",
          }}
        />
      </div>

      {/* right — icon grid */}
      <div
        style={{
          background: "#141419",
          padding: "16px 20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          alignContent: "center",
        }}
      >
        {domain.skills.map((skill) => (
          <SkillIcon key={skill.label} src={skill.src} label={skill.label} invert={skill.invert} />
        ))}
      </div>
    </motion.div>
  );
};

// ── SECTION ────────────────────────────────────────────────────────────────────

export default function Skills() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="skills"
      style={{ background: "#080808", paddingBottom: "120px" }}
    >
      {/* linen header */}
      <div
        style={{
          background: "#f3efef",
          padding: "48px clamp(24px, 6vw, 100px) 40px",
          borderBottom: "1px solid #d4d2d2",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <motion.div
          ref={titleRef}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={titleInView ? { clipPath: "inset(0 0 0% 0)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(40px, 6vw, 80px)",
              letterSpacing: "-0.04em",
              color: "#080808",
              lineHeight: 1,
              margin: 0,
            }}
          >
            SKILLS
          </h2>
          <p
            style={{
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
              fontSize: "clamp(14px, 2vw, 20px)",
              color: "#525260",
              margin: "8px 0 0",
            }}
          >
            tools I build with
          </p>
        </motion.div>

        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "10px",
            color: "#525260",
            letterSpacing: "0.15em",
            textAlign: "right",
            lineHeight: 2.2,
          }}
        >
          <div>5 DOMAINS</div>
          <div style={{ color: "#080808", fontWeight: 700 }}>30+ TOOLS</div>
        </div>
      </div>

      {/* domain rows */}
      <div
        style={{
          background: "#080808",
          padding: "56px clamp(24px, 6vw, 100px) 0",
        }}
      >
        <div
          style={{
            border: "1px solid #1c1c22",
            overflow: "hidden",
          }}
        >
          {domains.map((domain, i) => (
            <DomainRow key={domain.id} domain={domain} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}