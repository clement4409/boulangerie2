import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { categories, products } from "../data";
import Reveal from "./Reveal";
import { cn, asset } from "../lib/utils";
import { useCart } from "../context/CartContext";

export default function Products() {
  const { add } = useCart();
  const [active, setActive] = useState<(typeof categories)[number]>("Tout");
  const visible =
    active === "Tout" ? products : products.filter((p) => p.category === active);

  return (
    <section id="carte" className="bg-surface py-24 sm:py-32">
      <div className="container-px">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">La Carte</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-6xl">
            La vitrine du jour
          </h2>
          <p className="mt-5 font-body text-[1.05rem] leading-relaxed text-inksoft/75">
            Tout est fait maison, tout est fait le matin même. Voici une sélection
            de ce que vous trouverez sur l'étalage aujourd'hui.
          </p>
        </Reveal>

        {/* Filter */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-5 py-2 font-body text-sm transition-all duration-300",
                active === c
                  ? "border-ink bg-ink text-page"
                  : "border-line/30 text-inksoft hover:border-ink/50"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-[0_18px_40px_-28px_rgba(36,25,16,0.5)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={asset(p.image)}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 font-body text-[0.7rem] uppercase tracking-wider text-inksoft backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-display text-2xl text-ink">{p.name}</h3>
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-inksoft">
                      {p.note}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-body text-lg font-semibold text-clay">{p.price}</p>
                    <button
                      onClick={() => add(p)}
                      aria-label={`Ajouter ${p.name} au panier`}
                      className="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-page transition-transform hover:scale-110 active:scale-95"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
