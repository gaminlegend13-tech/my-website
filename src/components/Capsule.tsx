import { useRef } from "react";
import Img from "@/components/Img";
import { useScrollFx } from "@/hooks/useScrollFx";
import { viewProgress } from "@/lib/scroll";

type Props = {
  name: string;
  widths: number[];
  sizes: string;
  alt: string;
  /** Size, aspect ratio and corner radius of the frame. */
  className?: string;
  imgClassName?: string;
  /** Classes for the layer right behind the photo (e.g. a tint to blend into). */
  innerClassName?: string;
  /** Which way the two halves slide apart: "y" = up/down, "x" = left/right. */
  axis?: "x" | "y";
  /** How far the photo drifts inside its frame while scrolling (0 = off). */
  parallax?: number;
};

// A photo that opens like a capsule (a blue half and a green half slide apart
// the first time it scrolls into view) and drifts gently inside its frame.
export default function Capsule({
  name,
  widths,
  sizes,
  alt,
  className = "",
  imgClassName = "",
  innerClassName = "",
  axis = "y",
  parallax = 6,
}: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useScrollFx((f) => {
    if (!parallax || !frame.current || !inner.current) return;
    const r = frame.current.getBoundingClientRect();
    if (r.bottom < -100 || r.top > f.vh + 100) return;
    const p = viewProgress(frame.current, f);
    inner.current.style.transform = `translate3d(0, ${((p - 0.5) * 2 * parallax).toFixed(2)}%, 0)`;
  });

  return (
    <div ref={frame} data-axis={axis} className={`shutter relative overflow-hidden ${className}`}>
      <div ref={inner} className={`absolute inset-x-0 will-change-transform ${parallax ? "-inset-y-[9%]" : "inset-y-0"} ${innerClassName}`}>
        <Img name={name} widths={widths} sizes={sizes} alt={alt} className={`h-full w-full object-cover ${imgClassName}`} />
      </div>
      <span className="shutter-half" aria-hidden="true" />
      <span className="shutter-half" aria-hidden="true" />
    </div>
  );
}
