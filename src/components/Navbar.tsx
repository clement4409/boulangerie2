import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "../lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "../context/CartContext";

function CartButton({ className }: { className?: string }) {
  const { count, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Ouvrir le panier, ${count} article${count > 1 ? "s" : ""}`}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-70",
        className
      )}
    >
      <ShoppingBag className="h-[18px] w-[18px]" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-clay px-1 font-body text-[10px] font-semibold text-ivory">
          {count}
        </span>
      )}
    </button>
  );
}

const links = [
  { label: "La Maison", href: "#maison" },
  { label: "La Carte", href: "#carte" },
  { label: "Le Savoir-faire", href: "#savoir-faire" },
  { label: "Avis", href: "#avis" },
  { label: "Nous trouver", href: "#trouver" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line/10 bg-page/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      {/* Legibility scrim for the white logo/links over the hero */}
      {!scrolled && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-espresso/60 via-espresso/25 to-transparent"
        />
      )}
      <nav className="container-px flex items-center justify-between py-4">
        <a
          href="#top"
          className={cn(
            "font-display text-2xl tracking-tight transition-colors",
            scrolled ? "text-ink" : "text-ivory"
          )}
        >
          Maison Flandrin<sup className="text-[0.5em] align-super">®</sup>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "font-body text-sm transition-colors",
                  scrolled
                    ? "text-inksoft hover:text-ink"
                    : "text-ivory/80 hover:text-ivory"
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <CartButton className={scrolled ? "text-ink" : "text-ivory"} />
          <ThemeToggle className={scrolled ? "text-ink" : "text-ivory"} />
          <a
            href="#trouver"
            className={cn(
              "inline-flex items-center rounded-full px-6 py-2.5 font-body text-sm font-medium transition-all duration-300 hover:scale-[1.03]",
              scrolled
                ? "bg-ink text-page"
                : "bg-ivory text-espresso"
            )}
          >
            Commander
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <CartButton className={scrolled ? "text-ink" : "text-ivory"} />
          <ThemeToggle className={scrolled ? "text-ink" : "text-ivory"} />
        <button
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
          className={cn(scrolled ? "text-ink" : "text-ivory")}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-line/10 bg-page/95 backdrop-blur-md md:hidden">
          <ul className="container-px flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 font-body text-base text-inksoft hover:bg-ink/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#trouver"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Commander
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
