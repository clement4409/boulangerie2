import { specialties } from "../data";

export default function Marquee() {
  const items = [...specialties, ...specialties];
  return (
    <div className="overflow-hidden border-y border-espresso/10 bg-espresso py-5">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap will-change-transform">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl italic text-gold">{s}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-crust/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
