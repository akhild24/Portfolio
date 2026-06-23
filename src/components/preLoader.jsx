import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const RIBBON_TEXT = "DEVOPS ENGINEER · CLOUD · KUBERNETES · SECURITY · ";

export default function Preloader({ onComplete }) {
  const mountRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);

  // Three.js scene
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 2.8, 5.5);
    camera.lookAt(0, 0, 0);

    // Torus curve class
    class TorusCurve extends THREE.Curve {
      getPoint(t) {
        const a = t * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(a) * 1.6,
          Math.sin(a) * 0.45,
          Math.sin(a) * 1.6
        );
      }
    }

    const curve = new TorusCurve();

    // Build ribbon geometry along the curve
    const SEG = 220;
    const RIBBON_W = 0.48;
    const positions = [];
    const normals_arr = [];
    const uvs = [];
    const indices = [];

    for (let i = 0; i <= SEG; i++) {
      const t = i / SEG;
      const t2 = (i + 1) / SEG;
      const p = curve.getPoint(t);
      const p2 = curve.getPoint(t2 % 1);

      const tang = new THREE.Vector3().subVectors(p2, p).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const binorm = new THREE.Vector3().crossVectors(tang, up).normalize();
      const norm = new THREE.Vector3().crossVectors(binorm, tang).normalize();

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
    ribbonGeo.setAttribute("normal", new THREE.Float32BufferAttribute(normals_arr, 3));
    ribbonGeo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    ribbonGeo.setIndex(indices);

    // Canvas texture — glassmorphic ribbon
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 2048;
    texCanvas.height = 160;
    const texCtx = texCanvas.getContext("2d");

    // Glass base — semi-transparent white
    texCtx.clearRect(0, 0, 2048, 160);
    texCtx.fillStyle = "rgba(255, 255, 255, 0.55)";
    texCtx.fillRect(0, 0, 2048, 160);

    // Top edge highlight (glass rim)
    texCtx.fillStyle = "rgba(255, 255, 255, 0.9)";
    texCtx.fillRect(0, 0, 2048, 3);

    // Bottom edge subtle shadow
    texCtx.fillStyle = "rgba(0, 0, 0, 0.08)";
    texCtx.fillRect(0, 157, 2048, 3);

    // Frosted inner gradient band
    const grad = texCtx.createLinearGradient(0, 0, 0, 160);
    grad.addColorStop(0, "rgba(255,255,255,0.3)");
    grad.addColorStop(0.5, "rgba(255,255,255,0.0)");
    grad.addColorStop(1, "rgba(255,255,255,0.15)");
    texCtx.fillStyle = grad;
    texCtx.fillRect(0, 0, 2048, 160);

    // Bold text
    texCtx.fillStyle = "#0a0a0a";
    texCtx.font = "800 62px 'JetBrains Mono', monospace";
    texCtx.textBaseline = "middle";
    texCtx.letterSpacing = "4px";
    const repeated = (RIBBON_TEXT + RIBBON_TEXT + RIBBON_TEXT).slice(0, 72);
    texCtx.fillText(repeated, 20, 80);

    const texture = new THREE.CanvasTexture(texCanvas);
    texture.wrapS = THREE.RepeatWrapping;

    const ribbonMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
    });

    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    scene.add(ribbon);



    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(3, 5, 3);
    scene.add(dir);

    // Animate
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      ribbon.rotation.y += 0.009;
      renderer.render(scene, camera);
    };
    animate();

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
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();
      texture.dispose();
    };
  }, []);

  // Percent counter
  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 2.5 + 5;
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
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "#f5f5f3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'JetBrains Mono', monospace",
  },
  canvas: {
    width: "700px",
    height: "500px",
  },
  counter: {
    marginTop: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  pct: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#111",
    letterSpacing: "0.05em",
    fontFamily: "'JetBrains Mono', monospace",
  },
  barTrack: {
    width: "160px",
    height: "1px",
    background: "#ccc",
    position: "relative",
    overflow: "hidden",
  },
  barFill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    background: "#111",
    transition: "width 0.1s linear",
  },
};