/** Placeholders visuais — substitua por imagens reais em /public/instagram/ */
export const instagramPosts = [
  {
    id: "01",
    image: "/instagram/instagram-01.svg",
  },
  {
    id: "02",
    image: "/instagram/instagram-02.svg",
  },
  {
    id: "03",
    image: "/instagram/instagram-03.svg",
  },
  {
    id: "04",
    image: "/instagram/instagram-04.svg",
  },
  {
    id: "05",
    image: "/instagram/instagram-05.svg",
  },
  {
    id: "06",
    image: "/instagram/instagram-06.svg",
  },
] as const;

/** Exibidos na seção principal da home — instagram-01, 02 e 03. */
export const instagramFeaturedPosts = [
  instagramPosts[0],
  instagramPosts[1],
  instagramPosts[2],
] as const;
