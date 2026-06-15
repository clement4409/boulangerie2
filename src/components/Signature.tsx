import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { asset } from "../lib/utils";

const steps = [
  {
    n: "01",
    title: "Le levain",
    image: "/media/paindecampagne.jpg",
    text: "Un chef de levain entretenu depuis 1923, rafraîchi deux fois par jour. C'est lui qui donne au pain son acidité fine et sa conservation.",
  },
  {
    n: "02",
    title: "Le feuilletage",
    image: "/media/painchocolat.jpg",
    text: "Le beurre AOP est tourné à la main, plié, reposé au froid. Vingt-sept couches qui éclatent sous la dent — sans jamais graisser les doigts.",
  },
  {
    n: "03",
    title: "La cuisson",
    image: "/media/baguette.jpg",
    text: "Cuisson sur sole, à la buée, dans un four à gueulard. La croûte chante en refroidissant : le seul label qui compte vraiment.",
  },
];

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div
      ref={ref}
      className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] shadow-[0_30px_70px_-40px_rgba(36,25,16,0.6)]"
    >
      <motion.img
        src={asset(src)}
        alt={alt}
        loading="lazy"
        style={{ y: reduce ? 0 : y, scale: 1.18 }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function Signature() {
  return (
    <section id="savoir-faire" className="relative bg-espresso py-24 text-ivory sm:py-32">
      <div className="container-px">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-gold">Le Savoir-faire</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-ivory sm:text-6xl">
            Trois gestes, mille fois<br />
            <span className="italic text-gold">répétés.</span>
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <ParallaxImage src={s.image} alt={s.title} />
              </Reveal>
              <Reveal delay={0.1}>
                <span className="font-display text-7xl text-gold/30">{s.n}</span>
                <h3 className="mt-3 font-display text-4xl text-ivory">{s.title}</h3>
                <p className="mt-5 max-w-md font-body text-[1.05rem] leading-relaxed text-ivory/70">
                  {s.text}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
