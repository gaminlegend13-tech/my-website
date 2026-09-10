import { Heart } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function Donations() {
  return (
    <section id="donations" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-sm font-semibold text-accent-700">
            <Heart className="h-4 w-4" />
            Giving Back
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Our Donations & Community Impact
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            At G2 Pharmacy, we believe in giving back to the communities that
            have supported us. Here are some of our donation and outreach
            initiatives.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {siteData.donations.map((donation, index) => (
            <div
              key={donation.title}
              className={`reveal reveal-delay-${index + 1} group overflow-hidden rounded-3xl bg-slate-50 shadow-lg ring-1 ring-slate-200/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md">
                  <Heart className="h-5 w-5 text-accent-500" fill="currentColor" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {donation.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {donation.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="reveal mt-12 rounded-2xl border border-dashed border-primary-300 bg-primary-50/50 px-6 py-5 text-center">
          <p className="text-sm font-medium text-primary-700">
            We'll be adding more details and photos of our donation activities
            soon. Check back for updates.
          </p>
        </div>
      </div>
    </section>
  );
}
