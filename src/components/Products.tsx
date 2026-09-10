import { siteData } from "@/data/siteData";

export default function Products() {
  return (
    <section id="products" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Our Products
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Quality Products You Can Trust
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A selection of the pharmaceutical drugs and medical supplies we
            carry — sourced from trusted manufacturers and delivered with care.
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteData.productImages.map((img, index) => (
            <div
              key={index}
              className={`reveal reveal-delay-${(index % 3) + 1} group relative overflow-hidden rounded-2xl shadow-lg`}
            >
              <img
                src={img}
                alt={`G2 Pharmacy product ${index + 1}`}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
