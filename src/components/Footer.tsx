import { navLinks, siteData } from "@/data/siteData";
import Plus from "@/components/Plus";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-navy-950 text-navy-200">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img src="/img/logo-96.webp" alt="" width={48} height={43} loading="lazy" className="h-11 w-auto" />
              <span className="font-display text-xl font-bold text-white">G2 Pharmacy</span>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed">
              Wholesale and retail of pharmaceutical drugs, medical supplies
              and hospital supplies in Liberia since {siteData.establishedYear}.
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label="Footer">
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">Explore</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 lg:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">Reach us</h4>
            <ul className="mt-4 space-y-2.5">
              <li><a href={siteData.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp · {siteData.phone}</a></li>
              <li><a href={`mailto:${siteData.email}`} className="hover:text-white">{siteData.email}</a></li>
              <li>{siteData.headOffice}</li>
              <li><a href={siteData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>
            </ul>
          </div>
        </div>

        {/* Big sign-style wordmark */}
        <div
          aria-hidden="true"
          className="mt-16 flex select-none items-center gap-[2vw] font-display text-[19vw] font-extrabold leading-[0.8] tracking-tighter text-white/[0.06] lg:text-[15rem]"
        >
          <Plus className="h-[0.6em] w-[0.6em] text-leaf-500/30" />
          G2
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-navy-300 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} G2 Pharmacy. All rights reserved.</p>
          <p>Founded by {siteData.ceo.name}.</p>
        </div>
      </div>
    </footer>
  );
}
