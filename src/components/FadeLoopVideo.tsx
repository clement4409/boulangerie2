import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** seconds of fade at each end */
  fade?: number;
};

/**
 * Seamless manual video loop with smooth opacity fades at both ends.
 * Implements the cinematic fade-in / fade-out loop technique:
 *  - fade in over `fade`s at the start (opacity 0 -> 1)
 *  - fade out over `fade`s before the end (opacity 1 -> 0)
 *  - on `ended`: opacity 0, wait 100ms, reset currentTime, play() again
 */
export default function FadeLoopVideo({ src, poster, className, fade = 0.5 }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    video.style.opacity = reduce ? "1" : "0";

    const tick = () => {
      const { currentTime: t, duration: d } = video;
      if (!reduce && d && !Number.isNaN(d)) {
        let opacity = 1;
        if (t < fade) opacity = t / fade; // fade in
        else if (t > d - fade) opacity = Math.max(0, (d - t) / fade); // fade out
        video.style.opacity = String(opacity);
      }
      raf.current = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        void video.play();
      }, 100);
    };

    const start = () => void video.play().catch(() => {});
    video.addEventListener("ended", onEnded);
    video.addEventListener("loadeddata", start);
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", start);
    };
  }, [fade]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      // not using native loop — we drive it manually for the fades
      style={{ transition: "none" }}
    />
  );
}
