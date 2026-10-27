import { siteData } from "@/data/siteData";
import Img from "@/components/Img";
import Plus from "@/components/Plus";

const facts = [
  { value: `${siteData.establishedYear}`, label: "Founded G2 Pharmacy" },
  { value: `${siteData.branches.length}`, label: "Branches established" },
  { value: `${siteData.yearsOfService}+`, label: "Years of service" },
];

export default function CEO() {
  return (
    <section id="ceo" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Portrait */}
        <div className="reveal lg:col-span-5">
          <div className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] bg-white">
            <Img
              name={siteData.ceo.image}
              widths={[560, 900]}
              sizes="(min-width: 1024px) 34vw, 90vw"
              alt={siteData.ceo.name}
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-navy-900 px-6 py-4 text-white">
              <span className="font-display text-lg font-bold">{siteData.ceo.name}</span>
              <span className="text-sm text-leaf-400">{siteData.ceo.title}</span>
            </div>
          </div>
        </div>

        {/* Words */}
        <div className="reveal reveal-delay-1 lg:col-span-7">
          <p className="eyebrow">
            <Plus className="h-3.5 w-3.5 text-leaf-500" />
            04 <span className="text-navy-900/30">/</span> Leadership
          </p>

          <h2 className="mt-6 text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-5xl">
            Built on one vision: quality medicine for{" "}
            <span className="text-navy-600">every community</span> in Liberia.
          </h2>

          <p className="mt-8 text-[17px] leading-relaxed text-navy-950/65">{siteData.ceo.bio}</p>

          <dl className="mt-10 grid grid-cols-3 gap-3">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col rounded-2xl border border-navy-900/10 bg-white p-4 sm:p-5">
                <dt className="order-2 mt-1 text-xs text-navy-950/55 sm:text-sm">{f.label}</dt>
                <dd className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
