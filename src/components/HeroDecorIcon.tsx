import type { HeroIconKind } from "@/data/heroFloatingIcons";

const PURPLE = "#4A168C";
const GREEN = "#12A83A";
const GREEN_DARK = "#08752B";
const WHITE = "#FFFFFF";

type HeroDecorIconProps = {
  kind: HeroIconKind;
};

export function HeroDecorIcon({ kind }: HeroDecorIconProps) {
  switch (kind) {
    case "capsule":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden>
          <rect
            x="18"
            y="8"
            width="12"
            height="32"
            rx="6"
            fill={GREEN}
            transform="rotate(-22 24 24)"
          />
          <rect
            x="18"
            y="8"
            width="12"
            height="16"
            rx="6"
            fill={PURPLE}
            transform="rotate(-22 24 24)"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="7"
            ry="12"
            fill={WHITE}
            fillOpacity="0.2"
            transform="rotate(-22 24 24)"
          />
        </svg>
      );
    case "pill":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden>
          <ellipse cx="24" cy="24" rx="18" ry="10" fill={PURPLE} />
          <path
            d="M6 24c0-5.5 8-10 18-10s18 4.5 18 10"
            fill={GREEN}
          />
          <ellipse cx="24" cy="24" rx="14" ry="6" fill={WHITE} fillOpacity="0.15" />
        </svg>
      );
    case "bottle":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden>
          <rect x="17" y="6" width="14" height="6" rx="2" fill={GREEN_DARK} />
          <path
            d="M15 12h18v4c0 2-1 3-1 3h-16s-1-1-1-3v-4Z"
            fill={GREEN}
          />
          <path
            d="M14 19h20v22c0 3-2 5-5 5H19c-3 0-5-2-5-5V19Z"
            fill={PURPLE}
          />
          <rect x="14" y="26" width="20" height="8" fill={GREEN} fillOpacity="0.35" />
          <rect x="18" y="14" width="12" height="3" rx="1.5" fill={WHITE} fillOpacity="0.35" />
        </svg>
      );
    case "syringe":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden>
          <rect
            x="8"
            y="22"
            width="22"
            height="6"
            rx="2"
            fill={GREEN}
            fillOpacity="0.85"
            transform="rotate(-35 19 25)"
          />
          <rect
            x="26"
            y="20"
            width="14"
            height="8"
            rx="1"
            fill={PURPLE}
            transform="rotate(-35 33 24)"
          />
          <path
            d="M38 18l6 6-3 3-6-6 3-3Z"
            fill={GREEN_DARK}
            transform="rotate(-35 41 22)"
          />
          <circle cx="12" cy="30" r="2.5" fill={PURPLE} />
        </svg>
      );
    case "pharmacyCross":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden>
          <rect x="19" y="8" width="10" height="32" rx="3" fill={GREEN} />
          <rect x="8" y="19" width="32" height="10" rx="3" fill={PURPLE} />
          <rect x="21" y="10" width="6" height="28" rx="2" fill={WHITE} fillOpacity="0.2" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden>
          <path
            d="M24 38s-14-9-14-18c0-5 4-8 8-8 3 0 6 2 6 2s3-2 6-2c4 0 8 3 8 8 0 9-14 18-14 18Z"
            fill={PURPLE}
          />
          <path
            d="M24 34s-10-6-10-13c0-3.5 2.5-5.5 5.5-5.5 2 0 4 1.2 4.5 1.5.5-.3 2.5-1.5 4.5-1.5 3 0 5.5 2 5.5 5.5 0 7-10 13-10 13Z"
            fill={GREEN}
            fillOpacity="0.85"
          />
        </svg>
      );
    case "molecule":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden>
          <line x1="24" y1="12" x2="14" y2="32" stroke={GREEN} strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="12" x2="34" y2="32" stroke={GREEN} strokeWidth="3" strokeLinecap="round" />
          <line x1="14" y1="32" x2="34" y2="32" stroke={PURPLE} strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="12" r="6" fill={PURPLE} />
          <circle cx="14" cy="32" r="5" fill={GREEN} />
          <circle cx="34" cy="32" r="5" fill={GREEN_DARK} />
          <circle cx="24" cy="12" r="2.5" fill={WHITE} fillOpacity="0.35" />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden>
          <path
            d="M26 6 14 26h10l-4 16 18-24H28l4-12Z"
            fill={GREEN}
          />
          <path
            d="M24 10 16 26h8l-3 12 14-20h-8l3-8Z"
            fill={PURPLE}
            fillOpacity="0.55"
          />
        </svg>
      );
    default:
      return null;
  }
}
