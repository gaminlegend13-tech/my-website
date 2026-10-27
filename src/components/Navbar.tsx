import { useEffect, useState } from "react";
import { Menu, X, Lock, Phone } from "lucide-react";
import { navLinks, siteData } from "@/data/siteData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        open
          ? "bg-paper shadow-[0_24px_48px_-24px_rgba(6,15,46,0.35)]"
          : scrolled
            ? "bg-paper/95 shadow-[0_1px_0_rgba(10,26,74,0.08)]"
            : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5" aria-label="G2 Pharmacy home">
          <img
            src="/img/logo-96.webp"
            srcSet="/img/logo-96.webp 1x, /img/logo-192.webp 2x"
            alt=""
            width={44}
            height={40}
            className="h-10 w-auto"
          />
          <span className="font-display text-lg font-bold leading-none tracking-tight text-navy-950">
            G2 Pharmacy
            <span className="block text-[11px] font-medium tracking-normal text-navy-950/50">
              Liberia since {siteData.establishedYear}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-navy-950/70 transition-colors hover:bg-navy-900/5 hover:text-navy-950"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
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
            className="rounded-full p-2.5 text-navy-950 transition-colors hover:bg-navy-900/5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden bg-paper">
          <ul className="mx-4 mb-4 flex flex-col border-t border-navy-900/10 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-navy-900/10 py-3.5 font-display text-xl font-semibold text-navy-950"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4 sm:hidden">
              <a href={`tel:${siteData.phoneLink}`} className="btn-navy w-full">
                <Phone className="h-4 w-4" />
                Call {siteData.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
