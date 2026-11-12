import { useRef, type CSSProperties, type PointerEvent } from "react";
import { siteData } from "@/data/siteData";
import Img from "@/components/Img";
import SectionHeader from "@/components/SectionHeader";
import WhatsAppIcon from "@/components/WhatsAppIcon";

// A product card that leans toward the mouse, with the pack floating above it.
function ProductCard({ img, index }: { img: string; index: number }) {
  const card = useRef<HTMLDivElement>(null);

  const lean = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !card.current) return;
    const r = card.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.current.style.setProperty("--rx", `${(-y * 14).toFixed(2)}deg`);
    card.current.style.setProperty("--ry", `${(x * 16).toFixed(2)}deg`);
    card.current.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
    card.current.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const settle = () => {
    card.current?.style.setProperty("--rx", "0deg");
    card.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <figure className="pop" style={{ "--i": index % 3 } as CSSProperties}>
      <div ref={card} onPointerMove={lean} onPointerLeave={settle} className="tilt group relative rounded-[2rem] bg-white p-5 sm:p-9">
        <div className="tilt-lift">
          <Img
            name={img}
            widths={[480, 800]}
            sizes="(min-width: 1024px) 30vw, 48vw"
            alt={`G2 Pharmacy product ${index + 1}`}
            className="bob aspect-square w-full object-contain"
          />
        </div>
        <span aria-hidden="true" className="tilt-glare" />
      </div>
    </figure>
  );
}

export default function Products() {
  return (
    <section id="products" className="py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="On our shelves."
          intro="A selection of the pharmaceutical drugs and medical supplies we carry — sourced from trusted manufacturers and delivered with care."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-6 lg:mt-20 lg:grid-cols-3">
          {siteData.productImages.map((img, index) => (
            <ProductCard key={img} img={img} index={index} />
          ))}
        </div>

        <div className="reveal mt-10 flex flex-col items-start justify-between gap-5 rounded-[2rem] bg-navy-900 p-7 sm:flex-row sm:items-center sm:rounded-full sm:py-5 sm:pl-10 sm:pr-5">
          <p className="text-xl font-semibold text-white">
            Looking for something specific? Ask us about availability.
          </p>
          <a href={siteData.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-leaf flex-shrink-0">
            <WhatsAppIcon className="h-4 w-4" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
