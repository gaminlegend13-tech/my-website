import { siteData } from "@/data/siteData";
import Img from "@/components/Img";
import Plus from "@/components/Plus";

const highlights = [
  "Quality-assured pharmaceutical products",
  "Trusted by hospitals and clinics across Liberia",
  "Competitive wholesale and retail pricing",
  "Five convenient locations in Monrovia",
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Image */}
        <div className="reveal relative lg:col-span-5">
          <div className="overflow-hidden rounded-[2rem] bg-navy-100">
            <Img
              name="about"
              widths={[640, 1000]}
              sizes="(min-width: 1024px) 38vw, 100vw"
              alt={siteData.aboutImageAlt}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-6 rounded-2xl bg-leaf-500 px-6 py-5 text-navy-950">
            <p className="font-display text-4xl font-extrabold leading-none">{siteData.establishedYear}</p>
            <p className="mt-1.5 text-sm font-semibold">Year established</p>
          </div>
        </div>

        {/* Text */}
        <div className="reveal reveal-delay-1 flex flex-col justify-center lg:col-span-7">
          <p className="eyebrow">
            <Plus className="h-3.5 w-3.5 text-leaf-500" />
            01 <span className="text-navy-900/30">/</span> About us
          </p>
          <h2 className="mt-5 text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.75rem]">
            Since {siteData.establishedYear}, we've grown from a single counter
            into one of Liberia's <span className="text-navy-600">most trusted names</span> in
            pharmaceutical distribution.
          </h2>

          <div className="mt-8 grid gap-6 text-[17px] leading-relaxed text-navy-950/65 sm:grid-cols-2">
            <p>
              Founded by {siteData.ceo.name}, G2 Pharmacy serves retail
              customers, wholesale partners and hospitals from our Head Office
              at Elwa Junction and branches across Monrovia.
            </p>
            <p>
              We believe access to quality medicine is a right, not a
              privilege. That belief drives everything we do — from sourcing
              genuine products to giving back to the communities we serve.
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-paper p-5">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-navy-900 text-leaf-400">
                  <Plus className="h-3 w-3" />
                </span>
                <span className="font-medium text-navy-950">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
