import { ArrowRight, ShieldCheck, Truck, HeartPulse } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={siteData.heroImage}
          alt={siteData.heroImageAlt}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/80 to-primary-800/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="reveal is-visible inline-flex items-center gap-2 rounded-full border border-primary-300/30 bg-primary-800/40 px-4 py-1.5 text-sm font-medium text-primary-100 backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4 text-accent-400" />
            Serving Liberia since {siteData.establishedYear}
          </div>

          <h1 className="reveal is-visible reveal-delay-1 mt-6 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Your Trusted Partner
            <span className="block text-primary-200"></span>
          </h1>

          <p className="reveal is-visible reveal-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-primary-100/90">
            G2 Pharmacy provides wholesale and retail of pharmaceutical drugs,
            medical supplies, and hospital supplies — delivering quality
            healthcare products across Monrovia and beyond.
          </p>

          <div className="reveal is-visible reveal-delay-3 mt-8 flex flex-wrap gap-4">
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-base font-semibold text-accent-950 shadow-lg transition-all hover:bg-accent-400 hover:shadow-xl"
            >
              Our Services
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Contact Us
            </a>
          </div>

          {/* Stats */}
          <div className="reveal is-visible reveal-delay-4 mt-14 grid grid-cols-3 gap-6 border-t border-primary-300/20 pt-8">
            <div>
              <p className="font-display text-3xl font-extrabold text-white">17+</p>
              <p className="mt-1 text-sm text-primary-200">Years of Experience</p>
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-white">5</p>
              <p className="mt-1 text-sm text-primary-200">Branches in Monrovia</p>
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-white">3</p>
              <p className="mt-1 text-sm text-primary-200">Core Services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating service badges */}
      <div className="absolute bottom-8 right-8 hidden flex-col gap-3 xl:flex">
        {[
          { icon: Truck, label: "Wholesale" },
          { icon: HeartPulse, label: "Hospital Supplies" },
          { icon: ShieldCheck, label: "Retail Pharmacy" },
        ].map((item, i) => (
          <div
            key={item.label}
            className="animate-float flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md"
            style={{ animationDelay: `${i * 0.8}s` }}
          >
            <item.icon className="h-5 w-5 text-accent-400" />
            <span className="text-sm font-medium text-white">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 100V40C240 80 480 0 720 20C960 40 1200 80 1440 40V100H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
