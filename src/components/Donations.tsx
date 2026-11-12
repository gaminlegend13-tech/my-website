import { useRef } from "react";
import { Heart } from "lucide-react";
import { siteData } from "@/data/siteData";
import Capsule from "@/components/Capsule";
import SectionHeader from "@/components/SectionHeader";
import { useScrollFx } from "@/hooks/useScrollFx";
import { viewProgress } from "@/lib/scroll";

// Each column starts at a different height and drifts at its own speed.
const columns = [
  { offset: "md:mt-28", speed: 50 },
  { offset: "", speed: 130 },
  { offset: "md:mt-14", speed: 90 },
];

export default function Donations() {
  const grid = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLElement | null)[]>([]);

  useScrollFx((f) => {
    if (!grid.current) return;
    const side = f.vw >= 768;
    const r = grid.current.getBoundingClientRect();
    if (r.bottom < -200 || r.top > f.vh + 200) return;
    const p = viewProgress(grid.current, f);
    items.current.forEach((item, i) => {
      if (!item) return;
      item.style.transform = side
        ? `translate3d(0, ${((0.5 - p) * columns[i % columns.length].speed).toFixed(1)}px, 0)`
        : "";
    });
  });

  return (
    <section id="donations" className="bg-leaf-950 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          title="Community comes first."
          intro="We believe in giving back to the communities that have supported us. Here are some of our donation and outreach initiatives."
        />

        <div ref={grid} className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-6 lg:gap-10">
          {siteData.donations.map((donation, index) => {
            const column = columns[index % columns.length];
            return (
              <article
                key={donation.title}
                ref={(node) => (items.current[index] = node)}
                className={`will-change-transform ${column.offset}`}
              >
                <div className="relative">
                  <Capsule
                    name={donation.image}
                    widths={[640, 1000]}
                    sizes="(min-width: 768px) 32vw, 100vw"
                    alt={donation.title}
                    className={`rounded-[2rem] bg-leaf-900 ${donation.shape === "wide" ? "aspect-[16/11]" : "aspect-[3/4]"}`}
                    parallax={5}
                  />
                  <span className="absolute -right-2 -top-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-leaf-400 text-leaf-950">
                    <span className="ping-ring absolute inset-0 rounded-full bg-leaf-400" aria-hidden="true" />
                    <Heart className="relative h-5 w-5" fill="currentColor" />
                  </span>
                </div>
                <h3 className="reveal mt-6 text-2xl font-bold text-white">{donation.title}</h3>
                <p className="reveal reveal-delay-1 mt-2.5 leading-relaxed text-leaf-100/80">{donation.description}</p>
              </article>
            );
          })}
        </div>

        <p className="reveal mt-16 border-t border-white/15 pt-6 text-sm text-leaf-100/70 md:mt-24">
          More photos and details of our donation activities are coming soon.
        </p>
      </div>
    </section>
  );
}
