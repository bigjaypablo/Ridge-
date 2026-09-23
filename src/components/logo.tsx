import { cn } from "@/lib/utils";

export function RidgeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M7.5 19.5 16 11l8.5 8.5"
        fill="none"
        stroke="var(--color-forest-fg)"
        strokeWidth="2.1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M11 19.5v4.2h10v-4.2"
        fill="none"
        stroke="var(--color-forest-fg)"
        strokeWidth="2.1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RidgeWordmark({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <RidgeMark className={invert ? "text-cream" : "text-forest"} />
      <span
        className={cn(
          "font-display text-xl font-medium tracking-tight",
          invert ? "text-cream" : "text-ink",
        )}
      >
        Ridge
      </span>
    </span>
  );
}

export function AlderMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M8 20.5 16 10.5 24 20.5H8Z"
        fill="none"
        stroke="var(--color-forest-fg)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M16 14.5v7"
        stroke="var(--color-forest-fg)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
