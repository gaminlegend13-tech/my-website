import { useRef } from "react";
import { Pill, Package, Stethoscope } from "lucide-react";
import { siteData } from "@/data/siteData";
import Img from "@/components/Img";
import SectionHeader from "@/components/SectionHeader";
import { useScrollFx } from "@/hooks/useScrollFx";
import { clamp } from "@/lib/scroll";

const iconMap: Record<string, typeof Pill> = { Pill, Package, Stethoscope };

// One colour per card, taken from the shop front: white wall, navy sign, green pillar.
const looks = [
  { card: "bg-white text-navy-950", title: "text-navy-950", body: "text-navy-950/70", icon: "bg-navy-900 text-leaf-400" },
  { card: "bg-navy-950 text-white", title: "text-white", body: "text-navy-200", icon: "bg-leaf-500 text-navy-950" },
  { card: "bg-leaf-500 text-navy-950", title: "text-navy-950", body: "text-navy-950/80", icon: "bg-navy-950 text-leaf-400" },
];

// On larger screens the three cards stack like a deck: each one sticks near
// the top, the next slides over it, and the covered card eases back a little.
export default function Services() {
  const wrappers = useRef<(HTMLDivElement | null)[]>([]);
  const cards = useRef<(HTMLElement | null)[]>([]);

  useScrollFx(() => {
    wrappers.current.forEach((wrapper, i) => {
      const card = cards.current[i];
      const next = wrappers.current[i + 1];
      if (!wrapper || !card) return;
      if (!next) return;
      const style = getComputedStyle(next);
      const stickAt = parseFloat(style.top);
      if (style.position !== "sticky" || Number.isNaN(stickAt)) {
        card.style.transform = "";
        return;
      }
      const covered = clamp(1 - (next.getBoundingClientRect().top - stickAt) / card.offsetHeight);
      card.style.transform = `scale(${(1 - covered * 0.06).toFixed(4)})`;
      card.style.setProperty("--veil", (covered * 0.45).toFixed(3));
    });
  });

  return (
    <section id="services" className="bg-navy-600 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          title="Three ways we keep Liberia supplied."
          intro="From individual customers to hospitals and wholesale partners, G2 Pharmacy delivers complete pharmaceutical solutions."
        />

        <div className="mt-14 space-y-5 md:mt-20 md:space-y-0">
          {siteData.services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Pill;
            const look = looks[index % looks.length];
            return (
              <div
                key={service.title}
                ref={(node) => (wrappers.current[index] = node)}
                className="md:sticky md:pb-8"
                style={{ top: `calc(5.5rem + ${index * 1.5}rem)` }}
              >
                <article
                  ref={(node) => (cards.current[index] = node)}
                  className={`group relative grid origin-top overflow-hidden rounded-[2rem] will-change-transform md:h-[min(31rem,calc(100vh-12rem))] md:grid-cols-2 md:grid-rows-[minmax(0,1fr)] md:rounded-[2.75rem] ${look.card}`}
                >
                  <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-14">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-full ${look.icon}`}>
                      <Icon className="h-6 w-6" strokeWidth={1.9} />
                    </span>
                    <div>
                      <h3 className={`sign text-3xl sm:text-4xl lg:text-5xl ${look.title}`}>{service.title}</h3>
                      <p className={`mt-4 max-w-md text-[17px] leading-relaxed ${look.body}`}>{service.description}</p>
                    </div>
                  </div>
                  <div className="min-h-0 p-3 pt-0 md:p-4 md:pl-0">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] md:aspect-auto md:h-full md:rounded-[2rem]">
                      <Img
                        name={service.image}
                        widths={[640, 1000]}
                        sizes="(min-width: 768px) 45vw, 100vw"
                        alt={service.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-settle group-hover:scale-[1.06]"
                      />
                    </div>
                  </div>
                  {/* Dims the card as the next one slides over it */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-navy-950"
                    style={{ opacity: "var(--veil, 0)" }}
                  />
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
