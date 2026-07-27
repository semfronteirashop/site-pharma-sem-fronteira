"use client";

import Link, { type LinkProps } from "next/link";
import type { ReactNode, AnchorHTMLAttributes } from "react";

type AppLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    /** Prefetch fica off por padrão para evitar rajada de requests RSC. */
    prefetch?: boolean;
  };

export function AppLink({
  children,
  prefetch = false,
  ...props
}: AppLinkProps) {
  return (
    <Link prefetch={prefetch} {...props}>
      {children}
    </Link>
  );
}
