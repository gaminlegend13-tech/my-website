import { useRef } from "react";
import { navLinks, siteData } from "@/data/siteData";
import Plus from "@/components/Plus";
import { useScrollFx } from "@/hooks/useScrollFx";
import { asset } from "@/lib/asset";
import { clamp, easeOut, lerp } from "@/lib/scroll";

export default function Footer() {
  const wordmark = useRef<HTMLDivElement>(null);

  // The big sign at the bottom stretches from narrow to full width as it scrolls in.
  useScrollFx((f) => {
    const el = wordmark.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top > f.vh || r.bottom < 0) return;
    // Fully stretched exactly when the page reaches its very bottom.
    const travel = el.closest("footer")!.getBoundingClientRect().bottom - r.top;
    const p = easeOut(clamp((f.vh - r.top) / travel));
    el.style.fontStretch = `${lerp(62, 125, p).toFixed(1)}%`;
    el.style.opacity = lerp(0.2, 1, p).toFixed(3);
  });

  return (
    <footer className="overflow-hidden bg-navy-950 text-navy-200">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img src={asset("img/logo-96.webp")} alt="" width={48} height={43} loading="lazy" className="h-11 w-auto" />
              <span className="sign text-xl text-white">G2 Pharmacy</span>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed">
              Wholesale and retail of pharmaceutical drugs, medical supplies
              and hospital supplies in Liberia since {siteData.establishedYear}.
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label="Footer">
            <h4 className="text-base font-bold text-white">Explore</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 lg:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-leaf-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h4 className="text-base font-bold text-white">Reach us</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={siteData.whatsappLink} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-leaf-400">
                  WhatsApp {siteData.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteData.email}`} className="transition-colors hover:text-leaf-400">
                  {siteData.email}
                </a>
              </li>
              <li>{siteData.headOffice}</li>
              <li>
                <a href={siteData.facebookUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-leaf-400">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Big signboard wordmark */}
        <div className="mt-16 [container-type:inline-size]" aria-hidden="true">
          <div
            ref={wordmark}
            className="flex select-none items-center gap-[0.12em] whitespace-nowrap font-display text-[9.9cqw] font-black uppercase leading-[0.85] tracking-[-0.02em] text-white will-change-[font-stretch]"
            style={{ fontStretch: "125%" }}
          >
            <Plus className="h-[0.66em] w-[0.66em] flex-shrink-0 text-leaf-500" />
            G2 Pharmacy
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-navy-300 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} G2 Pharmacy. All rights reserved.</p>
          <p>Founded by {siteData.ceo.name}.</p>
        </div>
      </div>
    </footer>
  );
}
