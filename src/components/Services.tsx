import { Pill, Package, Stethoscope } from "lucide-react";
import { siteData } from "@/data/siteData";

const iconMap: Record<string, typeof Pill> = {
  Pill,
  Package,
  Stethoscope,
};

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            What We Do
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From individual customers to hospitals and wholesale partners, G2
            Pharmacy delivers comprehensive pharmaceutical solutions across
            Liberia.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {siteData.services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Pill;
            return (
              <div
                key={service.title}
                className={`reveal reveal-delay-${index + 1} group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/95 shadow-lg backdrop-blur-sm">
                    <Icon className="h-7 w-7 text-primary-600" strokeWidth={2} />
                  </div>
                </div>
                {/* Body */}
                <div className="p-8">
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
