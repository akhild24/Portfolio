import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/preLoader";
import Hero, { Navbar } from "./components/hero";
import About from "./components/about";
import Work from "./components/Work";



export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div style={{ background: "var(--color-void)", overflowX: "hidden" }}>
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

        </>
      )}
    </div>
  );
}