import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const RIBBON_WORDS = ["DEVOPS", "AWS", "SECURITY", "BACKEND", "AI"];

export default function Preloader({ onComplete }) {
  const mountRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);

  // ── Three.js scene ──────────────────────────────────────────────────────────
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 2.2, 5.5);
    camera.lookAt(0, 0, 0);

    // ── Torus curve ────────────────────────────────────────────────────────────
    class TorusCurve extends THREE.Curve {
      getPoint(t) {
        const a = t * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(a) * 1.8,
          Math.sin(a) * 0.42,
          Math.sin(a) * 1.8
        );
      }
    }
    const curve = new TorusCurve();

    // ── Ribbon geometry ────────────────────────────────────────────────────────
    const SEG      = 260;
    const RIBBON_W = 0.52;
    const positions   = [];
    const normals_arr = [];
    const uvs         = [];
    const indices     = [];

    for (let i = 0; i <= SEG; i++) {
      const t  = i / SEG;
      const t2 = (i + 1) / SEG;
      const p  = curve.getPoint(t);
      const p2 = curve.getPoint(t2 % 1);

      const tang   = new THREE.Vector3().subVectors(p2, p).normalize();
      const up     = new THREE.Vector3(0, 1, 0);
      const binorm = new THREE.Vector3().crossVectors(tang, up).normalize();
      const norm   = new THREE.Vector3().crossVectors(binorm, tang).normalize();

      positions.push(
        p.x + norm.x * RIBBON_W, p.y + norm.y * RIBBON_W, p.z + norm.z * RIBBON_W,
        p.x - norm.x * RIBBON_W, p.y - norm.y * RIBBON_W, p.z - norm.z * RIBBON_W
      );
      normals_arr.push(norm.x, norm.y, norm.z, norm.x, norm.y, norm.z);
      uvs.push(t, 1, t, 0);
    }

    for (let i = 0; i < SEG; i++) {
      const a = i * 2;
      const b = (i + 1) * 2;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }

    const ribbonGeo = new THREE.BufferGeometry();
    ribbonGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    ribbonGeo.setAttribute("normal",   new THREE.Float32BufferAttribute(normals_arr, 3));
    ribbonGeo.setAttribute("uv",       new THREE.Float32BufferAttribute(uvs, 2));
    ribbonGeo.setIndex(indices);

    // ── Canvas texture ─────────────────────────────────────────────────────────
    // Strategy: measure one full loop of text, make the canvas EXACTLY that wide,
    // draw the text once. RepeatWrapping tiles it — zero overlap, zero gap.
    const TEX_H    = 200;
    const FONT_PX  = 72;
    const SEP      = "   ·   ";
    const loopStr  = RIBBON_WORDS.join(SEP) + SEP;

    // Measure on a temp canvas (no size needed, just to get metrics)
    const measureCanvas = document.createElement("canvas");
    const mctx = measureCanvas.getContext("2d");
    mctx.font = `900 ${FONT_PX}px 'JetBrains Mono', monospace`;
    const loopPx = Math.ceil(mctx.measureText(loopStr).width);

    // Main texture canvas is EXACTLY one loop wide
    const texCanvas = document.createElement("canvas");
    texCanvas.width  = loopPx;
    texCanvas.height = TEX_H;
    const ctx = texCanvas.getContext("2d");

    ctx.clearRect(0, 0, loopPx, TEX_H);
    ctx.font         = `900 ${FONT_PX}px 'JetBrains Mono', monospace`;
    ctx.textBaseline = "middle";
    ctx.fillStyle    = "#080808";
    // Draw exactly one loop — RepeatWrapping handles the tiling
    ctx.fillText(loopStr, 0, TEX_H / 2);

    const texture = new THREE.CanvasTexture(texCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    // No repeat override needed — UV goes 0→1 and texture tiles naturally

    const ribbonMat = new THREE.MeshBasicMaterial({
      map:         texture,
      side:        THREE.DoubleSide,
      transparent: true,
      alphaTest:   0.05,
    });

    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    scene.add(ribbon);

    // ── Pointer reactivity ─────────────────────────────────────────────────────
    const mouse  = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animate ────────────────────────────────────────────────────────────────
    let raf;
    const BASE_SPIN = 0.008;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      target.x += (mouse.x - target.x) * 0.06;
      target.y += (mouse.y - target.y) * 0.06;

      ribbon.rotation.y += BASE_SPIN + target.x * 0.012;
      ribbon.rotation.x  = target.y * 0.35;
      ribbon.rotation.z  = -target.x * 0.12;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────────────────────
    const onResize = () => {
      const nW = mount.clientWidth;
      const nH = mount.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();
      texture.dispose();
    };
  }, []);

  // ── Percent counter ────────────────────────────────────────────────────────
  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 2.5 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => onComplete?.(), 700);
        }, 500);
      }
      setPercent(Math.round(p));
    }, 80);
    return () => clearInterval(iv);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={styles.root}
        >
          <div ref={mountRef} style={styles.canvas} />

          <div style={styles.counter}>
            <span style={styles.pct}>{percent}%</span>
            <div style={styles.barTrack}>
              <div style={{ ...styles.barFill, width: `${percent}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  root: {
    position:       "fixed",
    inset:          0,
    zIndex:         9999,
    background:     "var(--color-linen)",
    display:        "flex",
    flexDirection:  "column",
    alignItems:     "center",
    justifyContent: "center",
    fontFamily:     "var(--font-mono)",
  },
  canvas: {
    width:  "780px",
    height: "560px",
  },
  counter: {
    marginTop:     "28px",
    display:       "flex",
    flexDirection: "column",
    alignItems:    "center",
    gap:           "12px",
  },
  pct: {
    fontSize:      "22px",
    fontWeight:    "700",
    color:         "var(--color-ink)",
    letterSpacing: "0.05em",
    fontFamily:    "var(--font-mono)",
  },
  barTrack: {
    width:      "160px",
    height:     "1px",
    background: "var(--color-ash)",
    position:   "relative",
    overflow:   "hidden",
  },
  barFill: {
    position:   "absolute",
    top:        0,
    left:       0,
    height:     "100%",
    background: "var(--color-ink)",
    transition: "width 0.1s linear",
  },
};