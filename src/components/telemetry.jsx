import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ── palette refs (monochrome only) ── */
const BG      = "var(--color-dark)";
const SURFACE = "var(--color-surface)";
const CREAM   = "var(--color-cream)";
const DIM     = "var(--color-dim)";
const BORDER  = "var(--color-border)";
const PANEL   = "var(--color-panel)";
const BODY    = "var(--color-body)";
const MONO    = "var(--font-mono)";

/* ── useInView ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ── animated counter ── */
function useCounter(target, dur = 2200, enabled = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let t0 = null, raf;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, dur, enabled]);
  return n;
}

/* ── stats config ── */
const STATS = [
  { label: "VULNS_PATCHED",     value: 50, suffix: "+", bar: 85 },
  { label: "STUDENTS_MENTORED", value: 40, suffix: "+", bar: 70 },
  { label: "SYSTEMS_DEPLOYED",  value: 4,  suffix: "",  bar: 95 },
];

/* ── stat card ── */
function StatCard({ label, value, suffix, bar, delay, visible }) {
  const count = useCounter(value, 2200, visible);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ flex: 1, minWidth: 130 }}
    >
      <div style={{
        fontFamily: MONO, fontSize: "10px", letterSpacing: "0.14em",
        color: "white", marginBottom: 8,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: MONO, fontWeight: 700,
        fontSize: "clamp(32px, 4.5vw, 52px)",
        color: CREAM, lineHeight: 1, marginBottom: 12,
      }}>
        {count}{suffix}
      </div>
      <div style={{ height: 2, background: PANEL, borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={visible ? { width: `${bar}%` } : {}}
          transition={{ duration: 1.4, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "100%", background: CREAM, borderRadius: 2 }}
        />
      </div>
    </motion.div>
  );
}

/* ── rank card (TOP 10 special) ── */
function RankCard({ delay, visible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ flex: 1, minWidth: 130 }}
    >
      <div style={{
        fontFamily: MONO, fontSize: "10px", letterSpacing: "0.14em",
        color: "white", marginBottom: 8,
      }}>
        HACKATHON_RANK
      </div>
      <div style={{ lineHeight: 1, marginBottom: 12 }}>
        <span style={{
          fontFamily: MONO, fontWeight: 700, color: BODY,
          fontSize: "clamp(18px, 2.5vw, 28px)", letterSpacing: "0.06em",
        }}>
          TOP
        </span>
        <br />
        <span style={{
          fontFamily: MONO, fontWeight: 700, color: CREAM,
          fontSize: "clamp(32px, 4.5vw, 52px)",
        }}>
          10
        </span>
      </div>
      {/* dashed bar */}
      <div style={{ height: 2, display: "flex", gap: 6 }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={visible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: 1, background: CREAM, borderRadius: 2,
              transformOrigin: "left",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── smooth path builder (catmull-rom) ── */
function buildSmoothPath(pts, w, h) {
  if (pts.length < 2) return "";
  const coords = pts.map((p, i) => ({
    x: (i / (pts.length - 1)) * w,
    y: h - (p / 100) * h * 0.8 - h * 0.1,
  }));
  let d = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[Math.max(0, i - 1)];
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const p3 = coords[Math.min(coords.length - 1, i + 2)];
    d += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6}, ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/* ── live chart ── */
function LiveChart({ visible }) {
  const W = 600, H = 120;
  const [pts, setPts] = useState(() =>
    Array.from({ length: 20 }, () => 30 + Math.random() * 40)
  );

  useEffect(() => {
    if (!visible) return;
    const iv = setInterval(() => {
      setPts((prev) => [...prev.slice(1), 25 + Math.random() * 50]);
    }, 1800);
    return () => clearInterval(iv);
  }, [visible]);

  const linePath = buildSmoothPath(pts, W, H);
  const fillPath = linePath + ` L ${W} ${H} L 0 ${H} Z`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 1.2 }}
      style={{ width: "100%", marginTop: 32 }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eeebe4" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#eeebe4" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* grid lines */}
        {[0.25, 0.5, 0.75].map((r) => (
          <line
            key={r}
            x1={0} y1={H * r} x2={W} y2={H * r}
            stroke="#1c2330" strokeWidth="1"
          />
        ))}
        {/* fill */}
        <path d={fillPath} fill="url(#chartFill)" />
        {/* line */}
        <path
          d={linePath}
          fill="none"
          stroke="#eeebe4"
          strokeWidth="1.5"
          filter="url(#glow)"
          style={{ transition: "d 0.8s ease" }}
        />
        {/* bright dot at latest point */}
        {pts.length > 0 && (() => {
          const lastY = H - (pts[pts.length - 1] / 100) * H * 0.8 - H * 0.1;
          return (
            <circle
              cx={W}
              cy={lastY}
              r="3"
              fill="#eeebe4"
              filter="url(#glow)"
              style={{ transition: "cy 0.8s ease" }}
            />
          );
        })()}
      </svg>
    </motion.div>
  );
}

/* ── status dots ── */
const STATUS_ITEMS = [
  { label: "UPTIME", status: "99.9%" },
  { label: "PIPELINE", status: "PASSING" },
  { label: "GRAFANA", status: "ACTIVE" },
];

/* ── main component ── */
export default function Telemetry() {
  const [ref, visible] = useInView(0.1);

  return (
    <section
      ref={ref}
      style={{
        background: BG,
        width: "100%",
        padding: "80px clamp(20px, 5vw, 60px)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 12,
          padding: "clamp(24px, 4vw, 44px)",
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle corner glow */}
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(238,235,228,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 36, borderBottom: `1px solid ${PANEL}`, paddingBottom: 16,
          }}
        >
          <div style={{
            fontFamily: MONO, fontSize: "12px", letterSpacing: "0.12em",
            color: CREAM, display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: "14px" }}></span>
            LIVE_TELEMETRY
          </div>
          <div style={{
            fontFamily: MONO, fontSize: "11px", letterSpacing: "0.1em",
            color: CREAM, display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: CREAM, display: "inline-block",
              boxShadow: "0 0 8px rgba(238,235,228,0.6)",
              animation: "pulse 2s ease-in-out infinite",
            }} />
            SYNCED
          </div>
        </motion.div>

        {/* ── stat cards ── */}
        <div style={{
          display: "flex", gap: "clamp(20px, 3vw, 40px)",
          flexWrap: "wrap",
        }}>
          <StatCard {...STATS[0]} delay={0.2} visible={visible} />
          <StatCard {...STATS[1]} delay={0.35} visible={visible} />
          <RankCard delay={0.5} visible={visible} />
          <StatCard {...STATS[2]} delay={0.65} visible={visible} />
        </div>

        {/* ── live chart ── */}
        <LiveChart visible={visible} />

        {/* ── bottom status bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          style={{
            display: "flex", gap: 24, flexWrap: "wrap",
            marginTop: 20, paddingTop: 16,
            borderTop: `1px solid ${PANEL}`,
          }}
        >
          {STATUS_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{
                fontFamily: MONO, fontSize: "10px", letterSpacing: "0.12em",
                color: DIM, display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: CREAM, display: "inline-block",
                opacity: 0.6,
              }} />
              {item.label}
              <span style={{ color: CREAM, fontWeight: 600 }}>
                {item.status}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* pulse keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
