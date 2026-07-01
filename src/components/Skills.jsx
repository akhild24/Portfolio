import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Infinity as InfinityIcon,
  Server,
  KeyRound,
  Webhook,
  GitFork,
  Kanban,
  Flame,
  BellRing,
  ShieldAlert,
  Shield,
  Terminal,
} from "lucide-react";

const lucideIcons = {
  Infinity: InfinityIcon,
  Server: Server,
  KeyRound: KeyRound,
  Webhook: Webhook,
  GitFork: GitFork,
  Kanban: Kanban,
  Flame: Flame,
  BellRing: BellRing,
  ShieldAlert: ShieldAlert,
  Shield: Shield,
  Terminal: Terminal,
};

// ── DESIGN SYSTEM VARIABLES ───────────────────────────────────────────────────
const VOID = "var(--color-void)";
const SURFACE = "var(--color-surface)";
const PLATE = "var(--color-plate)";
const SMOKE = "var(--color-smoke)";
const GRAPHITE = "var(--color-graphite)";
const LINEN = "var(--color-linen)";
const BONE = "var(--color-bone)";
const ASH = "var(--color-ash)";
const DIM = "var(--color-dim)";
const IRON = "var(--color-iron)";
const INK = "var(--color-ink)";
const SIGNAL = "var(--color-signal)";
const ARTERIAL = "#fe1e34";

// ── SKILL ICON COMPONENT ──────────────────────────────────────────────────────
const SkillIcon = ({ label, iconClass, lucide, accent }) => {
  const [hovered, setHovered] = useState(false);
  const LucideIcon = lucide ? lucideIcons[lucide] : null;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        backgroundColor: PLATE,
        borderColor: accent,
        boxShadow: `0 0 16px -4px color-mix(in srgb, ${accent} 25%, transparent)`,
        y: -3,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        height: "88px",
        border: `1px solid ${SMOKE}`,
        background: SURFACE,
        cursor: "default",
        borderRadius: "var(--radius-sm)",
      }}
    >
      {iconClass ? (
        <motion.i
          className={`${iconClass} text-3xl`}
          animate={{ scale: hovered ? 1.15 : 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            color: hovered ? accent : ASH,
            transition: "color 0.2s ease",
            display: "block",
            lineHeight: 1,
          }}
        />
      ) : LucideIcon ? (
        <motion.div
          animate={{ scale: hovered ? 1.15 : 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            color: hovered ? accent : ASH,
            transition: "color 0.2s ease",
            display: "block",
          }}
        >
          <LucideIcon size={28} strokeWidth={1.5} />
        </motion.div>
      ) : null}

      <motion.span
        animate={{ opacity: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.15 }}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "8px",
          letterSpacing: "0.08em",
          color: hovered ? BONE : ASH,
          textTransform: "uppercase",
          whiteSpace: "pre-line",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

// ── DOMAIN DATA ──────────────────────────────────────────────────────────────
const domains = [
  {
    id: "01",
    label: "CLOUD & DEVOPS",
    accent: SIGNAL,
    skills: [
      { label: "AWS", iconClass: "devicon-amazonwebservices-plain" },
      { label: "Docker", iconClass: "devicon-docker-plain" },
      { label: "Kubernetes", iconClass: "devicon-kubernetes-plain" },
      { label: "Terraform", iconClass: "devicon-terraform-plain" },
      { label: "Jenkins", iconClass: "devicon-jenkins-line" },
      { label: "GH Actions", iconClass: "devicon-github-original" },
      { label: "Nginx", iconClass: "devicon-nginx-original" },
      { label: "Linux", iconClass: "devicon-linux-plain" },
      { label: "Helm", iconClass: "devicon-helm-original" },
      { label: "CI / CD", lucide: "Infinity" },
      { label: "HA / Scale", lucide: "Server" },
    ],
  },
  {
    id: "02",
    label: "LANGUAGES",
    accent: ASH,
    skills: [
      { label: "Python", iconClass: "devicon-python-plain" },
      { label: "JavaScript", iconClass: "devicon-javascript-plain" },
      { label: "Bash / Shell", iconClass: "devicon-bash-plain" },
      { label: "C++", iconClass: "devicon-cplusplus-plain" },
      { label: "HTML5", iconClass: "devicon-html5-plain" },
      { label: "CSS3", iconClass: "devicon-css3-plain" },
    ],
  },
  {
    id: "03",
    label: "FRAMEWORKS & LIBRARIES",
    accent: SIGNAL,
    skills: [
      { label: "React", iconClass: "devicon-react-original" },
      { label: "FastAPI", iconClass: "devicon-fastapi-plain" },
      { label: "Tailwind", iconClass: "devicon-tailwindcss-plain" },
      { label: "Redux", iconClass: "devicon-redux-original" },
      { label: "JWT / OAuth2", lucide: "KeyRound" },
      { label: "REST APIs", lucide: "Webhook" },
    ],
  },
  {
    id: "04",
    label: "DATABASES & TOOLS",
    accent: ASH,
    skills: [
      { label: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
      { label: "MongoDB", iconClass: "devicon-mongodb-plain" },
      { label: "Git", iconClass: "devicon-git-plain" },
      { label: "Postman", iconClass: "devicon-postman-plain" },
      { label: "Git Flow", lucide: "GitFork" },
      { label: "Agile", lucide: "Kanban" },
    ],
  },
  {
    id: "05",
    label: "OBSERVABILITY & SECURITY",
    accent: ARTERIAL,
    skills: [
      { label: "Prometheus", iconClass: "devicon-prometheus-original" },
      { label: "Grafana", iconClass: "devicon-grafana-plain" },
      { label: "Loki", lucide: "Flame" },
      { label: "Alertmanager", lucide: "BellRing" },
      { label: "OpenTelemetry", iconClass: "devicon-opentelemetry-plain" },
      { label: "VAPT", lucide: "ShieldAlert" },
      { label: "OWASP Top 10", lucide: "Shield" },
      { label: "Pen Testing", lucide: "Terminal" },
    ],
  },
];

// ── DOMAIN ROW COMPONENT ──────────────────────────────────────────────────────
const DomainRow = ({ domain, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 md:grid-cols-[200px_1fr]"
      style={{
        borderBottom: `1px solid ${PLATE}`,
      }}
    >
      {/* left — label column */}
      <div
        style={{
          padding: "28px 24px",
          background: "rgba(10, 10, 14, 0.4)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        className="md:border-r border-b md:border-b-0 border-plate"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: GRAPHITE,
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
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: ASH,
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
          background: VOID,
          padding: "24px 20px",
        }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3"
      >
        {domain.skills.map((skill) => (
          <SkillIcon key={skill.label} label={skill.label} iconClass={skill.iconClass} lucide={skill.lucide} accent={domain.accent} />
        ))}
      </div>
    </motion.div>
  );
};

// ── MAIN SKILLS SECTION ───────────────────────────────────────────────────────
export default function Skills() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="skills"
      style={{ background: VOID, paddingBottom: "120px" }}
    >
      {/* linen header */}
      <div
        style={{
          background: LINEN,
          padding: "48px clamp(24px, 6vw, 100px) 40px",
          borderBottom: `1px solid ${ASH}`,
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
              fontFamily: "var(--font-sans)",
              fontWeight: 900,
              fontSize: "clamp(40px, 6vw, 80px)",
              letterSpacing: "-0.04em",
              color: INK,
              lineHeight: 1,
              margin: 0,
            }}
          >
            SK
            <span style={{
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: `2px ${INK}`,
            }}>ILLS</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(14px, 2vw, 20px)",
              color: IRON,
              margin: "8px 0 0",
            }}
          >
            tools I build with
          </p>
        </motion.div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: IRON,
            letterSpacing: "0.15em",
            textAlign: "right",
            lineHeight: 2.2,
          }}
        >
          <div>5 DOMAINS</div>
          <div style={{ color: INK, fontWeight: 700 }}>35+ TOOLS</div>
        </div>
      </div>

      {/* domain rows */}
      <div
        style={{
          background: VOID,
          padding: "56px clamp(24px, 6vw, 100px) 0",
        }}
      >
        <div
          style={{
            border: `1px solid ${PLATE}`,
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