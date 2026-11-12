import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { mapsLink, siteData } from "@/data/siteData";
import Img from "@/components/Img";
import Plus from "@/components/Plus";
import SectionHeader from "@/components/SectionHeader";
import { useScrollFx } from "@/hooks/useScrollFx";
import { pinProgress, prefersReducedMotion } from "@/lib/scroll";

type Branch = (typeof siteData.branches)[number];

function BranchCard({ branch, index }: { branch: Branch; index: number }) {
  return (
    <article
      className="pop group w-[82vw] max-w-[25rem] shrink-0 snap-center overflow-hidden rounded-[2rem] bg-navy-900 ring-1 ring-white/10 lg:w-[min(30vw,46vh)] lg:max-w-[29rem]"
      style={{ "--i": index % 3 } as CSSProperties}
    >
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-800">
          <div data-drift className="absolute inset-y-0 -inset-x-[7%] will-change-transform">
            <Img
              name={branch.image}
              widths={[640, 1000]}
              sizes="(min-width: 1024px) 34vw, 90vw"
              alt={`G2 Pharmacy ${branch.name}, ${branch.location}`}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="tag absolute left-4 top-4 rounded-full bg-white px-3.5 py-1 text-[13px] text-navy-950">
            {branch.type}
          </span>
        </div>
        {/* Directions button, sitting on the edge between photo and sign */}
        <a
          href={mapsLink(branch.location)}
          target="_blank"
          rel="noopener noreferrer"
          className="group/dir absolute -bottom-6 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-950 shadow-[0_0_0_5px_#0a1a4a] transition-colors duration-300 hover:bg-leaf-400"
          aria-label={`Directions to ${branch.name}`}
          title="Get directions"
        >
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-settle group-hover/dir:rotate-45" />
        </a>
      </div>

      <div className={`border-t-4 p-6 ${branch.isHeadOffice ? "border-leaf-500" : "border-navy-600"}`}>
        <p className="tag flex items-center gap-1.5 text-[13px] text-leaf-400">
          <Plus className="h-3 w-3" />
          {branch.isHeadOffice ? "Head office" : `Branch #${index}`}
        </p>
        <h3 className="sign mt-2.5 text-2xl text-white lg:text-[1.6rem]">{branch.name}</h3>
        <p className="mt-2.5 flex items-start gap-1.5 text-[15px] leading-snug text-navy-200">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {branch.location}
        </p>
      </div>
    </article>
  );
}

// On desktop the section pins to the screen and scrolling walks you sideways
// past all five shop fronts. On phones it is a row you swipe.
export default function Branches() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  // How far the row has to travel sideways, in px. 0 means "no pinning".
  const [travel, setTravel] = useState(0);
  const pinned = travel > 0;

  useEffect(() => {
    const row = track.current;
    if (!row) return;
    const wide = window.matchMedia("(min-width: 1024px) and (min-height: 720px)");
    const measure = () => {
      const canPin = wide.matches && !prefersReducedMotion();
      setTravel(canPin ? Math.max(0, row.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(row);
    window.addEventListener("resize", measure);
    return () => {
      resize.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useScrollFx((f) => {
    const row = track.current;
    if (!section.current || !row) return;
    if (!pinned) {
      row.style.transform = "";
      return;
    }
    const p = pinProgress(section.current, f);
    row.style.transform = `translate3d(${(-p * travel).toFixed(1)}px, 0, 0)`;
    if (fill.current) fill.current.style.transform = `scaleX(${p.toFixed(4)})`;
    if (thumb.current) thumb.current.style.left = `${(p * 100).toFixed(2)}%`;

    // Each photo drifts a little inside its frame as it crosses the screen.
    row.querySelectorAll<HTMLElement>("[data-drift]").forEach((photo) => {
      const r = photo.parentElement!.getBoundingClientRect();
      const offset = (r.left + r.width / 2 - f.vw / 2) / f.vw;
      photo.style.transform = `translate3d(${(offset * -6).toFixed(2)}%, 0, 0)`;
    });
  });

  return (
    <section
      id="branches"
      ref={section}
      className="bg-navy-950 !scroll-mt-0"
      style={pinned ? { height: `calc(100vh + ${travel}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16"
            : "py-24 lg:py-32"
        }
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            dark
            titleSize={pinned ? "text-[min(4rem,7.5vh)]" : undefined}
            title={`${siteData.branches.length} doors across Monrovia.`}
            intro={
              pinned
                ? "Keep scrolling to walk past every shop front, then tap the arrow for directions."
                : "Swipe through our shop fronts, then tap the arrow for directions to the one nearest you."
            }
          />
        </div>

        <div className={pinned ? "mt-[4.5vh]" : "no-scrollbar mt-10 snap-x snap-mandatory overflow-x-auto pb-2"}>
          <div
            ref={track}
            className="flex w-max gap-4 px-4 will-change-transform sm:gap-6 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          >
            {siteData.branches.map((branch, index) => (
              <BranchCard key={branch.name} branch={branch} index={index} />
            ))}
          </div>
        </div>

        {/* Route line with a capsule that travels from the first door to the last */}
        {pinned && (
          <div className="mx-auto mt-[4.5vh] w-full max-w-7xl pl-8 pr-28" aria-hidden="true">
            <div className="relative mx-5 h-px bg-white/20">
              <span ref={fill} className="absolute inset-0 origin-left bg-leaf-400" style={{ transform: "scaleX(0)" }} />
              <span
                ref={thumb}
                className="absolute top-1/2 h-4 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,#fff_50%,#3dd06f_50%)] shadow-[0_0_0_4px_#060f2e]"
                style={{ left: "0%" }}
              />
            </div>
            <ol className="tag mt-4 flex justify-between text-[13px] text-navy-300">
              {siteData.branches.map((branch) => (
                <li key={branch.name}>{branch.name}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
