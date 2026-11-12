import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { siteData } from "@/data/siteData";
import Img from "@/components/Img";
import CountUp from "@/components/CountUp";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { clamp, easeInOut, lerp, onFrame, pinProgress, prefersReducedMotion, type Frame } from "@/lib/scroll";

const stats = [
  { value: siteData.yearsOfService, suffix: "+", label: "Years serving Liberia" },
  { value: siteData.branches.length, suffix: "", label: "Branches in Monrovia" },
  { value: siteData.services.length, suffix: "", label: "Lines of supply: retail, wholesale, hospital" },
];

function Word({ children, i }: { children: string; i: number }) {
  return (
    <span className="rise-word">
      <span style={{ "--i": i } as CSSProperties}>{children}</span>
    </span>
  );
}

function Stats({ start, dark }: { start: boolean; dark?: boolean }) {
  return (
    <dl className={`grid max-w-3xl grid-cols-3 gap-4 border-t pt-5 sm:gap-8 ${dark ? "border-white/30" : "border-navy-900/15"}`}>
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col">
          <dt className={`order-2 mt-1.5 text-[13px] leading-snug sm:text-[15px] ${dark ? "text-white/80" : "text-navy-950/60"}`}>
            {s.label}
          </dt>
          <dd className={`sign text-4xl tabular-nums sm:text-6xl ${dark ? "text-white" : "text-navy-950"}`}>
            <CountUp to={s.value} start={start} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

// The headline has a capsule sitting in it like a word. On load the capsule
// opens (its blue and green halves slide apart) to show the shop inside; as
// you scroll, that capsule grows until the photo fills the whole screen.
export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLSpanElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const shutters = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const inside = useRef<HTMLDivElement>(null);

  const [reduced] = useState(prefersReducedMotion);
  const [opened, setOpened] = useState(false);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    const el = {
      section: section.current!,
      pin: pin.current!,
      slot: slot.current!,
      stage: stage.current!,
      photo: photo.current!,
      shade: shade.current!,
      shutters: shutters.current!,
      copy: copy.current!,
      inside: inside.current,
    };

    // Where the capsule sits inside the pinned screen, ignoring any transforms.
    let box = { x: 0, y: 0, w: 0, h: 0 };
    let last: Frame = { vw: window.innerWidth, vh: window.innerHeight, velocity: 0 };

    const draw = (frame: Frame) => {
      last = frame;
      const W = el.pin.offsetWidth;
      const H = el.pin.offsetHeight;
      const p = reduced ? 0 : pinProgress(el.section, frame);
      const e = easeInOut(clamp(p / 0.72));

      // The window: from capsule to full screen.
      const top = box.y * (1 - e);
      const left = box.x * (1 - e);
      const right = (W - box.x - box.w) * (1 - e);
      const bottom = (H - box.y - box.h) * (1 - e);
      const radius = lerp(box.h / 2, 0, e);
      el.stage.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`;

      // The photo: starts shrunk to fit the capsule, ends at full size.
      const s0 = Math.max(box.w / W, box.h / H);
      const tx = (box.x + box.w / 2 - W / 2) * (1 - e);
      const ty = (box.y + box.h / 2 - H / 2) * (1 - e);
      el.photo.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${lerp(s0, 1, e)})`;
      el.shade.style.opacity = String(e);

      // The headline lifts away, then the "inside the shop" words arrive.
      const out = clamp(p / 0.3);
      el.copy.style.opacity = String(1 - out);
      el.copy.style.transform = `translate3d(0, ${-p * 90}px, 0)`;
      el.copy.style.pointerEvents = out > 0.6 ? "none" : "";
      if (el.inside) {
        const arrive = clamp((p - 0.58) / 0.22);
        el.inside.style.opacity = String(arrive);
        el.inside.style.transform = `translate3d(0, ${(1 - arrive) * 40}px, 0)`;
        if (arrive > 0.5) setCounting(true);
      }
    };

    const measure = () => {
      let x = 0;
      let y = 0;
      let node: HTMLElement | null = el.slot;
      while (node && node !== el.pin) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      box = { x, y, w: el.slot.offsetWidth, h: el.slot.offsetHeight };
      Object.assign(el.shutters.style, {
        left: `${box.x}px`,
        top: `${box.y}px`,
        width: `${box.w}px`,
        height: `${box.h}px`,
      });
      el.stage.style.opacity = "1";
      draw(last);
    };

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(el.pin);
    resize.observe(el.slot);
    document.fonts?.ready.then(measure);

    const stop = onFrame(draw);
    const timer = window.setTimeout(() => setOpened(true), 700);

    return () => {
      stop();
      resize.disconnect();
      window.clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <section id="home" ref={section} className={`relative bg-shop ${reduced ? "" : "h-[240svh]"}`}>
      <div ref={pin} className="sticky top-0 h-[100lvh] overflow-hidden">
        {/* Headline and actions */}
        <div
          ref={copy}
          className="relative z-10 mx-auto flex h-[100svh] w-full max-w-[92rem] flex-col justify-center px-4 pb-6 pt-24 will-change-transform sm:px-8"
        >
          <h1
            className="rise sign text-[12.2vw] text-navy-950 sm:text-[11.4vw] lg:text-[min(7.2vw,15.5svh)]"
            aria-label="Trusted medicine for every Liberian home."
            style={{ "--rise-delay": "120ms" } as CSSProperties}
          >
            <span className="block" aria-hidden="true">
              <Word i={0}>Trusted</Word> <Word i={1}>medicine</Word>
            </span>
            <span className="flex flex-wrap items-center gap-x-[0.28em]" aria-hidden="true">
              <span className="whitespace-nowrap">
                <Word i={2}>for</Word> <Word i={3}>every</Word>
              </span>
              {/* The capsule's place in the sentence; the photo layer below lines up with it. */}
              <span ref={slot} className="my-[0.09em] h-[0.74em] min-w-[2.6em] flex-1 basis-[2.6em] rounded-full" />
            </span>
            <span className="block" aria-hidden="true">
              <Word i={4}>Liberian</Word> <Word i={5}>home.</Word>
            </span>
          </h1>

          <div className="mt-6 grid gap-5 sm:mt-8 lg:mt-10 lg:grid-cols-12 lg:items-end">
            <p className="reveal reveal-delay-2 max-w-xl text-[16px] leading-relaxed text-navy-950/70 sm:text-xl lg:col-span-6">
              Genuine pharmaceutical drugs, medical supplies and hospital
              supplies — at the counter, in bulk, and for clinics and hospitals
              across Monrovia and beyond.
            </p>
            <div className="reveal reveal-delay-3 flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
              <a href="#branches" className="btn-navy group">
                <MapPin className="h-4 w-4" />
                Find a branch
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href={siteData.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {reduced && (
            <div className="mt-10">
              <Stats start />
            </div>
          )}

          {!reduced && (
            <div aria-hidden="true" className="absolute bottom-5 left-1/2 hidden h-10 w-px -translate-x-1/2 overflow-hidden bg-navy-900/15 lg:block">
              <span className="scroll-cue block h-4 w-px bg-navy-900" />
            </div>
          )}
        </div>

        {/* The photo layer, clipped to the capsule and then opened to full screen */}
        <div
          ref={stage}
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{ clipPath: "inset(50% round 999px)" }}
        >
          <div ref={photo} className="absolute inset-0 will-change-transform">
            <Img
              name="hero"
              widths={[960, 1600, 2000]}
              sizes="100vw"
              alt={siteData.heroImageAlt}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div
            ref={shade}
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/25 opacity-0"
          />
          <div ref={shutters} className={`absolute overflow-hidden ${opened ? "hero-open" : ""}`}>
            <div className="hero-shutter absolute inset-y-0 left-0 w-1/2 bg-navy-600" />
            <div className="hero-shutter absolute inset-y-0 right-0 w-1/2 bg-leaf-500" />
          </div>
        </div>

        {/* What you read once the photo has filled the screen */}
        {!reduced && (
          <div ref={inside} className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[100svh] items-end opacity-0">
            <div className="mx-auto w-full max-w-[92rem] px-4 pb-24 sm:px-8 sm:pb-12">
              <p className="sign max-w-5xl text-[11vw] text-white sm:text-7xl lg:text-[5.6rem]">
                On the shelf, every day.
              </p>
              <div className="mt-7 sm:mt-9">
                <Stats start={counting} dark />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
