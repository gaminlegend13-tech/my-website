import { ArrowRight, MapPin } from "lucide-react";
import { siteData } from "@/data/siteData";
import Img from "@/components/Img";
import Plus from "@/components/Plus";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const stats = [
  { value: `${siteData.yearsOfService}+`, label: "Years serving Liberia" },
  { value: `${siteData.branches.length}`, label: "Branches in Monrovia" },
  { value: `${siteData.services.length}`, label: "Core services" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-[4.25rem]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-16">
        {/* Text */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="eyebrow">
            <Plus className="h-3.5 w-3.5 text-leaf-500" />
            Wholesale &amp; retail pharmacy
          </p>

          <h1 className="mt-6 text-[2.9rem] font-extrabold leading-[0.95] sm:text-7xl lg:text-[5.5rem]">
            Trusted medicine for every{" "}
            <span className="relative whitespace-nowrap text-navy-600">
              Liberian
              <svg
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-3 w-full text-leaf-400 sm:-bottom-2"
                aria-hidden="true"
              >
                <path d="M2 11C70 3 200 1 298 9" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            home.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-navy-950/65 sm:text-xl">
            Genuine pharmaceutical drugs, medical supplies and hospital
            supplies — at the counter, in bulk, and for clinics and hospitals
            across Monrovia and beyond.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#branches" className="btn-navy group">
              <MapPin className="h-4 w-4" />
              Find a branch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={siteData.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon className="h-4 w-4 text-leaf-600" />
              Chat on WhatsApp
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-navy-900/10 border-y border-navy-900/10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col py-5 pr-3 first:pl-0 [&:not(:first-child)]:pl-4 sm:[&:not(:first-child)]:pl-6">
                <dt className="order-2 mt-1 text-xs leading-snug text-navy-950/55 sm:text-sm">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-navy-950 sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photo */}
        <div className="relative lg:col-span-5">
          <div className="relative h-[22rem] overflow-hidden rounded-[2rem] bg-navy-100 sm:h-[28rem] lg:h-full lg:min-h-[36rem]">
            <Img
              name="hero"
              widths={[960, 1600, 2000]}
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt={siteData.heroImageAlt}
              className="h-full w-full object-cover object-[30%_center]"
              priority
            />
          </div>

          {/* Sign-style badge */}
          <div className="absolute -bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl bg-navy-900 p-4 text-white shadow-[0_20px_40px_-12px_rgba(6,15,46,0.45)] sm:left-auto sm:right-6 sm:w-[22rem] lg:-left-10 lg:right-auto">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-leaf-500 text-navy-950">
              <Plus className="h-6 w-6" />
            </span>
            <span>
              <span className="block font-display text-lg font-bold leading-tight">Open across Monrovia</span>
              <span className="text-sm text-navy-200">Elwa · Sinkor · SD Cooper · Red Light</span>
            </span>
          </div>

          {/* Est. stamp */}
          <div className="absolute -top-4 right-4 hidden h-24 w-24 rotate-[-8deg] flex-col items-center justify-center rounded-full border-2 border-dashed border-navy-900/25 bg-paper text-center sm:flex">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-navy-950/50">Est.</span>
            <span className="font-display text-2xl font-extrabold leading-none text-navy-900">
              {siteData.establishedYear}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
