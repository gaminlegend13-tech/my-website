import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Lock, Phone } from "lucide-react";
import { navLinks, siteData } from "@/data/siteData";
import { asset } from "@/lib/asset";
import { onFrame } from "@/lib/scroll";
import WhatsAppIcon from "@/components/WhatsAppIcon";

type Highlight = { left: number; width: number; index: number };

// Floating capsule-shaped navbar. It tucks away while you scroll down, comes
// back when you scroll up, and its green edge fills as you move down the page.
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [highlight, setHighlight] = useState<Highlight | null>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(
    () =>
      onFrame(({ velocity }) => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) {
          progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
        }
        if (y < 120 || velocity < -3) setHidden(false);
        else if (velocity > 3) setHidden(true);
      }),
    []
  );

  // Stop the page behind the phone menu from scrolling while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Phone menu: a navy sheet that grows out of the menu button */}
      <div
        className={`fixed inset-0 flex flex-col bg-navy-950 px-5 pb-8 pt-28 transition-[clip-path] duration-700 ease-swift lg:hidden ${
          open ? "pointer-events-auto" : ""
        }`}
        style={{ clipPath: open ? "circle(150% at calc(100% - 2.75rem) 2.5rem)" : "circle(0px at calc(100% - 2.75rem) 2.5rem)" }}
        aria-hidden={!open}
      >
        <ul className="flex-1 overflow-y-auto">
          {navLinks.map((link, i) => (
            <li key={link.href} className="overflow-hidden border-b border-white/10">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={`sign block py-3.5 text-[2rem] text-white transition-transform duration-700 ease-settle ${
                  open ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <a href={`tel:${siteData.phoneLink}`} tabIndex={open ? 0 : -1} className="btn-light">
            <Phone className="h-4 w-4" />
            Call us
          </a>
          <a
            href={siteData.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            className="btn-leaf"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>

      <div
        className={`relative mx-auto mt-3 max-w-6xl px-3 transition-transform duration-500 ease-swift ${
          hidden && !open ? "-translate-y-[150%]" : ""
        }`}
      >
        <nav className="pointer-events-auto relative flex h-14 items-center justify-between overflow-hidden rounded-full border border-navy-900/10 bg-white/90 pl-4 pr-2 shadow-[0_14px_40px_-20px_rgba(10,26,74,0.55)] backdrop-blur-md">
          <a href="#home" className="flex items-center gap-2.5" aria-label="G2 Pharmacy home">
            <img
              src={asset("img/logo-96.webp")}
              srcSet={`${asset("img/logo-96.webp")} 1x, ${asset("img/logo-192.webp")} 2x`}
              alt=""
              width={40}
              height={36}
              className="h-9 w-auto"
            />
            <span className="sign text-[15px] leading-none text-navy-950">G2 Pharmacy</span>
          </a>

          <ul className="relative hidden items-center lg:flex" onMouseLeave={() => setHighlight(null)}>
            {/* The navy pill that slides to whichever link you point at */}
            <li
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-navy-900 transition-[left,width,opacity] duration-300 ease-settle"
              style={
                {
                  left: highlight?.left ?? 0,
                  width: highlight?.width ?? 0,
                  opacity: highlight ? 1 : 0,
                } as CSSProperties
              }
            />
            {navLinks.map((link, i) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onMouseEnter={(e) => {
                    const li = e.currentTarget.parentElement!;
                    setHighlight({ left: li.offsetLeft, width: li.offsetWidth, index: i });
                  }}
                  onFocus={(e) => {
                    const li = e.currentTarget.parentElement!;
                    setHighlight({ left: li.offsetLeft, width: li.offsetWidth, index: i });
                  }}
                  onBlur={() => setHighlight(null)}
                  className={`block rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-200 ${
                    highlight?.index === i ? "text-white" : "text-navy-950/70"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href="#/login"
              className="rounded-full p-2.5 text-navy-950/35 transition-colors hover:text-navy-950"
              title="Staff login"
              aria-label="Staff login"
            >
              <Lock className="h-4 w-4" />
            </a>
            <a href={`tel:${siteData.phoneLink}`} className="btn-navy hidden !px-5 !py-2.5 !text-sm sm:inline-flex">
              <Phone className="h-4 w-4" />
              {siteData.phone}
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="relative h-10 w-10 rounded-full bg-navy-900 text-white lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className={`absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-[5px]"
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>

          <span
            ref={progress}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-leaf-500"
            style={{ transform: "scaleX(0)" }}
          />
        </nav>
      </div>
    </header>
  );
}
