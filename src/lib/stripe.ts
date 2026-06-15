import { loadStripe, type Stripe } from "@stripe/stripe-js";

/**
 * Stripe Checkout — client-only integration (no backend, works on GitHub Pages).
 *
 * Setup (in your Stripe Dashboard):
 *  1. Enable the "client-only" Checkout integration:
 *     Settings → Checkout and Payment Links → enable "Client-only integration".
 *  2. Create a Product + Price for each item and copy the Price ID (price_xxx).
 *  3. Paste your publishable key below and the Price IDs in PRICE_IDS.
 *
 * The key is publishable (pk_…) — safe to ship in the frontend.
 */
export const STRIPE_PUBLISHABLE_KEY = "pk_test_REPLACE_WITH_YOUR_KEY";

/** Map each product name (from data.ts) to its Stripe Price ID. */
export const PRICE_IDS: Record<string, string> = {
  // "Baguette de Tradition": "price_xxx",
  // "Croissant pur beurre": "price_xxx",
  // …
};

export function isStripeConfigured(): boolean {
  return (
    STRIPE_PUBLISHABLE_KEY.startsWith("pk_") &&
    !STRIPE_PUBLISHABLE_KEY.includes("REPLACE")
  );
}

let _stripe: Promise<Stripe | null> | null = null;
export function getStripe(): Promise<Stripe | null> {
  if (!_stripe) _stripe = loadStripe(STRIPE_PUBLISHABLE_KEY);
  return _stripe;
}
