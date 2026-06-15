import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { asset } from "../lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Cinematic enter-the-bakery hero — GSAP ScrollTrigger image sequence.
 *
 * The section is pinned; scrolling scrubs a 151-frame walk-in painted on a
 * canvas. ScrollTrigger's `scrub` adds smoothing so the playhead eases toward
 * the scroll position — no jank. Past the sequence, the ambient overlay fades
 * in over the final frame.
 */
const FRAME_COUNT = 151;
const framePath = (i: number) =>
  asset(`media/frames/frame-${String(i).padStart(3, "0")}.jpg`);

export default function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLVideoElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnRef = useRef<HTMLImageElement | null>(null);

  const [entered, setEntered] = useState(false);
  const [stage, setStage] = useState(0); // 0: intro · 1: invitation · 2: welcome
  const [started, setStarted] = useState(false);
  const reduce = useReducedMotion();

  // --- Canvas helpers ---------------------------------------------------------
  const sizeCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.floor(window.innerWidth * dpr);
    c.height = Math.floor(window.innerHeight * dpr);
  };

  const drawFrame = (index: number) => {
    const c = canvasRef.current;
    if (!c) return;
    const imgs = imagesRef.current;
    let img = imgs[index];
    if (!img || !img.complete || !img.naturalWidth) {
      img = lastDrawnRef.current || img;
      if (!img || !img.complete || !img.naturalWidth) return;
    }
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const cw = c.width;
    const ch = c.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    lastDrawnRef.current = img;
  };

  // --- GSAP ScrollTrigger setup ----------------------------------------------
  useGSAP(
    () => {
      // Preload the frame sequence.
      const imgs: HTMLImageElement[] = [];
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = framePath(i);
        imgs.push(img);
      }
      imagesRef.current = imgs;
      sizeCanvas();
      imgs[0].onload = () => drawFrame(0);
      if (imgs[0].complete) drawFrame(0);

      const LAST = FRAME_COUNT - 1;

      const updateStates = (p: number) => {
        setStarted((prev) => prev || p > 0.01);
        const s = p < 0.4 ? 0 : p < 0.78 ? 1 : 2;
        setStage((prev) => (prev === s ? prev : s));
        const e = p >= 0.92;
        setEntered((prev) => (prev === e ? prev : e));
      };

      if (reduce) {
        // No scrubbing: show the final frame and the welcome immediately.
        imgs[LAST].onload = () => drawFrame(LAST);
        if (imgs[LAST].complete) drawFrame(LAST);
        updateStates(1);
        return;
      }

      const frameObj = { frame: 0 };
      gsap.to(frameObj, {
        frame: LAST,
        ease: "none",
        onUpdate: () => drawFrame(Math.round(frameObj.frame)),
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 4.5,
          pin: true,
          scrub: 0.6, // smoothing: playhead eases toward scroll position
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateStates(self.progress),
        },
      });

      const onResize = () => {
        sizeCanvas();
        drawFrame(Math.round(frameObj.frame));
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: sectionRef, dependencies: [reduce] }
  );

  // --- Ambient overlay: loop the segment [8s … duration − 5s] ----------------
  useEffect(() => {
    if (!entered) return;
    const o = overlayRef.current;
    if (!o) return;
    const START = 8;
    const TAIL = 5;
    let raf = 0;
    const loop = () => {
      const dur = o.duration || 0;
      if (dur && (o.currentTime >= dur - TAIL || o.ended)) {
        try {
          o.currentTime = START;
        } catch {
          /* not seekable yet */
        }
        if (o.paused) o.play().catch(() => {});
      }
      raf = requestAnimationFrame(loop);
    };
    const begin = () => {
      try {
        o.currentTime = START;
      } catch {
        /* not seekable yet */
      }
      o.play().catch(() => {});
      raf = requestAnimationFrame(loop);
    };
    if (o.readyState >= 1) begin();
    else o.addEventListener("loadedmetadata", begin, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      o.removeEventListener("loadedmetadata", begin);
    };
  }, [entered]);

  const textTransition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-espresso">
      {/* Scroll-driven frame sequence */}
      <canvas
        ref={canvasRef}
        style={{ filter: "url(#hero-sharpen)" }}
        className="absolute inset-0 h-full w-full"
      />

      {/* Real unsharp-mask sharpening kernel applied to the canvas above */}
      <svg className="absolute h-0 w-0" aria-hidden focusable="false">
        <filter id="hero-sharpen">
          <feConvolveMatrix
            order="3 3"
            preserveAlpha="true"
            kernelMatrix="0 -0.35 0 -0.35 2.4 -0.35 0 -0.35 0"
          />
        </filter>
      </svg>

      {/* Dark golden veil over the frame sequence */}
      <div className="pointer-events-none absolute inset-0 bg-[#3a2606]/45" />
      <div className="pointer-events-none absolute inset-0 bg-[#caa14a] opacity-25 mix-blend-overlay" />

      {/* Ambient overlay video — appears only after the sequence ends */}
      <video
        ref={overlayRef}
        src={asset("/media/maison-passion.mp4")}
        muted
        playsInline
        preload="auto"
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          entered ? "opacity-90" : "opacity-0"
        }`}
      />

      {/* Same golden veil, lighter, over the overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[#3a2606]/30" />
      <div className="pointer-events-none absolute inset-0 bg-[#caa14a] opacity-[0.18] mix-blend-overlay" />

      {/* Readability gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 22vmax rgba(0,0,0,0.45)" }}
      />

      {/* ============================ TEXT ============================ */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Intro */}
        <motion.div
          animate={{ opacity: stage === 0 ? 1 : 0, y: reduce ? 0 : stage === 0 ? 0 : -45 }}
          transition={textTransition}
          className="absolute"
        >
          <p className="font-body text-xs uppercase tracking-[0.45em] text-gold drop-shadow animate-fade-rise">
            Boulangerie artisanale · depuis 1923
          </p>
          <h1 className="mt-5 font-display text-[15vw] font-normal leading-[0.92] tracking-tightest text-ivory drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:text-[12vw] md:text-[9.5rem] animate-fade-rise-delay">
            Maison <span className="italic text-gold">Flandrin</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-ivory/85 drop-shadow animate-fade-rise-delay-2">
            Le pain au levain, les viennoiseries pur beurre et les pâtisseries
            façonnées à la main chaque matin, avant que la ville ne s'éveille.
          </p>
        </motion.div>

        {/* Mid — invitation while advancing in */}
        <motion.p
          animate={{ opacity: stage === 1 ? 1 : 0, y: reduce ? 0 : stage === 1 ? 0 : stage < 1 ? 40 : -40 }}
          transition={textTransition}
          className="absolute max-w-2xl font-display text-4xl italic leading-tight text-ivory drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] sm:text-6xl"
        >
          Avancez.<br />
          <span className="text-gold not-italic">L'odeur du beurre chaud vous guide.</span>
        </motion.p>

        {/* Welcome — once inside */}
        <motion.div
          animate={{ opacity: stage === 2 ? 1 : 0, y: reduce ? 0 : stage === 2 ? 0 : 50 }}
          transition={textTransition}
          style={{ pointerEvents: stage === 2 ? "auto" : "none" }}
          className="absolute"
        >
          <p className="font-body text-xs uppercase tracking-[0.4em] text-gold/90">Bienvenue</p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] text-ivory drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] sm:text-7xl md:text-8xl">
            Entrez, le pain est<br />
            <span className="italic text-gold">encore chaud.</span>
          </h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="#carte" className="btn-primary bg-gold text-espresso hover:bg-crust">
              Découvrir la carte
            </a>
            <a
              href="#trouver"
              className="btn-ghost border-ivory/35 text-ivory hover:border-ivory/70 hover:bg-ivory/10"
            >
              Nous trouver
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ opacity: started ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/80"
      >
        <span className="font-body text-[0.7rem] uppercase tracking-[0.3em]">
          Faites défiler pour entrer
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.div>
    </section>
  );
}
