import { useState } from "react";
import { Clock, MapPin, Phone, Check } from "lucide-react";
import Reveal from "./Reveal";

const hours = [
  { day: "Lundi", time: "Fermé", closed: true },
  { day: "Mardi — Vendredi", time: "6 h 30 – 19 h 30" },
  { day: "Samedi", time: "6 h 30 – 20 h 00" },
  { day: "Dimanche", time: "7 h 00 – 13 h 00" },
];

export default function FindUs() {
  const [sent, setSent] = useState(false);

  return (
    <section id="trouver" className="bg-page py-24 sm:py-32">
      <div className="container-px grid gap-12 lg:grid-cols-2">
        {/* Left — info + visual */}
        <Reveal>
          <p className="eyebrow">Nous trouver</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-6xl">
            Au coin de la rue,<br />
            <span className="italic text-clay">tous les matins.</span>
          </h2>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] shadow-[0_30px_70px_-45px_rgba(36,25,16,0.6)]">
            <iframe
              title="Carte — Maison Flandrin, 12 rue des Boulangers, 75004 Paris"
              src="https://www.google.com/maps?q=12+rue+des+Boulangers,+75004+Paris&hl=fr&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[16/10] w-full border-0"
            />
          </div>

          <dl className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-clay" />
              <dd className="font-body text-inksoft">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=12+rue+des+Boulangers,+75004+Paris"
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 transition-colors hover:text-clay hover:underline"
                >
                  12, rue des Boulangers · 75004 Paris
                </a>
              </dd>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-clay" />
              <dd className="font-body text-inksoft">01 42 00 19 23</dd>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-clay" />
              <dd className="w-full font-body">
                <ul className="space-y-1.5">
                  {hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex justify-between gap-6 border-b border-line/10 pb-1.5"
                    >
                      <span className="text-inksoft">{h.day}</span>
                      <span
                        className={
                          h.closed ? "text-inkmuted" : "font-medium text-ink"
                        }
                      >
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </Reveal>

        {/* Right — reservation / contact form */}
        <Reveal delay={0.1}>
          <div className="rounded-[1.75rem] bg-espresso p-8 text-ivory sm:p-10">
            <h3 className="font-display text-3xl text-ivory">
              Réserver une commande
            </h3>
            <p className="mt-2 font-body text-sm text-ivory/65">
              Pains spéciaux, gâteaux d'anniversaire, pièces montées — dites-nous
              tout, nous vous rappelons sous 24 h.
            </p>

            {sent ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-8 flex items-center gap-3 rounded-xl bg-gold/15 p-5 text-gold"
              >
                <Check className="h-5 w-5" />
                <span className="font-body text-sm">
                  Merci ! Votre demande est bien partie au fournil.
                </span>
              </div>
            ) : (
              <form
                className="mt-8 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block font-body text-xs uppercase tracking-wider text-ivory/60">
                      Nom
                    </label>
                    <input
                      id="name"
                      required
                      autoComplete="name"
                      className="mt-2 w-full rounded-lg border border-ivory/15 bg-ivory/5 px-4 py-3 font-body text-sm text-ivory placeholder-ivory/40 outline-none transition focus:border-gold"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-body text-xs uppercase tracking-wider text-ivory/60">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      className="mt-2 w-full rounded-lg border border-ivory/15 bg-ivory/5 px-4 py-3 font-body text-sm text-ivory placeholder-ivory/40 outline-none transition focus:border-gold"
                      placeholder="06 ..."
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="msg" className="block font-body text-xs uppercase tracking-wider text-ivory/60">
                    Votre demande
                  </label>
                  <textarea
                    id="msg"
                    rows={4}
                    required
                    className="mt-2 w-full resize-none rounded-lg border border-ivory/15 bg-ivory/5 px-4 py-3 font-body text-sm text-ivory placeholder-ivory/40 outline-none transition focus:border-gold"
                    placeholder="Ex. : un fraisier pour 8 personnes samedi matin"
                  />
                </div>
                <button type="submit" className="btn-primary w-full bg-gold text-espresso hover:bg-crust">
                  Envoyer la demande
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
