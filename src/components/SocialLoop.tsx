import {
  SiInstagram,
  SiFacebook,
  SiTiktok,
  SiGooglemaps,
  SiX,
  SiYoutube,
  SiGmail,
  SiPinterest,
} from "react-icons/si";
import LogoLoop from "./LogoLoop";

const socials = [
  { node: <SiInstagram />, title: "Instagram", href: "https://instagram.com" },
  { node: <SiFacebook />, title: "Facebook", href: "https://facebook.com" },
  { node: <SiTiktok />, title: "TikTok", href: "https://tiktok.com" },
  { node: <SiGooglemaps />, title: "Google Maps", href: "https://maps.google.com" },
  { node: <SiX />, title: "Twitter / X", href: "https://twitter.com" },
  { node: <SiYoutube />, title: "YouTube", href: "https://youtube.com" },
  { node: <SiGmail />, title: "Gmail", href: "https://gmail.com" },
  { node: <SiPinterest />, title: "Pinterest", href: "https://pinterest.com" },
];

export default function SocialLoop() {
  return (
    <section className="bg-espresso pb-16 pt-20 text-gold">
      <div className="container-px mb-10 text-center">
        <p className="eyebrow text-gold">Restons en contact</p>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] text-ivory sm:text-5xl">
          Suivez la <span className="italic text-gold">fournée</span>.
        </h2>
      </div>

      <div className="relative h-[90px] w-full max-w-full overflow-hidden">
        <LogoLoop
          logos={socials}
          speed={90}
          direction="left"
          logoHeight={42}
          gap={72}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#241910"
          ariaLabel="Nos réseaux sociaux"
        />
      </div>
    </section>
  );
}
