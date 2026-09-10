import { MapPin, Store, Tag } from "lucide-react";
import { siteData } from "@/data/siteData";

const typeColors: Record<string, string> = {
  Retail: "bg-primary-100 text-primary-700",
  Wholesale: "bg-secondary-100 text-secondary-700",
  "Wholesale & Retail": "bg-accent-100 text-accent-700",
};

export default function Branches() {
  return (
    <section id="branches" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Our Locations
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Our Branches
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Five convenient locations across Monrovia, Liberia — find the
            branch nearest to you.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {siteData.branches.map((branch, index) => (
            <div
              key={branch.name}
              className={`reveal reveal-delay-${(index % 3) + 1} group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                branch.isHeadOffice ? "ring-2 ring-primary-500" : ""
              }`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {branch.isHeadOffice && (
                  <div className="absolute top-4 right-4 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    Head Office
                  </div>
                )}
              </div>
              {/* Body */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-primary-600">
                  <Store className="h-5 w-5" />
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    {branch.name}
                  </h3>
                </div>
                <div className="mt-3 flex items-start gap-2 text-slate-600">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                  <p className="text-sm leading-relaxed">{branch.location}</p>
                </div>
                <div className="mt-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      typeColors[branch.type] ?? "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <Tag className="h-3 w-3" />
                    {branch.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
