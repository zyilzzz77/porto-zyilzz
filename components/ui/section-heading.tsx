import Link from "next/link";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: {
    href: string;
    label: string;
  };
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
          {description}
        </p>
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 text-sm font-semibold text-[var(--soft)] hover:text-[var(--text)]"
        >
          {action.label} <span aria-hidden="true">↗</span>
        </Link>
      )}
    </div>
  );
}
