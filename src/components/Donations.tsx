import { Heart } from "lucide-react";
import { siteData } from "@/data/siteData";
import Img from "@/components/Img";
import SectionHeader from "@/components/SectionHeader";

export default function Donations() {
  return (
    <section id="donations" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="06"
          label="Giving back"
          title="Community comes first."
          intro="We believe in giving back to the communities that have supported us. Here are some of our donation and outreach initiatives."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {siteData.donations.map((donation, index) => (
            <article key={donation.title} className={`reveal reveal-delay-${index + 1} group`}>
              <div className="relative overflow-hidden rounded-3xl bg-navy-100">
                <Img
                  name={donation.image}
                  widths={[640, 1000]}
                  sizes="(min-width: 768px) 32vw, 100vw"
                  alt={donation.title}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-paper text-leaf-600">
                  <Heart className="h-5 w-5" fill="currentColor" />
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{donation.title}</h3>
              <p className="mt-2 leading-relaxed text-navy-950/65">{donation.description}</p>
            </article>
          ))}
        </div>

        <p className="reveal mt-12 border-t border-navy-900/10 pt-6 text-sm text-navy-950/55">
          More photos and details of our donation activities are coming soon.
        </p>
      </div>
    </section>
  );
}
