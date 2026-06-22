import { useEffect, useState } from "react";

const BOOT_STEPS = [
  { id: "init", log: "[INIT]  Mounting system environment...", duration: 600 },
  { id: "vapt", log: "[OK]    VAPT module loaded — 50 vulnerabilities indexed", duration: 700 },
  { id: "eks",  log: "[OK]    EKS cluster config detected (2 node groups)", duration: 650 },
  { id: "cicd", log: "[OK]    Jenkins pipeline · Prometheus · Grafana · Loki", duration: 750 },
  { id: "rag",  log: "[OK]    RAG pipeline online — Gemini API connected", duration: 600 },
  { id: "rank", log: "[INFO]  Udbhav'26 — Rank 09 / 275 teams registered", duration: 700 },
  { id: "gdg",  log: "[OK]    GDG mentorship nodes: 40 engineers synced", duration: 600 },
  { id: "done", log: "[BOOT]  Portfolio ready. Deploying to edge...", duration: 500 },
];

export default function Preloader({ onComplete }) {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let stepIndex = 0;
    let elapsed = 0;
    const total = BOOT_STEPS.reduce((a, s) => a + s.duration, 0);

    const runNext = () => {
      if (stepIndex >= BOOT_STEPS.length) {
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 300);
        return;
      }

      const step = BOOT_STEPS[stepIndex];
      elapsed += step.duration;
      setVisibleSteps(stepIndex + 1);
      setProgress(Math.round((elapsed / total) * 100));
      stepIndex++;
      setTimeout(runNext, step.duration);
    };

    const kickoff = setTimeout(runNext, 400);
    return () => clearTimeout(kickoff);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-center px-8 md:px-24 transition-opacity duration-500 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "#10131a" }}
    >
      {/* Top label */}
      <div className="mb-10">
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: "#00e38f" }}
        >
          AKD_OS · Initializing
        </span>
      </div>

      {/* Terminal log */}
      <div className="flex flex-col gap-2 mb-12 min-h-[220px]">
        {BOOT_STEPS.map((step, i) => {
          const visible = i < visibleSteps;
          const isActive = i === visibleSteps - 1;

          const logColor = step.log.startsWith("[OK]")
            ? "#00e38f"
            : step.log.startsWith("[INFO]")
            ? "#f9bd22"
            : step.log.startsWith("[BOOT]")
            ? "#00e38f"
            : "#849495";

          return (
            <div
              key={step.id}
              className="font-mono text-sm transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(6px)",
                color: isActive ? "#e3e2e2" : "#849495",
              }}
            >
              <span style={{ color: logColor }}>
                {step.log.split(" ")[0]}{" "}
              </span>
              {step.log.slice(step.log.indexOf(" ") + 1)}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span
            className="font-mono text-xs tracking-widest"
            style={{ color: "#849495" }}
          >
            BOOT SEQUENCE
          </span>
          <span
            className="font-mono text-xs tabular-nums"
            style={{ color: "#00e38f" }}
          >
            {progress}%
          </span>
        </div>
        <div className="h-px w-full" style={{ background: "#1e2020" }}>
          <div
            className="h-px transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: "#00e38f",
              boxShadow: "0 0 8px #00e38f88",
            }}
          />
        </div>
      </div>

      {/* Bottom label */}
      <div className="mt-8">
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: "#3b494b" }}
        >
          Medicaps University · CSE '27 · DevOps & Cloud
        </span>
      </div>
    </div>
  );
}