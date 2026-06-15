import { Star } from "lucide-react";
import { testimonials } from "../data";
import Reveal from "./Reveal";

/**
 * Adapted from the 21st.dev "Testimonials 1" component (Card + Star rating),
 * re-themed to the Maison Flandrin palette.
 */
export default function Testimonials() {
  return (
    <section id="avis" className="bg-surface py-24 sm:py-32">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Ils en parlent</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-6xl">
            On revient toujours<br />
            <span className="italic text-clay">pour la même odeur.</span>
          </h2>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.1}>
              <figure className="flex h-full flex-col rounded-2xl border border-line/10 bg-card p-7 shadow-[0_18px_40px_-30px_rgba(36,25,16,0.5)]">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={
                        idx < t.rating
                          ? "h-4 w-4 fill-gold text-gold"
                          : "h-4 w-4 text-ink/20"
                      }
                    />
                  ))}
                </div>
                <blockquote className="mt-5 grow font-display text-2xl italic leading-snug text-ink">
                  « {t.quote} »
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line/10 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-espresso font-display text-lg text-gold">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-body text-sm font-semibold text-ink">
                      {t.name}
                    </span>
                    <span className="block font-body text-xs text-inkmuted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
