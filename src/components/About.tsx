import { useRef, type CSSProperties } from "react";
import { siteData } from "@/data/siteData";
import Capsule from "@/components/Capsule";
import Plus from "@/components/Plus";
import { useScrollFx } from "@/hooks/useScrollFx";
import { clamp, viewProgress } from "@/lib/scroll";

const statement = `Since ${siteData.establishedYear}, we've grown from a single counter into one of Liberia's most trusted names in pharmaceutical distribution.`;

const highlights = [
  "Quality-assured pharmaceutical products",
  "Trusted by hospitals and clinics across Liberia",
  "Competitive wholesale and retail pricing",
  "Five convenient locations in Monrovia",
];

export default function About() {
  const words = statement.split(" ");
  const text = useRef<HTMLHeadingElement>(null);
  const badge = useRef<HTMLDivElement>(null);

  // The statement "inks in" word by word as it travels up the screen,
  // and the round stamp turns with the scroll.
  useScrollFx((f) => {
    if (text.current) {
      const r = text.current.getBoundingClientRect();
      if (r.bottom > -50 && r.top < f.vh + 50) {
        const p = clamp((f.vh * 0.88 - r.top) / (f.vh * 0.5));
        text.current.style.setProperty("--p", p.toFixed(3));
      }
    }
    if (badge.current) {
      const r = badge.current.getBoundingClientRect();
      if (r.bottom > 0 && r.top < f.vh) {
        badge.current.style.transform = `rotate(${(viewProgress(badge.current, f) * 200).toFixed(1)}deg)`;
      }
    }
  });

  return (
    <section id="about" className="py-24 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Photo in a tall capsule */}
        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <Capsule
            name="about"
            widths={[640, 1000]}
            sizes="(min-width: 1024px) 36vw, 90vw"
            alt={siteData.aboutImageAlt}
            className="aspect-[3/4.4] rounded-full bg-navy-100"
          />
          {/* Round "since 2008" stamp */}
          <div ref={badge} className="absolute -bottom-7 right-0 h-32 w-32 will-change-transform sm:h-40 sm:w-40 lg:-right-8">
            <svg viewBox="0 0 200 200" className="spin-slow h-full w-full" aria-hidden="true">
              <circle cx="100" cy="100" r="100" className="fill-navy-900" />
              <defs>
                <path id="stamp-circle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
              </defs>
              <text className="tag fill-white" fontSize="19">
                <textPath href="#stamp-circle" textLength="440" lengthAdjust="spacing">
                  G2 Pharmacy + Serving Liberia since {siteData.establishedYear} +
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center">
              <Plus className="h-10 w-10 text-leaf-400 sm:h-12 sm:w-12" />
            </span>
          </div>
        </div>

        {/* Words */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <h2
            ref={text}
            aria-label={statement}
            className="text-[1.9rem] font-bold !leading-[1.12] sm:text-[2.25rem] lg:text-[3.1rem]"
            style={{ "--n": words.length } as CSSProperties}
          >
            {words.map((word, i) => (
              <span
                key={i}
                aria-hidden="true"
                style={
                  {
                    "--i": i,
                    opacity: "clamp(0.14, calc((var(--p, 1) * (var(--n) + 5) - var(--i)) / 5), 1)",
                  } as CSSProperties
                }
              >
                {word}{" "}
              </span>
            ))}
          </h2>

          <div className="mt-10 grid gap-6 text-[17px] leading-relaxed text-navy-950/70 sm:grid-cols-2">
            <p className="reveal">
              Founded by {siteData.ceo.name}, G2 Pharmacy serves retail
              customers, wholesale partners and hospitals from our Head Office
              at Elwa Junction and branches across Monrovia.
            </p>
            <p className="reveal reveal-delay-1">
              We believe access to quality medicine is a right, not a
              privilege. That belief drives everything we do — from sourcing
              genuine products to giving back to the communities we serve.
            </p>
          </div>

          <ul className="mt-10 grid border-t border-navy-900/15 sm:grid-cols-2 sm:gap-x-10">
            {highlights.map((item, i) => (
              <li
                key={item}
                className={`reveal flex items-center gap-3.5 border-b border-navy-900/15 py-4 reveal-delay-${(i % 2) + 1}`}
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-leaf-500 text-navy-950">
                  <Plus className="h-3 w-3" />
                </span>
                <span className="font-semibold text-navy-950">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
