import logo47B from "../assets/logo.png";

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
const MONO     = "var(--font-mono)";
const SANS     = "var(--font-sans)";
const SERIF    = "var(--font-serif)";
const SIGNAL   = "var(--color-signal)";

const ARTERIAL = "#fe1e34";

/* ═══════════════════════════════════════════════════════════════════════════════
   ROLE CARD — top-right context block
   ═══════════════════════════════════════════════════════════════════════════════ */

function RoleCard() {
  return (
    <div
      style={{
        border: `1px solid ${GRAPHITE}`,
        borderRadius: 6,
        padding: "24px 28px",
        maxWidth: 380,
        width: "100%",
        background: PLATE,
        position: "relative",
      }}
    >
      {/* label */}
      <div
        style={{
          fontFamily: MONO,
          fontSize: "10px",
          letterSpacing: "0.18em",
          color: DIM,
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        ROLE
      </div>

      {/* op number */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 20,
          fontFamily: MONO,
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: IRON,
        }}
      >
        OP-01
      </div>

      {/* description */}
      <p
        style={{
          fontFamily: SANS,
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: 1.6,
          color: BONE,
          margin: 0,
          marginBottom: 18,
        }}
      >
        Building production-grade infra. Identifying vulnerabilities on live
        production systems.
      </p>

      {/* tech pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["REACT", "FASTAPI", "PYTHON", "MONGODB"].map((t) => (
          <span
            key={t}
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              letterSpacing: "0.1em",
              color: BONE,
              textTransform: "uppercase",
              padding: "5px 10px",
              border: `1px solid ${GRAPHITE}`,
              borderRadius: 3,
              lineHeight: 1,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MODULE CARD — COE PLATFORM
   ═══════════════════════════════════════════════════════════════════════════════ */

function CoePlatformCard() {
  return (
    <div style={cardStyle}>
      <CardHeader module="01" icon="▲" />

      <h3 style={cardTitle}>COE PLATFORM</h3>

      <p style={cardBody}>
        Full-stack knowledge management platform with JWT OAuth2 auth, real-time notifications, and event + blog management. Built with React, Redux, FastAPI, and MongoDB.
      </p>

      {/* ── RBAC flow diagram ────────────────────────────────────── */}
      <div
        style={{
          marginTop: 24,
          padding: "20px 16px",
          background: SURFACE,
          borderRadius: 6,
          border: `1px solid ${GRAPHITE}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {["ADMIN", "FACULTY", "STUDENT"].map((role, i) => (
          <div key={role} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                padding: "6px 12px",
                border: `1px solid ${i === 1 ? ARTERIAL : GRAPHITE}`,
                borderRadius: 4,
                fontFamily: MONO,
                fontSize: "9px",
                letterSpacing: "0.08em",
                color: i === 1 ? BONE : DIM,
                background: i === 1 ? `${ARTERIAL}12` : "transparent",
              }}
            >
              {role}
            </div>
            {i < 2 && (
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  color: IRON,
                }}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MODULE CARD — RAG CHATBOT
   ═══════════════════════════════════════════════════════════════════════════════ */

function RagChatbotCard() {
  return (
    <div style={cardStyle}>
      <CardHeader module="02" icon="◉" />

      <h3 style={cardTitle}>BRSR AI ASSISTANT</h3>

      {/* ── Big metric ─────────────────────────────────────────── */}
      <div
        style={{
          marginTop: 8,
          marginBottom: 20,
          paddingLeft: 16,
          borderLeft: `3px solid ${ARTERIAL}`,
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontWeight: 900,
            fontSize: "clamp(48px, 5vw, 64px)",
            color: BONE,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          7+
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: "9px",
            letterSpacing: "0.14em",
            color: DIM,
            textTransform: "uppercase",
            marginTop: 6,
          }}
        >
          AI ACTIONS SUPPORTED
        </div>
      </div>

      <p style={cardBody}>
        Built a full-stack sustainability reporting assistant with RAG over BRSR regulations. FastAPI + Gemini backend with SSE streaming, tone control, and compliance checking — containerized with Docker Compose.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MODULE CARD — VAPT
   ═══════════════════════════════════════════════════════════════════════════════ */

function VaptCard() {
  return (
    <div style={cardStyle}>
      <CardHeader module="03" icon="◆" featured />

      <h3 style={cardTitle}>V.A.P.T</h3>

      <p style={{ ...cardBody, marginBottom: 20 }}>
        Conducted exhaustive Vulnerability Assessment & Penetration Testing on
        live production environments.
      </p>

      {/* ── Threat log table ───────────────────────────────────── */}
      <div
        style={{
          border: `1px solid ${GRAPHITE}`,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        {/* table header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 14px",
            borderBottom: `1px solid ${GRAPHITE}`,
            background: SURFACE,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: DIM,
            }}
          >
            THREAT_LOG
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: ASH,
            }}
          >
            COUNT: <strong style={{ color: BONE }}>50+</strong>
          </span>
        </div>

        {/* entries */}
        <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            "IDOR vulnerabilities",
            "XSS injection vectors",
            "Auth bypass exploits",
          ].map((entry) => (
            <div
              key={entry}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 1,
                  background: ARTERIAL,
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "12px",
                  color: ASH,
                  letterSpacing: "0.02em",
                }}
              >
                {entry}
              </span>
            </div>
          ))}

          {/* terminal prompt */}
          <div
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              color: IRON,
              marginTop: 4,
            }}
          >
            {">"} System hardened.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SHARED — card header (MODULE label + icon)
   ═══════════════════════════════════════════════════════════════════════════════ */

function CardHeader({ module, icon, featured = false }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontSize: "10px",
          letterSpacing: "0.15em",
          color: DIM,
          textTransform: "uppercase",
        }}
      >
        MODULE {module}
      </span>
      <span
        style={{
          fontSize: "14px",
          color: featured ? ARTERIAL : ARTERIAL,
          opacity: featured ? 1 : 0.6,
        }}
      >
        {icon}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SHARED STYLES
   ═══════════════════════════════════════════════════════════════════════════════ */

const cardStyle = {
  background: PLATE,
  border: `1px solid ${GRAPHITE}`,
  borderRadius: 8,
  padding: "28px 24px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  transition: "transform 0.25s ease, filter 0.25s ease, border-color 0.25s ease",
};

const cardTitle = {
  fontFamily: SANS,
  fontWeight: 900,
  fontSize: "clamp(22px, 2.5vw, 30px)",
  letterSpacing: "-0.03em",
  color: BONE,
  textTransform: "uppercase",
  lineHeight: 1.1,
  margin: 0,
  marginBottom: 12,
};

const cardBody = {
  fontFamily: SANS,
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: 1.7,
  color: ASH,
  margin: 0,
};

/* ═══════════════════════════════════════════════════════════════════════════════
   STATUS BAR — bottom of section
   ═══════════════════════════════════════════════════════════════════════════════ */

function StatusBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 0",
        marginTop: 48,
        borderTop: `1px solid ${GRAPHITE}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: "12px", color: DIM }}>◻</span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: DIM,
            textTransform: "uppercase",
          }}
        >
          EXEC_COMPLETE
        </span>
      </div>
      <span
        style={{
          fontFamily: MONO,
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: DIM,
          textTransform: "uppercase",
        }}
      >
        STATUS: <span style={{ color: SIGNAL, fontWeight: 700 }}>SUCCESS</span>
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ROOT — Work Section
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function Work() {
  const pad = "clamp(36px, 6vw, 80px)";

  return (
    <section
      id="work"
      style={{
        background: VOID,
        paddingTop: 120,
        paddingBottom: 80,
        paddingLeft: pad,
        paddingRight: pad,
        boxSizing: "border-box",
      }}
    >
      {/* ── HEADER — title + role card ──────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 40,
          marginBottom: 16,
        }}
      >
        {/* left — giant title */}
        <div style={{ flex: "1 1 400px" }}>
          {/* company name — massive */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: -8 }}>
            <img
              src={logo47B}
              alt="47Billion"
              style={{ width: 36, height: 36, objectFit: "contain" }}
            />
            <h2
              style={{
                fontFamily: SANS,
                fontWeight: 900,
                fontSize: "clamp(56px, 10vw, 130px)",
                color: BONE,
                letterSpacing: "-0.06em",
                lineHeight: 0.95,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              47BILLION
            </h2>
          </div>

          {/* INTERNSHIP — outline */}
          <h2
            style={{
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: "clamp(48px, 8vw, 110px)",
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
              margin: 0,
              textTransform: "uppercase",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: `1.5px color-mix(in srgb, var(--color-bone) 35%, transparent)`,
            }}
          >
            INTERNSHIP
          </h2>
        </div>

        {/* right — role card */}
        <div style={{ flex: "0 0 auto", paddingTop: 8 }}>
          <RoleCard />
        </div>
      </div>

      {/* ── Serif connective + domain tags ──────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 56,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(18px, 2.5vw, 28px)",
            color: ASH,
            letterSpacing: "-0.01em",
          }}
        >
          engineered at
        </span>

        <span
          style={{
            width: 40,
            height: 1,
            background: IRON,
            display: "inline-block",
          }}
        />

        <span
          style={{
            fontFamily: MONO,
            fontSize: "11px",
            letterSpacing: "0.14em",
            color: DIM,
            textTransform: "uppercase",
          }}
        >
          FULL STACK / DEV / RAG / VAPT
        </span>
      </div>

      {/* ── PROJECT CARDS — 3-column grid ───────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        <a
          href="https://github.com/sujaldef/centerofexcellence"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit", display: "flex" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.filter = "brightness(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.filter = "brightness(1)";
          }}
        >
          <CoePlatformCard />
        </a>
        <a
          href="https://github.com/akhild24/finalai"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit", display: "flex" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.filter = "brightness(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.filter = "brightness(1)";
          }}
        >
          <RagChatbotCard />
        </a>
        <VaptCard />
      </div>

      {/* ── STATUS BAR ──────────────────────────────────────────────── */}
      <StatusBar />
    </section>
  );
}
