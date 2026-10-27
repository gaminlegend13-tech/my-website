import { siteData } from "@/data/siteData";
import Img from "@/components/Img";
import SectionHeader from "@/components/SectionHeader";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function Products() {
  return (
    <section id="products" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          label="Products"
          title="On our shelves."
          intro="A selection of the pharmaceutical drugs and medical supplies we carry — sourced from trusted manufacturers and delivered with care."
        />

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {siteData.productImages.map((img, index) => (
            <figure
              key={img}
              className="reveal group relative overflow-hidden rounded-2xl border border-navy-900/10 bg-white p-4 transition-shadow hover:shadow-[0_24px_48px_-24px_rgba(10,26,74,0.35)] sm:p-8"
            >
              <Img
                name={img}
                widths={[480, 800]}
                sizes="(min-width: 1024px) 30vw, 48vw"
                alt={`G2 Pharmacy product ${index + 1}`}
                className="aspect-square w-full object-contain transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <span className="absolute left-4 top-4 font-display text-sm font-bold text-navy-900/25">
                0{index + 1}
              </span>
            </figure>
          ))}
        </div>

        <div className="reveal mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-paper p-6 sm:flex-row sm:items-center">
          <p className="font-display text-xl font-semibold text-navy-950">
            Looking for something specific? Ask us about availability.
          </p>
          <a href={siteData.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-leaf">
            <WhatsAppIcon className="h-4 w-4" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
