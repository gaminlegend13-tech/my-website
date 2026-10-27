import Plus from "@/components/Plus";

const items = [
  "Retail Pharmacy",
  "Wholesale Distribution",
  "Hospital Supplies",
  "Genuine Medicines",
  "Five Branches",
  "Serving Liberia since 2008",
];

// Scrolling navy strip, styled after the shop signage.
export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 pr-6 font-display text-xl font-semibold uppercase tracking-wide sm:text-2xl">
          {item}
          <Plus className="h-4 w-4 text-leaf-400" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden bg-navy-900 py-5 text-white">
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
