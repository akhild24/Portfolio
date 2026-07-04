import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        backgroundColor: "var(--color-void)",
        paddingBottom: "80px",
        overflowX: "hidden",
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ position: "relative", paddingTop: "80px" }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            paddingLeft: "clamp(16px, 6vw, 96px)",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "var(--color-dim)",
              textTransform: "uppercase",
            }}
          >
            SEC-04
          </span>
          <span
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              backgroundColor: "#fe1e34",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "var(--color-dim)",
              textTransform: "uppercase",
            }}
          >
            CONTACT
          </span>
        </motion.div>

        {/* Giant headline */}
        <div
          style={{
            paddingLeft: "clamp(16px, 6vw, 96px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 900,
                fontSize: "clamp(42px, 13vw, 195px)",
                letterSpacing: "-0.06em",
                lineHeight: 0.88,
                margin: 0,
                color: "transparent",
                display: "flex",
                gap: "0.08em",
              }}
            >
              <span style={{ color: "var(--color-bone)" }}>CO</span>
              <span
                style={{
                  WebkitTextStroke: "1.5px var(--color-bone)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                NTACT
              </span>
            </motion.h2>
          </div>

          {/* Right meta block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            style={{
              paddingRight: "clamp(16px, 6vw, 96px)",
              paddingBottom: "12px",
              textAlign: "right",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "2px",
                backgroundColor: "#00e38f",
                marginLeft: "auto",
                marginBottom: "10px",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "var(--color-dim)",
                textTransform: "uppercase",
                margin: "0 0 4px 0",
              }}
            >
              OPEN TO OPPORTUNITIES
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "var(--color-iron)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              SDE · DEVOPS · INTERNSHIP
            </p>
          </motion.div>
        </div>

        {/* Serif caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            paddingLeft: "clamp(16px, 6vw, 96px)",
            marginTop: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(14px, 1.4vw, 18px)",
              color: "var(--color-dim)",
            }}
          >
            let's build something together
          </span>
        </motion.div>

        {/* Full-bleed hairline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          style={{
            marginTop: "32px",
            height: "1px",
            width: "100%",
            transformOrigin: "left",
            background:
              "linear-gradient(to right, #fe1e34 0%, #fe1e34 8%, var(--color-graphite) 8%)",
          }}
        />
      </div>

      {/* ── BODY ── */}
      <div
        className="contact-body"
        style={{
          paddingTop: "48px",
          paddingLeft: "clamp(16px, 6vw, 96px)",
          paddingRight: "clamp(16px, 6vw, 96px)",
          display: "grid",
          gap: "clamp(32px, 6vw, 96px)",
          alignItems: "start",
        }}
      >
        {/* ── LEFT: info ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "var(--color-dim)",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            [ TRANSMISSION OPEN ]
          </p>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(14px, 1.5vw, 18px)",
              color: "var(--color-ash)",
              lineHeight: 1.7,
              maxWidth: "420px",
              marginBottom: "36px",
            }}
          >
            Whether it's an internship, a collaboration, or just a question
            about the stack — drop a message. I read everything.
          </p>

          {/* Contact links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "EMAIL", value: "akhildwivedi453@gmail.com", href: "mailto:akhildwivedi453@gmail.com" },
              { label: "GITHUB", value: "github.com/akhild24", href: "https://github.com/akhild24" },
              { label: "LOCATION", value: "Indore, India", href: null },
            ].map(({ label, value, href }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingBottom: "14px",
                  borderBottom: "1px solid var(--color-graphite)",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: "var(--color-iron)",
                    textTransform: "uppercase",
                    minWidth: "60px",
                  }}
                >
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--color-ash)",
                      textDecoration: "none",
                      letterSpacing: "0.04em",
                      transition: "color 0.2s",
                      wordBreak: "break-all",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#00e38f")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--color-ash)")}
                  >
                    {value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--color-ash)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: form ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          style={{
            backgroundColor: "var(--color-plate)",
            border: "1px solid var(--color-graphite)",
            borderRadius: "var(--radius-md)",
            padding: "clamp(20px, 3vw, 40px)",
          }}
        >
          {/* Form header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
              paddingBottom: "14px",
              borderBottom: "1px solid var(--color-smoke)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "var(--color-dim)",
                textTransform: "uppercase",
              }}
            >
              NEW_MESSAGE.init
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#00e38f",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color: "#00e38f",
                  textTransform: "uppercase",
                }}
              >
                LIVE
              </span>
            </div>
          </div>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { name: "name", label: "NAME", placeholder: "Akhil Dwivedi" },
              { name: "email", label: "EMAIL", placeholder: "you@example.com" },
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: "var(--color-iron)",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  {label}
                </label>
                <input
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  style={{
                    width: "100%",
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-graphite)",
                    borderRadius: "var(--radius-sm)",
                    padding: "12px 14px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "var(--color-bone)",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#00e38f")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--color-graphite)")}
                />
              </div>
            ))}

            {/* Message */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "var(--color-iron)",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                MESSAGE
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind..."
                rows={4}
                style={{
                  width: "100%",
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-graphite)",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--color-bone)",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00e38f")}
                onBlur={(e) => (e.target.style.borderColor = "var(--color-graphite)")}
              />
            </div>

            {/* Submit */}
            <motion.button
              onClick={handleSubmit}
              disabled={status === "sending" || status === "success"}
              whileHover={
                status === "idle" || status === "error"
                  ? { y: -2, backgroundColor: "var(--color-bone)" }
                  : {}
              }
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor:
                  status === "success"
                    ? "#00e38f"
                    : status === "error"
                    ? "#fe1e34"
                    : "var(--color-bone)",
                color: "var(--color-ink)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor:
                  status === "sending" || status === "success"
                    ? "not-allowed"
                    : "pointer",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              {status === "idle" && "TRANSMIT →"}
              {status === "sending" && "SENDING..."}
              {status === "success" && "✓ MESSAGE SENT"}
              {status === "error" && "✗ RETRY"}
            </motion.button>

            {/* Status feedback */}
            {(status === "success" || status === "error") && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color:
                    status === "success" ? "#00e38f" : "#fe1e34",
                  textTransform: "uppercase",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {status === "success"
                  ? "EXEC_COMPLETE — message delivered"
                  : "EXEC_FAILED — check connection and retry"}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── FOOTER STRIP ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        style={{
          marginTop: "60px",
          paddingLeft: "clamp(16px, 6vw, 96px)",
          paddingRight: "clamp(16px, 6vw, 96px)",
          paddingTop: "20px",
          borderTop: "1px solid var(--color-graphite)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.18em",
            color: "var(--color-iron)",
            textTransform: "uppercase",
          }}
        >
          AKD_OS v1.0 — AKHIL DWIVEDI © 2025
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.18em",
            color: "var(--color-iron)",
            textTransform: "uppercase",
          }}
        >
          BUILT WITH REACT · FASTAPI · AWS EC2
        </span>
      </motion.div>
    </section>
  );
}