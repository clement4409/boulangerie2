import { Instagram, Facebook, MapPin } from "lucide-react";

const cols = [
  {
    title: "La Maison",
    links: [
      { label: "Notre histoire", href: "#maison" },
      { label: "Le savoir-faire", href: "#savoir-faire" },
      { label: "Les avis", href: "#avis" },
    ],
  },
  {
    title: "La Carte",
    links: [
      { label: "Pains", href: "#carte" },
      { label: "Viennoiseries", href: "#carte" },
      { label: "Pâtisseries", href: "#carte" },
    ],
  },
  {
    title: "Infos",
    links: [
      { label: "Nous trouver", href: "#trouver" },
      { label: "Commander", href: "#trouver" },
      { label: "Recrutement", href: "#trouver" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="grain relative bg-espresso pt-20 text-ivory">
      <div className="container-px grid gap-12 pb-14 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="font-display text-3xl">
            Maison Flandrin<sup className="text-[0.5em] align-super">®</sup>
          </p>
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ivory/60">
            Boulangerie artisanale fondée en 1923. Le bon pain, façonné à la
            main, chaque matin — sans compromis.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, MapPin].map((Icon, i) => (
              <a
                key={i}
                href="#trouver"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-gold/80">
              {c.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-sm text-ivory/70 transition hover:text-ivory"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="font-body text-xs text-ivory/50">
            © {new Date().getFullYear()} Maison Flandrin — Tous droits réservés.
          </p>
          <p className="font-body text-xs text-ivory/50">
            Fait avec passion · Mentions légales · Confidentialité
          </p>
        </div>
      </div>
    </footer>
  );
}
