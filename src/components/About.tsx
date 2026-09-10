import { CheckCircle2 } from "lucide-react";
import { siteData } from "@/data/siteData";

const highlights = [
  "Quality-assured pharmaceutical products",
  "Trusted by hospitals and clinics across Liberia",
  "Competitive wholesale and retail pricing",
  "Five convenient locations in Monrovia",
];

export default function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="reveal relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={siteData.aboutImage}
                alt={siteData.aboutImageAlt}
                className="h-[480px] w-full object-cover"
              />
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-primary-600 px-8 py-6 shadow-xl">
              <p className="font-display text-4xl font-extrabold text-white">2008</p>
              <p className="mt-1 text-sm font-medium text-primary-100">Year Established</p>
            </div>
            {/* Decorative accent */}
            <div className="absolute -left-4 -top-4 -z-10 h-32 w-32 rounded-3xl bg-primary-100" />
          </div>

          {/* Text */}
          <div className="reveal reveal-delay-2">
            <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
              About Us
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Committed to Healthcare Excellence in Liberia
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Founded in {siteData.establishedYear} by {siteData.ceo.name}, G2
              Pharmacy has grown into one of Liberia's trusted names in
              pharmaceutical distribution. From our Head Office at Elwa
              Junction to our five branches across Monrovia, we serve retail
              customers, wholesale partners, and hospitals with a shared
              commitment to quality, reliability, and affordability.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              We believe that access to quality medicine is a right, not a
              privilege. That belief drives everything we do — from sourcing
              genuine pharmaceutical products to giving back to the communities
              we serve.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
