// Responsive WebP image: the browser picks the smallest file that looks sharp,
// and off-screen images wait until the visitor scrolls near them.

type Props = {
  name: string;
  widths: number[];
  sizes: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function Img({ name, widths, sizes, alt, className, priority }: Props) {
  const srcSet = widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", ");
  return (
    <img
      src={`/img/${name}-${widths[widths.length - 1]}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchpriority: "high" } : {})}
    />
  );
}
