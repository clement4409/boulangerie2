import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { asset } from "../lib/utils";

const panels = [
  {
    name: "La Baguette de Tradition",
    note: "Croûte caramélisée, mie crème, 24 h de pousse lente.",
    price: "1,40 €",
    image: "/media/baguette.jpg",
  },
  {
    name: "Le Croissant pur beurre",
    note: "Beurre AOP, 27 couches, feuilletage qui éclate.",
    price: "1,30 €",
    image: "/media/croissant.jpg",
  },
  {
    name: "Le Kouign-amann",
    note: "Beurre et sucre caramélisés, la fierté bretonne.",
    price: "3,60 €",
    image: "/media/kouign-amann.jpg",
  },
  {
    name: "Le Fraisier",
    note: "Fraises de saison, mousseline vanille de Madagascar.",
    price: "5,90 €",
    image: "/media/fraisier.jpg",
  },
  {
    name: "La Tarte Tatin",
    note: "Pommes confites au beurre salé, pâte brisée maison.",
    price: "5,40 €",
    image: "/media/tartetatin.jpg",
  },
];

export default function HorizontalShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);

  // Measure how far the track must travel horizontally.
  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // On reduced motion / small screens, fall back to native horizontal scroll.
  const [native, setNative] = useState(false);
  useEffect(() => {
    setNative(reduce || window.matchMedia("(max-width: 767px)").matches);
  }, [reduce]);

  const cards = (
    <div
      ref={trackRef}
      className={
        native
          ? "flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6"
          : "flex gap-8 px-[8vw]"
      }
    >
      {/* Intro panel */}
      <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-center sm:w-[34vw]">
        <p className="eyebrow text-gold">La sélection</p>
        <h2 className="mt-4 font-display text-5xl leading-[1] text-ivory sm:text-6xl">
          Les<br />
          <span className="italic text-gold">incontournables.</span>
        </h2>
        <p className="mt-5 max-w-xs font-body text-[1.05rem] leading-relaxed text-ivory/65">
          Cinq classiques qui font la réputation de la maison. Faites glisser
          pour les découvrir, un à un.
        </p>
        <span className="mt-8 inline-flex items-center gap-2 font-body text-sm text-gold">
          Faire défiler <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      {panels.map((p) => (
        <article
          key={p.name}
          className="group relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden rounded-[1.75rem] sm:w-[30vw] sm:min-w-[360px]"
        >
          <img
            src={asset(p.image)}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/10 to-transparent" />
          <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 font-body text-sm font-semibold text-espresso">
            {p.price}
          </span>
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="font-display text-3xl text-ivory">{p.name}</h3>
            <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-ivory/75">
              {p.note}
            </p>
          </div>
        </article>
      ))}
    </div>
  );

  if (native) {
    return (
      <section className="bg-espresso py-20">
        {cards}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative bg-espresso" style={{ height: "520vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="will-change-transform">
          {cards}
        </motion.div>
      </div>
    </section>
  );
}
