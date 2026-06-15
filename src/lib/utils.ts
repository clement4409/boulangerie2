export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Resolve a public asset path against Vite's BASE_URL so it works both at the
 * domain root and under a GitHub Pages sub-path. Accepts "/media/x" or "media/x".
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}

/** Parse a display price like "1,40 €" into a number (1.4). */
export function priceToNumber(price: string): number {
  return parseFloat(price.replace(/[^\d,.]/g, "").replace(",", ".")) || 0;
}

/** Format a number as a French euro price ("1,40 €"). */
export function formatEur(value: number): string {
  return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}
