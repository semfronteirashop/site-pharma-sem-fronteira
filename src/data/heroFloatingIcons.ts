/** Ícones decorativos do HERO — altere esta lista para trocar ícones ou posições. */
export type HeroIconKind =
  | "capsule"
  | "pill"
  | "bottle"
  | "syringe"
  | "pharmacyCross"
  | "heart"
  | "molecule"
  | "bolt";

export type HeroFloatingIcon = {
  id: string;
  kind: HeroIconKind;
  /** Exibir no mobile (recomendado: no máximo 4). */
  showOnMobile: boolean;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  sizePx: number;
  zIndex: number;
  opacity: number;
  rotateStart: number;
  rotateEnd: number;
  driftX: number;
  fallDurationSec: number;
  fallDelaySec: number;
};

export const heroFloatingIcons: HeroFloatingIcon[] = [
  {
    id: "hi-1",
    kind: "capsule",
    showOnMobile: true,
    top: "10%",
    right: "4%",
    sizePx: 44,
    zIndex: 3,
    opacity: 0.92,
    rotateStart: -16,
    rotateEnd: -6,
    driftX: 6,
    fallDurationSec: 1.25,
    fallDelaySec: 0.05,
  },
  {
    id: "hi-2",
    kind: "pharmacyCross",
    showOnMobile: true,
    top: "32%",
    right: "10%",
    sizePx: 38,
    zIndex: 2,
    opacity: 0.88,
    rotateStart: 12,
    rotateEnd: 4,
    driftX: -7,
    fallDurationSec: 1.4,
    fallDelaySec: 0.15,
  },
  {
    id: "hi-3",
    kind: "bottle",
    showOnMobile: false,
    top: "14%",
    right: "24%",
    sizePx: 42,
    zIndex: 1,
    opacity: 0.85,
    rotateStart: -8,
    rotateEnd: 2,
    driftX: 5,
    fallDurationSec: 1.55,
    fallDelaySec: 0.28,
  },
  {
    id: "hi-4",
    kind: "heart",
    showOnMobile: true,
    bottom: "14%",
    right: "5%",
    sizePx: 40,
    zIndex: 4,
    opacity: 0.9,
    rotateStart: 14,
    rotateEnd: 8,
    driftX: -5,
    fallDurationSec: 1.35,
    fallDelaySec: 0.1,
  },
  {
    id: "hi-5",
    kind: "pill",
    showOnMobile: false,
    bottom: "26%",
    right: "18%",
    sizePx: 36,
    zIndex: 2,
    opacity: 0.82,
    rotateStart: -12,
    rotateEnd: -9,
    driftX: 8,
    fallDurationSec: 1.48,
    fallDelaySec: 0.35,
  },
  {
    id: "hi-6",
    kind: "molecule",
    showOnMobile: true,
    top: "48%",
    right: "3%",
    sizePx: 40,
    zIndex: 1,
    opacity: 0.8,
    rotateStart: 10,
    rotateEnd: 3,
    driftX: -6,
    fallDurationSec: 1.6,
    fallDelaySec: 0.22,
  },
  {
    id: "hi-7",
    kind: "syringe",
    showOnMobile: false,
    top: "44%",
    right: "30%",
    sizePx: 34,
    zIndex: 1,
    opacity: 0.78,
    rotateStart: -6,
    rotateEnd: 5,
    driftX: 4,
    fallDurationSec: 1.72,
    fallDelaySec: 0.4,
  },
  {
    id: "hi-8",
    kind: "bolt",
    showOnMobile: false,
    bottom: "8%",
    right: "15%",
    sizePx: 38,
    zIndex: 3,
    opacity: 0.86,
    rotateStart: 8,
    rotateEnd: 6,
    driftX: -4,
    fallDurationSec: 1.3,
    fallDelaySec: 0.48,
  },
];
