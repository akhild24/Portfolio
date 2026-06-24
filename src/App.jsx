import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/preLoader";
import Hero from "./components/hero";
import About from "./components/about";
import Telemetry from "./components/telemetry";


export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div style={{ background: "var(--color-dark)", overflowX: "hidden" }}>
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>
 
      {preloaderDone && (
        <>
          <Hero />
          <About />
          <Telemetry />
        </>
      )}
    </div>
  );
}