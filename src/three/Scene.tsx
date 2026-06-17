"use client";

/**
 * Scene.tsx — Three.js 3D environment for the Phantom Logistics hero.
 *
 * Contains: wireframe globe network, connection arcs with travelling data
 * pulses, particle star field, central phantom emblem, red fog, and
 * red + white lighting. All geometry is procedural — no external models.
 *
 * Communicates with the parent via a shared MutableRefObject<SceneParams>
 * so GSAP ScrollTrigger can drive scroll-based camera & rotation changes
 * without prop-drilling or re-renders.
 */

import { useRef, useEffect, type MutableRefObject } from "react";
import * as THREE from "three";

/* ── Shared parameter contract ──────────────────────────────────────────── */
export interface SceneParams {
  /** 0 → 1 as the hero scrolls out of view */
  scrollProgress: number;
  /** Normalised mouse X: -1 (left) … +1 (right) */
  mouseX: number;
  /** Normalised mouse Y: -1 (bottom) … +1 (top) */
  mouseY: number;
}

interface SceneProps {
  paramsRef: MutableRefObject<SceneParams>;
}

/* ── Component ──────────────────────────────────────────────────────────── */
export default function Scene({ paramsRef }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ────────────────────────────────────────────────────────────────────
       RENDERER
    ──────────────────────────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,                       // transparent so CSS gradient shows
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ────────────────────────────────────────────────────────────────────
       SCENE & FOG
    ──────────────────────────────────────────────────────────────────── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a0000, 0.09); // subtle red fog

    /* ────────────────────────────────────────────────────────────────────
       CAMERA
    ──────────────────────────────────────────────────────────────────── */
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.3, 4.2);

    /* ────────────────────────────────────────────────────────────────────
       LIGHTING
    ──────────────────────────────────────────────────────────────────── */
    // Primary red key light
    const redLight = new THREE.PointLight(0xe10600, 4, 18);
    redLight.position.set(3, 2, 4);
    scene.add(redLight);

    // White accent fill light
    const whiteLight = new THREE.PointLight(0xffffff, 1.2, 22);
    whiteLight.position.set(-4, -1, 5);
    scene.add(whiteLight);

    // Dim ambient — keeps geometry slightly visible in shadow
    const ambient = new THREE.AmbientLight(0x1a0505, 0.4);
    scene.add(ambient);

    /* ────────────────────────────────────────────────────────────────────
       GLOBE — wireframe network
    ──────────────────────────────────────────────────────────────────── */
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Outer wireframe
    const globeGeo = new THREE.IcosahedronGeometry(1.5, 3);
    const edges = new THREE.EdgesGeometry(globeGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xe10600,
      transparent: true,
      opacity: 0.13,
    });
    const wireframe = new THREE.LineSegments(edges, wireMat);
    globeGroup.add(wireframe);

    // Inner counter-rotating shell for depth parallax
    const innerGeo = new THREE.IcosahedronGeometry(1.42, 2);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0xff2e1f,
      transparent: true,
      opacity: 0.05,
    });
    const innerWire = new THREE.LineSegments(innerEdges, innerMat);
    innerWire.rotation.y = Math.PI / 5;
    globeGroup.add(innerWire);

    // Atmosphere glow — slightly larger sphere with backside rendering
    const atmosGeo = new THREE.SphereGeometry(1.62, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0xe10600,
      transparent: true,
      opacity: 0.025,
      side: THREE.BackSide,
    });
    const atmos = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmos);

    /* ── Extract unique vertices for network nodes ─────────────────────── */
    const positions = globeGeo.attributes.position;
    const nodePositions: THREE.Vector3[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < positions.count; i++) {
      const v = new THREE.Vector3(
        positions.getX(i),
        positions.getY(i),
        positions.getZ(i)
      );
      const key = `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`;
      if (!seen.has(key)) {
        seen.add(key);
        nodePositions.push(v);
      }
    }

    // Render nodes as Points
    const nodeGeo = new THREE.BufferGeometry();
    const nodeArr = new Float32Array(nodePositions.length * 3);
    nodePositions.forEach((v, i) => {
      nodeArr[i * 3] = v.x;
      nodeArr[i * 3 + 1] = v.y;
      nodeArr[i * 3 + 2] = v.z;
    });
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodeArr, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    globeGroup.add(nodes);

    /* ── Connection arcs with travelling data pulses ───────────────────── */
    interface ArcData {
      line: THREE.Line;
      mat: THREE.LineBasicMaterial;
      curve: THREE.QuadraticBezierCurve3;
      dot: THREE.Mesh;
      t: number;
      speed: number;
    }

    const arcCount = 14;
    const arcDatas: ArcData[] = [];

    for (let i = 0; i < arcCount; i++) {
      const a = Math.floor(Math.random() * nodePositions.length);
      let b = Math.floor(Math.random() * nodePositions.length);
      while (b === a) b = Math.floor(Math.random() * nodePositions.length);

      const start = nodePositions[a];
      const end = nodePositions[b];
      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(2.1);           // arc outward past the globe surface

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const pts = curve.getPoints(40);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xe10600,
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      globeGroup.add(line);

      // Travelling data pulse dot
      const dotGeo = new THREE.SphereGeometry(0.018, 6, 6);
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      globeGroup.add(dot);

      arcDatas.push({
        line,
        mat: lineMat,
        curve,
        dot,
        t: Math.random(),
        speed: 0.0018 + Math.random() * 0.003,
      });
    }

    /* ── Central emblem — rotating diamond with hex ring ──────────────── */
    const emblemGroup = new THREE.Group();

    const octaGeo = new THREE.OctahedronGeometry(0.14, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0xe10600,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    emblemGroup.add(new THREE.Mesh(octaGeo, octaMat));

    const ringGeo = new THREE.RingGeometry(0.22, 0.25, 6);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe10600,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    emblemGroup.add(new THREE.Mesh(ringGeo, ringMat));

    globeGroup.add(emblemGroup);

    /* ────────────────────────────────────────────────────────────────────
       BACKGROUND PARTICLES — star field
    ──────────────────────────────────────────────────────────────────── */
    const starCount = 900;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 5 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.012,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* ────────────────────────────────────────────────────────────────────
       ANIMATION LOOP
    ──────────────────────────────────────────────────────────────────── */
    let time = 0;
    const cameraTarget = new THREE.Vector3(0, 0.3, 4.2);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.016;

      const { scrollProgress, mouseX, mouseY } = paramsRef.current;

      /* Globe rotation — base spin + scroll boost */
      globeGroup.rotation.y += 0.0012 + scrollProgress * 0.004;
      globeGroup.rotation.x = Math.sin(time * 0.15) * 0.04;

      /* Inner shell counter-rotation */
      innerWire.rotation.y -= 0.0006;

      /* Emblem spin */
      emblemGroup.rotation.y += 0.006;
      emblemGroup.rotation.z = Math.sin(time * 0.4) * 0.12;

      /* Arc pulse + travelling dots */
      arcDatas.forEach((ad) => {
        ad.mat.opacity = 0.12 + Math.sin(time * 1.8 + ad.t * 10) * 0.13;
        ad.t = (ad.t + ad.speed) % 1;
        const p = ad.curve.getPointAt(ad.t);
        ad.dot.position.copy(p);
      });

      /* Star field drift */
      stars.rotation.y += 0.00008;
      stars.rotation.x += 0.00003;

      /* Camera — mouse follow + scroll pull-back */
      cameraTarget.x = mouseX * 0.35;
      cameraTarget.y = 0.3 + mouseY * 0.25;
      cameraTarget.z = 4.2 + scrollProgress * 1.8;

      camera.position.lerp(cameraTarget, 0.025);
      camera.lookAt(0, 0, 0);

      /* Red light pulse — breathing effect */
      redLight.intensity = 4 + Math.sin(time * 1.2) * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    /* ────────────────────────────────────────────────────────────────────
       RESIZE
    ──────────────────────────────────────────────────────────────────── */
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    /* ────────────────────────────────────────────────────────────────────
       CLEANUP — dispose every GPU resource
    ──────────────────────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);

      // Geometries
      [globeGeo, edges, innerGeo, innerEdges, atmosGeo, nodeGeo, octaGeo, ringGeo, starGeo]
        .forEach((g) => g.dispose());

      // Materials
      [wireMat, innerMat, atmosMat, nodeMat, octaMat, ringMat, starMat]
        .forEach((m) => m.dispose());

      // Arc geometries + materials + dot geometries/materials
      arcDatas.forEach((ad) => {
        ad.line.geometry.dispose();
        ad.mat.dispose();
        ad.dot.geometry.dispose();
        (ad.dot.material as THREE.Material).dispose();
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [paramsRef]);

  return <div ref={containerRef} className="hero-canvas-wrap" />;
}
