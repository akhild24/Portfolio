import { motion } from "framer-motion";
import { BONE, ASH, DIM, IRON, GRAPHITE, PLATE, SURFACE, SIGNAL, MONO, SANS, SERIF, ARTERIAL } from "../theme";

const variants = {
  enter:  (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function ProjectCard({ project, direction }) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        width: "100%",
        background: SURFACE,
        border: `1px solid ${GRAPHITE}`,
        display: "grid",
        gridTemplateColumns: "1fr",
        minHeight: "auto",
        overflow: "hidden",
      }}
      className="project-card-grid"
    >

      {/* ══════════════════════════════════════════════════════
          LEFT — title, description
      ══════════════════════════════════════════════════════ */}
      <div style={{
        padding: "20px 20px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderBottom: `1px solid ${GRAPHITE}`,
        overflowY: "auto",
      }}
      className="project-card-left"
      >

        {/* Top meta row */}
        <div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "8px",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{
                fontFamily: MONO,
                fontSize: "10px",
                color: SIGNAL,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}>PROJECT_LOG_V{project.index}.0</span>
              <span style={{
                fontFamily: MONO,
                fontSize: "10px",
                color: IRON,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}>TIMESTAMP: {project.year}</span>
            </div>
            <span style={{
              fontFamily: MONO,
              fontSize: "10px",
              color: IRON,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textAlign: "right",
            }}>{project.tag.replace("·", "//")}</span>
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
            {project.categories.map((cat) => (
              <span key={cat} style={{
                fontFamily: MONO,
                fontSize: "8px",
                letterSpacing: "0.08em",
                color: ASH,
                border: `1px solid ${GRAPHITE}`,
                padding: "4px 8px",
                textTransform: "uppercase",
              }}>{cat}</span>
            ))}
          </div>

          {/* Giant title */}
          <h3 style={{
            fontFamily: SANS,
            fontWeight: 900,
            fontSize: "clamp(28px, 5vw, 88px)",
            color: BONE,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            margin: "0 0 14px 0",
            whiteSpace: "pre-line",
          }}>{project.title}</h3>

          {/* Serif italic — dash + phrase */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}>
            <div style={{ width: "28px", height: "1px", background: ARTERIAL, flexShrink: 0 }} />
            <span style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.5vw, 15px)",
              color: ASH,
              letterSpacing: "-0.01em",
            }}>{project.connective}</span>
          </div>

          {/* Description */}
          <p style={{
            fontFamily: MONO,
            fontSize: "11px",
            color: ASH,
            lineHeight: 1.85,
            margin: 0,
          }}>{project.description}</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          RIGHT — metrics / stack / status / CTA
      ══════════════════════════════════════════════════════ */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        background: SURFACE,
      }}>

        {/* ── Metrics — flush top, divided columns ────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`,
          borderBottom: `1px solid ${GRAPHITE}`,
          flexShrink: 0,
        }}>
          {project.metrics.map((m, i) => (
            <div key={m.label} style={{
              padding: "16px 16px 14px",
              borderRight: i < project.metrics.length - 1 ? `1px solid ${GRAPHITE}` : "none",
            }}>
              <div style={{
                fontFamily: SANS,
                fontWeight: 900,
                fontSize: "clamp(24px, 3.5vw, 44px)",
                color: ARTERIAL,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: "5px",
              }}>{m.val}</div>
              <div style={{
                fontFamily: MONO,
                fontSize: "10px",
                color: ASH,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}>{m.label.replace(/ /g, "_")}</div>
            </div>
          ))}
        </div>

        {/* ── Stack list ───────────────────────────────────── */}
        <div style={{
          flex: 1,
          padding: "12px 16px",
          borderBottom: `1px solid ${GRAPHITE}`,
          overflowY: "auto",
          maxHeight: "240px",
        }}>
          {/* Section label */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "10px",
          }}>
            <div style={{ width: "5px", height: "5px", background: SIGNAL, flexShrink: 0 }} />
            <span style={{
              fontFamily: MONO,
              fontSize: "9px",
              color: SIGNAL,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}>ARCHITECTURE_STACK</span>
          </div>

          {project.stack.map((s, i) => (
            <div key={s} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 0",
              borderTop: `1px solid ${PLATE}`,
            }}>
              <span style={{
                fontFamily: MONO,
                fontSize: "10px",
                color: ASH,
                letterSpacing: "0.04em",
              }}>{s}</span>
              <span style={{
                fontFamily: MONO,
                fontSize: "9px",
                color: GRAPHITE,
                letterSpacing: "0.08em",
              }}>[{String(i + 1).padStart(2, "0")}]</span>
            </div>
          ))}
        </div>

        {/* ── Status + CTA ─────────────────────────────────── */}
        <div style={{
          padding: "12px 16px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flexShrink: 0,
        }}>
          {/* Status row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "6px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <div style={{ width: "5px", height: "5px", background: SIGNAL, flexShrink: 0 }} />
              <span style={{
                fontFamily: MONO,
                fontSize: "9px",
                color: SIGNAL,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}>SYSTEM_{project.status}</span>
            </div>
            <span style={{
              fontFamily: MONO,
              fontSize: "9px",
              color: IRON,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>V{project.index}.0_STABLE</span>
          </div>

          {/* CTA */}
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "11px 14px",
                border: `1px solid ${ARTERIAL}`,
                textDecoration: "none",
                background: "transparent",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(254,30,52,0.07)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span style={{
                fontFamily: MONO,
                fontSize: "10px",
                color: BONE,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}>ACCESS_REPOSITORY</span>
              <span style={{ color: ARTERIAL, fontSize: "14px", lineHeight: 1 }}>→</span>
            </a>
          ) : (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "11px 14px",
              border: `1px solid ${GRAPHITE}`,
            }}>
              <span style={{
                fontFamily: MONO,
                fontSize: "10px",
                color: IRON,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}>INTERNAL_PROJECT</span>
              <span style={{ color: GRAPHITE, fontSize: "14px", lineHeight: 1 }}>—</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}