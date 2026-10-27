import { Pill, Package, Stethoscope } from "lucide-react";
import { siteData } from "@/data/siteData";
import Img from "@/components/Img";
import SectionHeader from "@/components/SectionHeader";

const iconMap: Record<string, typeof Pill> = { Pill, Package, Stethoscope };

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          label="Services"
          title="Three ways we keep Liberia supplied."
          intro="From individual customers to hospitals and wholesale partners, G2 Pharmacy delivers complete pharmaceutical solutions."
        />

        <ol className="mt-16 border-t border-navy-900/10">
          {siteData.services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Pill;
            return (
              <li
                key={service.title}
                className="reveal group grid gap-6 border-b border-navy-900/10 py-8 md:grid-cols-12 md:items-center md:gap-8 lg:py-10"
              >
                <span className="font-display text-5xl font-extrabold text-navy-900/15 transition-colors group-hover:text-leaf-500 md:col-span-1 lg:text-6xl">
                  0{index + 1}
                </span>
                <div className="md:col-span-6 lg:col-span-5">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-navy-600" strokeWidth={1.75} />
                    <h3 className="text-2xl font-bold sm:text-3xl">{service.title}</h3>
                  </div>
                  <p className="mt-3 max-w-md text-[17px] leading-relaxed text-navy-950/65">
                    {service.description}
                  </p>
                </div>
                <div className="overflow-hidden rounded-2xl bg-navy-100 md:col-span-5 lg:col-span-6">
                  <Img
                    name={service.image}
                    widths={[640, 1000]}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    alt={service.title}
                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
