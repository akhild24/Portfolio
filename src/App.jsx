import { useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/preLoader";

// Eagerly trigger chunk downloads in the background while preloader animates
const loadHero = import("./components/hero");
const loadAbout = import("./components/about");
const loadWork = import("./components/Work");
const loadProjects = import("./components/Projects");
const loadSkills = import("./components/Skills");
const loadContact = import("./components/Contact");

const Hero = lazy(() => loadHero);
const About = lazy(() => loadAbout);
const Work = lazy(() => loadWork);
const Projects = lazy(() => loadProjects);
const Skills = lazy(() => loadSkills);
const Contact = lazy(() => loadContact);

// Extract Navbar from the loaded Hero module
const Navbar = lazy(() => loadHero.then((module) => ({ default: module.Navbar })));

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
        <Suspense fallback={null}>
          <Navbar />
          <Hero />
          <About />
          <Work />
          <Projects />
          <Skills />
          <Contact />
        </Suspense>
      )}
    </div>
  );
}