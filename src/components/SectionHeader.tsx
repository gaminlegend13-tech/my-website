import Plus from "@/components/Plus";

type Props = {
  number: string;
  label: string;
  title: string;
  intro?: string;
  dark?: boolean;
};

// "+02 Services" label, big title and optional intro, shared by every section.
export default function SectionHeader({ number, label, title, intro, dark }: Props) {
  return (
    <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className={`eyebrow ${dark ? "text-navy-200" : ""}`}>
          <Plus className="h-3.5 w-3.5 text-leaf-500" />
          {number}
          <span className={dark ? "text-navy-400" : "text-navy-900/30"}>/</span>
          {label}
        </p>
        <h2
          className={`mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl ${
            dark ? "text-white" : ""
          }`}
        >
          {title}
        </h2>
      </div>
      {intro && (
        <p
          className={`text-lg leading-relaxed lg:col-span-5 lg:pb-2 ${
            dark ? "text-navy-200" : "text-navy-950/65"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
