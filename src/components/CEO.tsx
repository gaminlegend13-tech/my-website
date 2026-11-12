import { useRef } from "react";
import { siteData } from "@/data/siteData";
import Capsule from "@/components/Capsule";
import CountUp from "@/components/CountUp";
import Rise from "@/components/Rise";
import { useInView } from "@/hooks/useInView";

const facts = [
  { value: siteData.establishedYear, from: siteData.establishedYear - 40, suffix: "", label: "Founded G2 Pharmacy" },
  { value: siteData.branches.length, from: 0, suffix: "", label: "Branches established" },
  { value: siteData.yearsOfService, from: 0, suffix: "+", label: "Years of service" },
];

export default function CEO() {
  const factsRef = useRef<HTMLDListElement>(null);
  const counting = useInView(factsRef);

  return (
    <section id="ceo" className="bg-white py-24 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-8">
        {/* Portrait */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <Capsule
              name={siteData.ceo.image}
              widths={[560, 900]}
              sizes="(min-width: 1024px) 36vw, 90vw"
              alt={siteData.ceo.name}
              className="aspect-[4/5] rounded-[2.75rem]"
              innerClassName="bg-navy-100"
              imgClassName="object-top mix-blend-multiply"
              axis="x"
              parallax={0}
            />
            <div className="reveal reveal-delay-2 absolute -bottom-6 left-5 right-5 flex flex-col gap-1 rounded-[1.75rem] bg-navy-900 px-7 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-full sm:pr-6 text-white shadow-[0_24px_50px_-20px_rgba(6,15,46,0.6)]">
              <span className="text-lg font-bold leading-tight">{siteData.ceo.name}</span>
              <span className="tag text-[13px] text-leaf-400">{siteData.ceo.title}</span>
            </div>
          </div>
        </div>

        {/* Words */}
        <div className="lg:col-span-7">
          <Rise
            text="Built on one vision: quality medicine for every community in Liberia."
            className="text-[1.9rem] font-bold !leading-[1.12] sm:text-[2.25rem] lg:text-[3.1rem]"
          />

          <p className="reveal mt-8 max-w-2xl text-[17px] leading-relaxed text-navy-950/70">{siteData.ceo.bio}</p>

          <dl ref={factsRef} className="mt-10 grid grid-cols-3 gap-4 border-t border-navy-900/15 pt-6 sm:gap-8">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col">
                <dt className="order-2 mt-1.5 text-[13px] leading-snug text-navy-950/60 sm:text-[15px]">{f.label}</dt>
                <dd className="sign text-3xl tabular-nums text-navy-900 sm:text-5xl">
                  <CountUp to={f.value} from={f.from} start={counting} suffix={f.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
