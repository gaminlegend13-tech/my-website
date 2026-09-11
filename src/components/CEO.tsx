import { Quote } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function CEO() {
  return (
    <section id="ceo" className="relative overflow-hidden bg-primary-950 py-24">
      {/* Decorative blobs */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary-800/40 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-primary-700/30 blur-3xl" />

      {/* Logo watermark */}
      <img
        src="/logo_latest.jpeg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[16rem] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.07] sm:w-[20rem] lg:w-[24rem]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          {/* Image */}
          <div className="reveal lg:col-span-2">
            <div className="relative mx-auto max-w-sm">
              <div className="overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/10">
                <img
                  src={siteData.ceo.image}
                  alt={siteData.ceo.name}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-500 px-6 py-2 text-sm font-bold text-accent-950 shadow-lg">
                {siteData.ceo.title}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal reveal-delay-2 lg:col-span-3">
            <span className="inline-block rounded-full border border-primary-300/30 bg-primary-800/40 px-4 py-1.5 text-sm font-semibold text-primary-100">
              Our Leadership
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
              {siteData.ceo.name}
            </h2>
            <p className="mt-1 text-lg font-medium text-accent-400">
              {siteData.ceo.title}
            </p>

            <div className="mt-8 relative">
              <Quote className="absolute -top-2 -left-2 h-10 w-10 text-primary-700/50" />
              <p className="relative pl-10 text-lg leading-relaxed text-primary-100/90">
                {siteData.ceo.bio}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-3 rounded-2xl border border-primary-300/20 bg-primary-800/30 px-5 py-3">
                <div className="text-center">
                  <p className="font-display text-2xl font-extrabold text-white">2008</p>
                  <p className="text-xs text-primary-200">Founded G2 Pharmacy</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-primary-300/20 bg-primary-800/30 px-5 py-3">
                <div className="text-center">
                  <p className="font-display text-2xl font-extrabold text-white">5</p>
                  <p className="text-xs text-primary-200">Branches Established</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-primary-300/20 bg-primary-800/30 px-5 py-3">
                <div className="text-center">
                  <p className="font-display text-2xl font-extrabold text-white">17+</p>
                  <p className="text-xs text-primary-200">Years of Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
