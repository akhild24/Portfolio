import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/preLoader";
import Hero, { Navbar } from "./components/hero";
import About from "./components/about";
import Work from "./components/Work";
import Projects from "./components/Projects";

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div style={{ background: "var(--color-void)" }}>
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      {preloaderDone && (
        <>
          <Navbar />
          <Hero />
          <About />
          <Work />
          <Projects />
        </>
      )}
    </div>
  );
}