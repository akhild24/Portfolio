import { useEffect, useRef, useState } from "react";

// ─── DevOps Pipeline Circuit Board ───────────────────────────────────────────
// Pure SVG + CSS animations. No external deps beyond React.
// Themed to the Operational Editorial design system.

const COLORS = {
  void:     "#080808",     // void-canvas
  surface:  "#171617",     // charcoal-plate
  smoke:    "#262525",     // smoke-plate
  graphite: "#393939",     // graphite-lift
  bone:     "#fcfcfc",     // bone-white
  ash:      "#d4d2d2",     // ash
  pebble:   "#b5b2b2",     // pebble
  iron:     "#525252",     // iron
  accent:   "#fe1e34",     // arterial-red — sole accent, used like a heartbeat
};

// ─── SVG Icons (inline, no lucide dependency needed) ─────────────────────────

function GitBranchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.ash} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function ContainerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.ash} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7.5" />
      <path d="M22 19l-3-3" />
      <circle cx="19" cy="16" r="3" />
      <path d="M12 12H2" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.ash} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.ash} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.ash} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.ash} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

// ─── Node definitions for DevOps pipeline ────────────────────────────────────

const NODES = [
  { id: "git",       x: 60,  y: 140, label: "GIT",        icon: GitBranchIcon },
  { id: "ci",        x: 210, y: 60,  label: "CI / CD",    icon: ContainerIcon },
  { id: "security",  x: 210, y: 220, label: "VAPT",       icon: ShieldIcon },
  { id: "k8s",       x: 370, y: 140, label: "K8S",        icon: CloudIcon },
  { id: "monitor",   x: 520, y: 60,  label: "OBSERVE",    icon: ActivityIcon },
  { id: "prod",      x: 520, y: 220, label: "PROD",       icon: ServerIcon },
];

const CONNECTIONS = [
  { from: "git",      to: "ci",       animated: true },
  { from: "git",      to: "security", animated: true },
  { from: "ci",       to: "k8s",      animated: true },
  { from: "security", to: "k8s",      animated: true },
  { from: "k8s",      to: "monitor",  animated: true },
  { from: "k8s",      to: "prod",     animated: true },
];

const NODE_SIZE = 40;
const BOARD_W   = 580;
const BOARD_H   = 290;

// ─── Build orthogonal (right-angle) path between two nodes ───────────────────

function buildOrthogonalPath(fromNode, toNode) {
  const x1 = fromNode.x + NODE_SIZE / 2;
  const y1 = fromNode.y + NODE_SIZE / 2;
  const x2 = toNode.x + NODE_SIZE / 2;
  const y2 = toNode.y + NODE_SIZE / 2;

  // Midpoint X for the vertical jog
  const midX = (x1 + x2) / 2;

  return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
}

// ─── Animated pulse dot traveling along a path ───────────────────────────────

function PulseDot({ pathId, delay = 0, duration = 2.5 }) {
  return (
    <circle r="2.5" fill={COLORS.accent} opacity="0.8">
      <animateMotion
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;0.7;0.7;0"
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
    </circle>
  );
}

// ─── Single node ─────────────────────────────────────────────────────────────

function CircuitNode({ node, visible, index }) {
  const Icon = node.icon;
  const animDelay = 0.15 + index * 0.1;

  return (
    <g
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.6s ease ${animDelay}s, transform 0.6s ease ${animDelay}s`,
      }}
    >
      {/* Node background */}
      <rect
        x={node.x}
        y={node.y}
        width={NODE_SIZE}
        height={NODE_SIZE}
        rx="8"
        ry="8"
        fill={COLORS.smoke}
        stroke={COLORS.graphite}
        strokeWidth="1"
      />

      {/* Subtle inner highlight */}
      <rect
        x={node.x + 1}
        y={node.y + 1}
        width={NODE_SIZE - 2}
        height={NODE_SIZE - 2}
        rx="7"
        ry="7"
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="1"
      />

      {/* Icon centered in node */}
      <foreignObject
        x={node.x + (NODE_SIZE - 16) / 2}
        y={node.y + (NODE_SIZE - 16) / 2}
        width="16"
        height="16"
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 16, height: 16 }}>
          <Icon />
        </div>
      </foreignObject>

      {/* Label below node */}
      <text
        x={node.x + NODE_SIZE / 2}
        y={node.y + NODE_SIZE + 16}
        textAnchor="middle"
        fill={COLORS.pebble}
        fontFamily="'JetBrains Mono', monospace"
        fontSize="9"
        letterSpacing="0.12em"
      >
        {node.label}
      </text>
    </g>
  );
}

// ─── Main CircuitBoard component ─────────────────────────────────────────────

export default function CircuitBoard() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Build a lookup for quick node access
  const nodeMap = {};
  NODES.forEach((n) => { nodeMap[n.id] = n; });

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        maxWidth: BOARD_W,
        position: "relative",
      }}
    >
      {/* Title label */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.18em",
          color: COLORS.iron,
          textTransform: "uppercase",
          marginBottom: 16,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease 0.1s",
        }}
      >
        PIPELINE TOPOLOGY ↘
      </div>

      <svg
        viewBox={`0 0 ${BOARD_W} ${BOARD_H}`}
        width="100%"
        height="auto"
        style={{
          overflow: "visible",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.2s",
        }}
      >
        {/* Dot grid background */}
        <defs>
          <pattern id="circuit-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill={COLORS.graphite} opacity="0.4" />
          </pattern>
        </defs>
        <rect x="0" y="0" width={BOARD_W} height={BOARD_H} fill="url(#circuit-grid)" rx="0" />

        {/* Connection paths */}
        {CONNECTIONS.map((conn, i) => {
          const from = nodeMap[conn.from];
          const to   = nodeMap[conn.to];
          const pathId = `path-${conn.from}-${conn.to}`;
          const d = buildOrthogonalPath(from, to);

          return (
            <g key={pathId}>
              {/* Trace line */}
              <path
                id={pathId}
                d={d}
                fill="none"
                stroke={COLORS.graphite}
                strokeWidth="1.5"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.3 + i * 0.08}s`,
                }}
              />

              {/* Animated pulse dot */}
              {conn.animated && visible && (
                <PulseDot
                  pathId={pathId}
                  delay={i * 0.6}
                  duration={2.8 + i * 0.2}
                />
              )}

              {/* Junction dots at midpoints */}
              {(() => {
                const x1 = from.x + NODE_SIZE / 2;
                const y1 = from.y + NODE_SIZE / 2;
                const x2 = to.x + NODE_SIZE / 2;
                const y2 = to.y + NODE_SIZE / 2;
                const midX = (x1 + x2) / 2;
                return (
                  <>
                    <rect
                      x={midX - 2.5} y={y1 - 2.5}
                      width="5" height="5" rx="1"
                      fill={COLORS.smoke}
                      stroke={COLORS.graphite}
                      strokeWidth="0.5"
                      style={{
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.5s ease ${0.5 + i * 0.08}s`,
                      }}
                    />
                    <rect
                      x={midX - 2.5} y={y2 - 2.5}
                      width="5" height="5" rx="1"
                      fill={COLORS.smoke}
                      stroke={COLORS.graphite}
                      strokeWidth="0.5"
                      style={{
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.5s ease ${0.5 + i * 0.08}s`,
                      }}
                    />
                  </>
                );
              })()}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <CircuitNode key={node.id} node={node} visible={visible} index={i} />
        ))}

        {/* Arterial red accent on the "PROD" node — 1px featured border */}
        <rect
          x={NODES[5].x - 1}
          y={NODES[5].y - 1}
          width={NODE_SIZE + 2}
          height={NODE_SIZE + 2}
          rx="9"
          ry="9"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="1"
          opacity={visible ? 0.5 : 0}
          style={{ transition: "opacity 0.6s ease 0.8s" }}
        />
      </svg>
    </div>
  );
}
