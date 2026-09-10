import { Mail, Phone, MapPin } from "lucide-react";
import { siteData } from "@/data/siteData";

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

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-primary-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <img
                src="/LOGO.PNG.png"
                alt="G2 Pharmacy logo"
                className="h-14 w-14 object-contain drop-shadow-md"
              />
              <span className="font-display text-xl font-extrabold text-white">
                G2 Pharmacy
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-200/80">
              Wholesale and retail of pharmaceutical drugs, medical supplies,
              and hospital supplies in Liberia since {siteData.establishedYear}.
              Five branches serving Monrovia with quality healthcare products.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${siteData.email}`}
                className="flex items-center gap-3 text-sm text-primary-200 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {siteData.email}
              </a>
              <a
                href={`tel:${siteData.phoneLink}`}
                className="flex items-center gap-3 text-sm text-primary-200 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {siteData.phone}
              </a>
              <div className="flex items-center gap-3 text-sm text-primary-200">
                <MapPin className="h-4 w-4" />
                Elwa Junction, Monrovia, Liberia
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-base font-bold text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-base font-bold text-white">
              Our Services
            </h4>
            <ul className="mt-4 space-y-2">
              {siteData.services.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-sm text-primary-200 transition-colors hover:text-white"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-primary-800/50 pt-8">
          <p className="text-center text-sm text-primary-300/70">
            &copy; {new Date().getFullYear()} G2 Pharmacy. All rights reserved.
            Founded by {siteData.ceo.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
