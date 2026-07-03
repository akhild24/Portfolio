import { useState, useEffect } from "react";

export default function TelemetryTicker() {
  const [scrollDepth, setScrollDepth] = useState(0);
  const [activeSection, setActiveSection] = useState("HERO");
  const [uptime, setUptime] = useState("0.0");
  const [memoryAddr, setMemoryAddr] = useState("0x00F3");

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = window.scrollY / docHeight;
      setScrollDepth(progress);

      // Detect current section
      const sections = ["hero", "about", "work", "projects", "skills", "contact"];
      let current = "HERO";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If top of section is past 45% of screen height
          if (rect.top <= window.innerHeight * 0.45) {
            current = section.toUpperCase();
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const start = performance.now();
    const timer = setInterval(() => {
      const diff = ((performance.now() - start) / 1000).toFixed(1);
      setUptime(diff);

      // Random hex registry address simulation
      const hex = "0x" + Math.floor(Math.random() * 65536).toString(16).toUpperCase().padStart(4, "0");
      setMemoryAddr(hex);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:flex fixed bottom-8 right-8 z-[100] w-[180px] bg-[var(--color-void)]/85 backdrop-blur-md border border-[var(--color-graphite)] text-[9px] font-mono text-[var(--color-dim)] select-none flex-col gap-2 p-3 rounded-[3px] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[var(--color-graphite)] pb-1.5 mb-1 text-[var(--color-iron)]">
        <span>TELEMETRY_LOG</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-signal)] animate-pulse" />
          <span className="text-[8px]">SYS_OK</span>
        </div>
      </div>

      {/* Row 1: Section */}
      <div className="flex justify-between items-center">
        <span>ACTIVE_NODE:</span>
        <span className="text-[var(--color-bone)] font-bold">{activeSection}</span>
      </div>

      {/* Row 2: Scroll Depth */}
      <div className="flex justify-between items-center">
        <span>SCROLL_DEPTH:</span>
        <span className="text-[var(--color-signal)] font-bold">{Math.round(scrollDepth * 100)}%</span>
      </div>

      {/* Row 3: Registry Addr */}
      <div className="flex justify-between items-center">
        <span>SYS_ADDR:</span>
        <span className="text-[var(--color-bone)]">{memoryAddr}</span>
      </div>

      {/* Row 4: Uptime */}
      <div className="flex justify-between items-center">
        <span>UPTIME:</span>
        <span className="text-[var(--color-bone)]">{uptime}s</span>
      </div>

      {/* Ticker Progress Bar */}
      <div className="relative h-[2px] bg-[var(--color-smoke)] mt-1 w-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[var(--color-signal)] transition-all duration-75"
          style={{ width: `${scrollDepth * 100}%` }}
        />
      </div>
    </div>
  );
}
