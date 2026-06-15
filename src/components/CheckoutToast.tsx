import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

/**
 * Reads the ?checkout=success|cancel param returned by Stripe Checkout,
 * shows a toast, clears the cart on success, then cleans the URL.
 */
export default function CheckoutToast() {
  const { clear } = useCart();
  const [status, setStatus] = useState<"success" | "cancel" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("checkout");
    if (c === "success" || c === "cancel") {
      setStatus(c);
      if (c === "success") clear();
      // Clean the URL so a refresh doesn't re-trigger.
      params.delete("checkout");
      const url =
        window.location.pathname +
        (params.toString() ? "?" + params.toString() : "");
      window.history.replaceState({}, "", url);
      const t = setTimeout(() => setStatus(null), 6000);
      return () => clearTimeout(t);
    }
  }, [clear]);

  const success = status === "success";

  return (
    <AnimatePresence>
      {status && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-[110] flex max-w-[92vw] items-center gap-3 rounded-full bg-espresso px-6 py-4 text-ivory shadow-2xl"
        >
          {success ? (
            <CheckCircle2 className="h-5 w-5 text-gold" />
          ) : (
            <XCircle className="h-5 w-5 text-clay" />
          )}
          <span className="font-body text-sm">
            {success
              ? "Merci ! Votre commande est confirmée — à très vite à la boutique."
              : "Paiement annulé. Votre panier est conservé."}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
