interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="mb-2 inline-block rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-dark">
          {eyebrow}
        </span>
      )}
      <h2 className="text-h2 font-semibold text-brand-black">{title}</h2>
      {description && <p className="mt-3 text-gray-600">{description}</p>}
    </div>
  );
}
