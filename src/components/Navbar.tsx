import { useEffect, useState } from "react";
import { Menu, X, Lock } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Branches", href: "#branches" },
  { label: "Leadership", href: "#ceo" },
  { label: "Products", href: "#products" },
  { label: "Donations", href: "#donations" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <img
            src="/LOGO.PNG.png"
            alt="G2 Pharmacy logo"
            className="h-12 w-12 object-contain drop-shadow-md"
          />
          <div className="flex flex-col leading-none">
            <span
              className={`font-display text-lg font-extrabold tracking-tight ${
                scrolled ? "text-primary-800" : "text-white"
              }`}
            >
              &nbsp;Pharmacy
            </span>
            <span
              className={`text-[11px] font-medium ${
                scrolled ? "text-primary-600" : "text-primary-100"
              }`}
            >
              Liberia since 2008
            </span>
          </div>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-slate-600 hover:bg-primary-50 hover:text-primary-700"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#/login"
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              scrolled
                ? "text-slate-400 hover:text-primary-600"
                : "text-white/50 hover:text-white"
            }`}
            title="Staff login"
          >
            <Lock className="h-4 w-4" />
            Staff
          </a>
          <a
            href="#contact"
            className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-700 hover:shadow-lg"
          >
            Contact Us
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="#/login"
            className={`rounded-lg p-2 transition-colors ${
              scrolled ? "text-slate-400 hover:text-primary-600" : "text-white/50 hover:text-white"
            }`}
            title="Staff login"
          >
            <Lock className="h-5 w-5" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className={`rounded-lg p-2 transition-colors ${
              scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="mx-4 mt-2 flex flex-col gap-1 rounded-2xl bg-white p-4 shadow-xl">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
