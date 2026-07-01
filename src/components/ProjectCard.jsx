import { motion } from "framer-motion";

/* ── Palette ─────────────────────────────────────────────────────────────────── */
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

const CARD_COUNT = 6;

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
        borderTop: `2px solid ${ARTERIAL}`,
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        minHeight: "62vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ══════════════════════════════════════════════════════
          LEFT — narrative content
      ══════════════════════════════════════════════════════ */}
      <div style={{
        padding: "40px 36px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: `1px solid ${GRAPHITE}`,
        overflowY: "auto",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

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
            fontSize: "clamp(28px, 3.5vw, 52px)",
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
            fontSize: "15px",
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

        {/* Bottom — metrics + stack + status */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "28px" }}>

          {/* Metrics */}
          <div style={{
            display: "flex",
            gap: "28px",
            paddingBottom: "14px",
            borderBottom: `1px solid ${PLATE}`,
          }}>
            {project.metrics.map((m) => (
              <div key={m.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{
                  fontFamily: SANS,
                  fontWeight: 900,
                  fontSize: "20px",
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
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: SIGNAL }} />
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

      {/* ══════════════════════════════════════════════════════
          RIGHT — structured info panel (no dead space)
      ══════════════════════════════════════════════════════ */}
      <div style={{
        position: "relative",
        background: "#0d0d12",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Dot grid bg */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`dots-${project.index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill={PLATE} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dots-${project.index})`} />
        </svg>

        {/* Ghost giant index — background watermark */}
        <span style={{
          position: "absolute",
          bottom: "-0.1em",
          right: "-0.05em",
          fontFamily: SANS,
          fontWeight: 900,
          fontSize: "clamp(140px, 20vw, 260px)",
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: `1px ${GRAPHITE}`,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          userSelect: "none",
          zIndex: 0,
          opacity: 0.5,
        }}>{project.index}</span>

        {/* Top label */}
        <div style={{
          position: "relative",
          zIndex: 2,
          padding: "20px 24px 0",
          fontFamily: MONO,
          fontSize: "9px",
          color: GRAPHITE,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>/ DSGN {project.index}</div>

        {/* ── Structured content area ── */}
        <div style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "24px 24px 32px",
          gap: "0",
        }}>

          {/* Editorial index + title block */}
          <div style={{
            borderBottom: `1px solid ${GRAPHITE}`,
            paddingBottom: "20px",
            marginBottom: "0",
          }}>
            <div style={{
              fontFamily: MONO,
              fontSize: "9px",
              color: IRON,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}>PROJECT INDEX</div>
            <div style={{
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: "clamp(22px, 3vw, 40px)",
              color: BONE,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              whiteSpace: "pre-line",
            }}>{project.title}</div>
          </div>

          {/* Stack list — vertical, one per row with hairlines */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            borderBottom: `1px solid ${GRAPHITE}`,
          }}>
            <div style={{
              fontFamily: MONO,
              fontSize: "9px",
              color: IRON,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "14px 0 10px",
            }}>STACK</div>
            {project.stack.map((s, i) => (
              <div key={s} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "9px 0",
                borderTop: i === 0 ? `1px solid ${GRAPHITE}` : `1px solid ${PLATE}`,
              }}>
                <span style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  color: ASH,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>{s}</span>
                <span style={{
                  fontFamily: MONO,
                  fontSize: "9px",
                  color: GRAPHITE,
                  letterSpacing: "0.1em",
                }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>

          {/* Categories row */}
          <div style={{ paddingTop: "16px" }}>
            <div style={{
              fontFamily: MONO,
              fontSize: "9px",
              color: IRON,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}>SCOPE</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {project.categories.map((cat, i) => (
                <div key={cat} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}>
                  <div style={{
                    width: "3px",
                    height: "3px",
                    background: i === 0 ? ARTERIAL : GRAPHITE,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: MONO,
                    fontSize: "9px",
                    color: i === 0 ? ASH : DIM,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}>{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Arterial left border accent — solid 1px, no gradient */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1px",
          height: "100%",
          background: ARTERIAL,
          opacity: 0.25,
          zIndex: 3,
        }} />
      </div>
    </motion.div>
  );
}