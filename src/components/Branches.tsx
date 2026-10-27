import { ArrowUpRight, MapPin } from "lucide-react";
import { mapsLink, siteData } from "@/data/siteData";
import Img from "@/components/Img";
import Plus from "@/components/Plus";
import SectionHeader from "@/components/SectionHeader";

type Branch = (typeof siteData.branches)[number];

function BranchCard({ branch, index, featured }: { branch: Branch; index: number; featured?: boolean }) {
  return (
    <article
      className={`reveal group flex flex-col overflow-hidden rounded-3xl bg-navy-900 ring-1 ring-white/10 ${
        featured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      <div className="relative flex-1 overflow-hidden bg-navy-800">
        <Img
          name={branch.image}
          widths={[640, 1000]}
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
          alt={`G2 Pharmacy ${branch.name}, ${branch.location}`}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
            featured ? "aspect-[4/3] lg:aspect-auto" : "aspect-[4/3]"
          }`}
        />
        <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-semibold text-navy-950">
          {branch.type}
        </span>
      </div>

      {/* Sign board */}
      <div className="flex items-end justify-between gap-4 border-t-4 border-leaf-500 p-5 sm:p-6">
        <div>
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-leaf-400">
            <Plus className="h-3 w-3" />
            {branch.isHeadOffice ? "Head office" : `Branch #${index}`}
          </p>
          <h3 className={`mt-2 font-bold text-white ${featured ? "text-3xl" : "text-xl"}`}>{branch.name}</h3>
          <p className="mt-1.5 flex items-start gap-1.5 text-sm text-navy-200">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
            {branch.location}
          </p>
        </div>
        <a
          href={mapsLink(branch.location)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-leaf-500 hover:text-navy-950"
          aria-label={`Directions to ${branch.name}`}
          title="Get directions"
        >
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>
    </article>
  );
}

export default function Branches() {
  return (
    <section id="branches" className="bg-navy-950 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          number="03"
          label="Branches"
          title={`${siteData.branches.length} doors across Monrovia.`}
          intro="Walk in, call ahead, or tap the arrow for directions to the branch nearest you."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.branches.map((branch, index) => (
            <BranchCard key={branch.name} branch={branch} index={index} featured={branch.isHeadOffice} />
          ))}
        </div>
      </div>
    </section>
  );
}
