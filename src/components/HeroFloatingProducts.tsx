"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  heroFloatingIcons,
  type HeroFloatingIcon,
} from "@/data/heroFloatingIcons";
import { HeroDecorIcon } from "@/components/HeroDecorIcon";
import { stripLocalePrefix } from "@/i18n/paths";

const HERO_ANIM_KEY = "sf-home-hero-anim";

function FallingIcon({
  item,
  animKey,
}: {
  item: HeroFloatingIcon;
  animKey: number;
}) {
  const positionStyle = {
    top: item.top,
    right: item.right,
    bottom: item.bottom,
    left: item.left,
    zIndex: item.zIndex,
    ["--hero-final-opacity" as string]: String(item.opacity),
    ["--hero-rotate-start" as string]: `${item.rotateStart}deg`,
    ["--hero-rotate-end" as string]: `${item.rotateEnd}deg`,
    ["--hero-drift-x" as string]: `${item.driftX}px`,
    ["--hero-fall-duration" as string]: `${item.fallDurationSec}s`,
    ["--hero-fall-delay" as string]: `${item.fallDelaySec}s`,
  };

  return (
    <div
      className={`absolute ${item.showOnMobile ? "" : "hidden md:block"}`}
      style={positionStyle}
      aria-hidden
    >
      <div
        key={`${item.id}-${animKey}`}
        className={
          animKey > 0 ? "hero-deco-fall pointer-events-none" : "hero-deco-settled pointer-events-none"
        }
      >
        <div className="hero-deco-hover pointer-events-auto">
          <div
            className="hero-deco-icon max-md:scale-[0.88] md:scale-100"
            style={{ width: item.sizePx, height: item.sizePx }}
          >
            <HeroDecorIcon kind={item.kind} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroFloatingProducts() {
  const pathname = usePathname();
  const bare = stripLocalePrefix(pathname);
  const isHome = bare === "/";
  const [animKey, setAnimKey] = useState<number | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (!isHome) {
      sessionStorage.removeItem(HERO_ANIM_KEY);
      hasPlayedRef.current = false;
      setAnimKey(null);
      return;
    }

    const playedFor = sessionStorage.getItem(HERO_ANIM_KEY);
    if (playedFor === pathname) {
      setAnimKey(0);
      return;
    }

    if (hasPlayedRef.current) return;

    hasPlayedRef.current = true;
    sessionStorage.setItem(HERO_ANIM_KEY, pathname);
    setAnimKey(1);
  }, [pathname, isHome]);

  if (!isHome || animKey === null) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {heroFloatingIcons.map((item) => (
        <FallingIcon key={item.id} item={item} animKey={animKey} />
      ))}
    </div>
  );
}
