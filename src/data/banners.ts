export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  active: boolean;
};

export const banners: Banner[] = [
  {
    id: "banner-1",
    title: "SEM FRONTEIRA",
    subtitle: "SUPLEMENTOS",
    ctaLabel: "Ver catalogo",
    ctaHref: "/produtos",
    image: "/banners/hero.svg",
    active: true,
  },
];
