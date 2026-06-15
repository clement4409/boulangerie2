import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, Loader2, AlertCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { asset, formatEur } from "../lib/utils";
import { getStripe, isStripeConfigured, PRICE_IDS } from "../lib/stripe";

export default function CartDrawer() {
  const { items, total, count, open, setOpen, setQty, remove } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const checkout = async () => {
    setError(null);
    if (!isStripeConfigured()) {
      setError(
        "Paiement en mode démo : ajoutez votre clé Stripe et vos Price IDs dans src/lib/stripe.ts pour activer le paiement réel."
      );
      return;
    }
    const lineItems = items.map((i) => ({
      price: PRICE_IDS[i.name],
      quantity: i.qty,
    }));
    if (lineItems.some((l) => !l.price)) {
      setError("Certains produits n'ont pas de Price ID Stripe configuré.");
      return;
    }
    try {
      setLoading(true);
      const stripe = await getStripe();
      if (!stripe) throw new Error("Stripe indisponible");
      const base = window.location.origin + window.location.pathname;
      // Client-only Checkout (no backend). Cast: this legacy lineItems form is
      // no longer in Stripe's TS types but works when the account has the
      // "client-only integration" enabled.
      const { error } = await (
        stripe as unknown as {
          redirectToCheckout: (o: unknown) => Promise<{ error?: { message?: string } }>;
        }
      ).redirectToCheckout({
        lineItems,
        mode: "payment",
        successUrl: `${base}?checkout=success`,
        cancelUrl: `${base}?checkout=cancel`,
      });
      if (error) setError(error.message ?? "Le paiement n'a pas pu démarrer.");
    } catch (e) {
      setError("Le paiement n'a pas pu démarrer. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Scrim */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* Panel */}
          <motion.aside
            role="dialog"
            aria-label="Panier"
            aria-modal="true"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-page text-ink shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
          >
            {/* Header */}
            <header className="flex items-center justify-between border-b border-line/15 px-6 py-5">
              <h2 className="flex items-center gap-2 font-display text-2xl">
                <ShoppingBag className="h-5 w-5 text-clay" />
                Votre panier
                {count > 0 && (
                  <span className="font-body text-sm text-inkmuted">({count})</span>
                )}
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le panier"
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {/* Items / empty state */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink/5">
                  <ShoppingBag className="h-7 w-7 text-inkmuted" />
                </div>
                <p className="font-display text-2xl">Votre panier est vide</p>
                <p className="max-w-xs font-body text-sm text-inkmuted">
                  Parcourez la carte et ajoutez vos pains et viennoiseries préférés.
                </p>
                <button onClick={() => setOpen(false)} className="btn-primary mt-2">
                  Voir la carte
                </button>
              </div>
            ) : (
              <ul className="flex-1 divide-y divide-line/12 overflow-y-auto px-6">
                {items.map((i) => (
                  <li key={i.name} className="flex gap-4 py-5">
                    <img
                      src={asset(i.image)}
                      alt={i.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg leading-tight">{i.name}</h3>
                        <button
                          onClick={() => remove(i.name)}
                          aria-label={`Retirer ${i.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-inkmuted transition-colors hover:bg-clay/10 hover:text-clay"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="mt-0.5 font-body text-sm text-inkmuted">
                        {i.priceLabel} l'unité
                      </span>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        {/* Quantity stepper */}
                        <div className="flex items-center rounded-full border border-line/25">
                          <button
                            onClick={() => setQty(i.name, i.qty - 1)}
                            aria-label="Diminuer la quantité"
                            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-body text-sm tabular-nums">
                            {i.qty}
                          </span>
                          <button
                            onClick={() => setQty(i.name, i.qty + 1)}
                            aria-label="Augmenter la quantité"
                            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="font-display text-lg text-clay">
                          {formatEur(i.priceEur * i.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <footer className="border-t border-line/15 px-6 py-5">
                {error && (
                  <div
                    role="alert"
                    className="mb-4 flex items-start gap-2 rounded-xl bg-clay/10 p-3 font-body text-sm text-clay"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-body text-sm uppercase tracking-wider text-inkmuted">
                    Total
                  </span>
                  <span className="font-display text-3xl text-ink">{formatEur(total)}</span>
                </div>
                <button
                  onClick={checkout}
                  disabled={loading}
                  className="btn-primary w-full bg-clay text-ivory hover:bg-caramel disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Redirection…
                    </>
                  ) : (
                    "Payer maintenant"
                  )}
                </button>
                <p className="mt-3 text-center font-body text-xs text-inkmuted">
                  Paiement sécurisé par Stripe · TVA incluse
                </p>
              </footer>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
