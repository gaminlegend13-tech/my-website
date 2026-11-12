import Rise from "@/components/Rise";

type Props = {
  title: string;
  intro?: string;
  /** Use on navy, blue and green sections. */
  dark?: boolean;
  /** Replace the default title size. */
  titleSize?: string;
};

// Signboard-style title with an optional intro beside it, shared by the sections.
export default function SectionHeader({
  title,
  intro,
  dark,
  titleSize = "text-[2.6rem] sm:text-6xl lg:text-[4.6rem]",
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
      <Rise
        text={title}
        className={`sign lg:col-span-8 ${titleSize} ${dark ? "text-white" : ""}`}
      />
      {intro && (
        <p
          className={`reveal max-w-md text-lg leading-relaxed lg:col-span-4 lg:pb-1.5 ${
            dark ? "text-white/75" : "text-navy-950/65"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
