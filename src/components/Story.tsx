import Reveal from "./Reveal";
import FadeLoopVideo from "./FadeLoopVideo";
import { asset } from "../lib/utils";

const stats = [
  { value: "1923", label: "Année de fondation" },
  { value: "5 h", label: "La première fournée" },
  { value: "100 %", label: "Levain naturel" },
  { value: "3", label: "Générations d'artisans" },
];

export default function Story() {
  return (
    <section id="maison" className="bg-page py-24 sm:py-32">
      <div className="container-px grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="grain relative overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(36,25,16,0.5)]">
            <FadeLoopVideo
              src={asset("/media/videotexte.mp4")}
              poster={asset("/media/etalage.jpg")}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
          </div>
          <div className="absolute -bottom-7 -left-5 hidden rounded-2xl bg-espresso px-7 py-5 text-ivory shadow-xl sm:block">
            <p className="font-display text-3xl italic text-gold">« La passion,</p>
            <p className="font-display text-2xl">pétrie chaque matin. »</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">La Maison</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-6xl">
              Une maison fondée<br />
              <span className="italic text-clay">sur la passion.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl font-body text-[1.05rem] leading-relaxed text-inksoft">
              Depuis trois générations, la même obsession nous réveille avant
              l'aube : faire le meilleur pain de la ville. Nous travaillons des
              farines de meule sur pierre, un levain entretenu depuis des
              décennies, et un beurre AOP que l'on tourne à la main.
            </p>
            <p className="mt-4 max-w-xl font-body text-[1.05rem] leading-relaxed text-inksoft">
              Rien ne sort du fournil qui ne nous rendrait pas fiers de le
              tendre par-dessus le comptoir, encore tiède.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line/10 pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-4xl text-clay">{s.value}</dt>
                  <dd className="mt-1 font-body text-xs uppercase tracking-wider text-inkmuted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
