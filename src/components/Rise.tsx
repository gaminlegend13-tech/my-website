import { Fragment, type CSSProperties } from "react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Extra wait before the first word moves, in ms. */
  delay?: number;
};

// A heading whose words rise out of a mask, one after another, the first time
// it scrolls into view. Screen readers get the plain sentence.
export default function Rise({ text, as: Tag = "h2", className = "", delay = 0 }: Props) {
  const words = text.split(" ");
  return (
    <Tag
      className={`rise ${className}`}
      aria-label={text}
      style={delay ? ({ "--rise-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="rise-word" aria-hidden="true">
            <span style={{ "--i": i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
