"use client";

import Image from "next/image";
import gsap from "gsap";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AppLink } from "@/components/AppLink";
import { useLocale } from "@/components/LocaleProvider";
import {
  MARCA_EXIBICAO,
  PRODUTOS_NOVIDADES,
  produtoNovidadeLinkEhExterno,
  type ProdutoNovidade,
} from "@/data/produtos";

const RAIO_ARCO_DESKTOP = 300;
const RAIO_ARCO_MOBILE = 220;
const GRAUS_POR_ITEM_DESKTOP = 26;
const GRAUS_POR_ITEM_MOBILE = 34;
const BREAKPOINT_DESKTOP = "(min-width: 960px)";
const INTERVALO_AUTO_MS = 3500;
const DURACAO_TRANSICAO = 0.9;
const EASE_TRANSICAO = "power3.out";
const MAX_PARALLAX_DEG = 6;

function offsetRelativo(indice: number, ativo: number, total: number) {
  let d = indice - ativo;
  const metade = total / 2;
  if (d > metade) d -= total;
  if (d < -metade) d += total;
  return d;
}

function hexParaHalo(hex: string) {
  return `color-mix(in srgb, ${hex} 55%, transparent)`;
}

type Labels = {
  novidades: string;
  verProduto: string;
  anterior: string;
  proximo: string;
  regiao: string;
};

export function CarrosselNovidades3D() {
  const { locale, href: localeHref } = useLocale();
  const produtos = PRODUTOS_NOVIDADES;

  const labels: Labels = useMemo(
    () =>
      locale === "es"
        ? {
            novidades: "Novedades",
            verProduto: "Ver producto",
            anterior: "Producto anterior",
            proximo: "Siguiente producto",
            regiao: "Novedades en destaque",
          }
        : {
            novidades: "Novidades",
            verProduto: "Ver produto",
            anterior: "Produto anterior",
            proximo: "Próximo produto",
            regiao: "Novidades em destaque",
          },
    [locale],
  );

  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const [haloCor, setHaloCor] = useState(
    hexParaHalo(produtos[0]?.corDestaque ?? "#4a168c"),
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const carrosselRef = useRef<HTMLDivElement>(null);
  const perspectivaRef = useRef<HTMLDivElement>(null);
  const orbitaRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pausadoRef = useRef(false);
  const arrastandoRef = useRef(false);
  const indiceRef = useRef(indiceAtivo);
  const timerRef = useRef<number | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  indiceRef.current = indiceAtivo;

  const produtoAtivo = produtos[indiceAtivo] ?? produtos[0];

  const maxOffsetLateral = useCallback(() => {
    if (typeof window === "undefined") return 2;
    return window.matchMedia(BREAKPOINT_DESKTOP).matches ? 2 : 1;
  }, []);

  const configArco = useCallback(() => {
    if (typeof window === "undefined") {
      return { raio: RAIO_ARCO_DESKTOP, graus: GRAUS_POR_ITEM_DESKTOP };
    }
    const desktop = window.matchMedia(BREAKPOINT_DESKTOP).matches;
    return desktop
      ? { raio: RAIO_ARCO_DESKTOP, graus: GRAUS_POR_ITEM_DESKTOP }
      : { raio: RAIO_ARCO_MOBILE, graus: GRAUS_POR_ITEM_MOBILE };
  }, []);

  const posicionarArco = useCallback(
    (animar: boolean) => {
      const itens = itemRefs.current.filter(Boolean) as HTMLLIElement[];
      const total = itens.length;
      if (total === 0) return;

      const { raio, graus } = configArco();
      const maxLateral = maxOffsetLateral();
      const ativoIndex = indiceRef.current;
      const ativoProduto = produtos[ativoIndex];

      itens.forEach((el, index) => {
        const rel = offsetRelativo(index, ativoIndex, total);
        const foraDoViewport = Math.abs(rel) > maxLateral;
        const rad = (rel * graus * Math.PI) / 180;
        const x = Math.sin(rad) * raio;
        const z = Math.cos(rad) * raio - raio;
        const rotY = -rel * graus;
        const dist = Math.abs(rel);
        const escala = foraDoViewport ? 0.4 : Math.max(0.62, 1 - dist * 0.11);
        const opacidade = foraDoViewport ? 0 : Math.max(0.45, 1 - dist * 0.16);
        const blur = foraDoViewport ? 0 : Math.min(3.5, dist * 1);
        const zIndex = foraDoViewport ? 0 : 100 - dist;
        const itemAtivo = rel === 0 && !foraDoViewport;

        el.classList.toggle("pointer-events-auto", itemAtivo);
        el.classList.toggle("pointer-events-none", !itemAtivo);
        el.setAttribute("aria-hidden", itemAtivo ? "false" : "true");
        el.style.visibility = foraDoViewport ? "hidden" : "visible";

        const props = {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -42,
          x,
          z,
          rotateY: rotY,
          scale: escala,
          opacity: opacidade,
          filter: `blur(${blur}px)`,
          zIndex: Math.round(zIndex),
          transformPerspective: 1200,
          transformOrigin: "center bottom",
          force3D: true,
        };

        if (animar) {
          gsap.to(el, {
            duration: DURACAO_TRANSICAO,
            ease: EASE_TRANSICAO,
            ...props,
          });
        } else {
          gsap.set(el, props);
        }
      });

      if (ativoProduto) {
        setHaloCor(hexParaHalo(ativoProduto.corDestaque));
      }
    },
    [configArco, maxOffsetLateral, produtos],
  );

  const pararAutoPlay = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reiniciarAutoPlay = useCallback(() => {
    pararAutoPlay();
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzir || pausadoRef.current || produtos.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      if (pausadoRef.current || arrastandoRef.current) return;
      setIndiceAtivo((i) => (i + 1) % produtos.length);
    }, INTERVALO_AUTO_MS);
  }, [pararAutoPlay, produtos.length]);

  const irPara = useCallback(
    (direcao: number) => {
      if (produtos.length <= 1) return;
      setIndiceAtivo((i) => (i + direcao + produtos.length) % produtos.length);
      reiniciarAutoPlay();
    },
    [produtos.length, reiniciarAutoPlay],
  );

  useEffect(() => {
    posicionarArco(true);
  }, [indiceAtivo, posicionarArco]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    ctxRef.current = gsap.context(() => {
      posicionarArco(false);

      const lista = innerRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!reduzir) {
        lista.forEach((inner, index) => {
          const amp = 6 + (index % 3) * 2;
          gsap.to(inner, {
            y: amp,
            duration: 1.8 + (index % 4) * 0.15,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.12,
          });
        });
      }

      if (orbitaRef.current) {
        gsap.set(orbitaRef.current, { transformStyle: "preserve-3d" });
      }
    }, root);

    reiniciarAutoPlay();

    return () => {
      pararAutoPlay();
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, [pararAutoPlay, posicionarArco, reiniciarAutoPlay]);

  useEffect(() => {
    const carrossel = carrosselRef.current;
    const perspectiva = perspectivaRef.current;
    const orbita = orbitaRef.current;
    if (!carrossel || !perspectiva || !orbita) return;

    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mqDesktop = window.matchMedia(BREAKPOINT_DESKTOP);

    const onEnter = () => {
      pausadoRef.current = true;
    };
    const onLeave = () => {
      pausadoRef.current = false;
      reiniciarAutoPlay();
    };
    carrossel.addEventListener("mouseenter", onEnter);
    carrossel.addEventListener("mouseleave", onLeave);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        irPara(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        irPara(1);
      }
    };
    carrossel.addEventListener("keydown", onKey);

    let parallaxAtivo = mqDesktop.matches;
    const onMove = (event: MouseEvent) => {
      if (!parallaxAtivo || arrastandoRef.current || reduzir) return;
      const rect = perspectiva.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(orbita, {
        duration: 0.6,
        ease: "power2.out",
        rotateY: nx * MAX_PARALLAX_DEG * 2,
        rotateX: -ny * MAX_PARALLAX_DEG * 2,
      });
    };
    const onParallaxLeave = () => {
      gsap.to(orbita, {
        duration: 0.8,
        ease: "power2.out",
        rotateY: 0,
        rotateX: 0,
      });
    };

    if (!reduzir) {
      perspectiva.addEventListener("mousemove", onMove);
      perspectiva.addEventListener("mouseleave", onParallaxLeave);
    }

    let inicioX = 0;
    const limiar = 48;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      perspectiva.setPointerCapture(e.pointerId);
      arrastandoRef.current = true;
      inicioX = e.clientX;
    };
    const onUp = (e: PointerEvent) => {
      if (perspectiva.hasPointerCapture(e.pointerId)) {
        perspectiva.releasePointerCapture(e.pointerId);
      }
      if (!arrastandoRef.current) return;
      const delta = e.clientX - inicioX;
      arrastandoRef.current = false;
      if (Math.abs(delta) >= limiar) {
        irPara(delta < 0 ? 1 : -1);
      }
    };
    const onCancel = () => {
      arrastandoRef.current = false;
    };
    perspectiva.addEventListener("pointerdown", onDown);
    perspectiva.addEventListener("pointerup", onUp);
    perspectiva.addEventListener("pointercancel", onCancel);

    const onResize = () => {
      parallaxAtivo = mqDesktop.matches;
      if (!parallaxAtivo) onParallaxLeave();
      posicionarArco(true);
    };
    mqDesktop.addEventListener("change", onResize);
    window.addEventListener("resize", onResize);

    return () => {
      carrossel.removeEventListener("mouseenter", onEnter);
      carrossel.removeEventListener("mouseleave", onLeave);
      carrossel.removeEventListener("keydown", onKey);
      perspectiva.removeEventListener("mousemove", onMove);
      perspectiva.removeEventListener("mouseleave", onParallaxLeave);
      perspectiva.removeEventListener("pointerdown", onDown);
      perspectiva.removeEventListener("pointerup", onUp);
      perspectiva.removeEventListener("pointercancel", onCancel);
      mqDesktop.removeEventListener("change", onResize);
      window.removeEventListener("resize", onResize);
    };
  }, [irPara, posicionarArco, reiniciarAutoPlay]);

  return (
    <div
      ref={rootRef}
      className="relative max-h-[55vh] w-full overflow-hidden rounded-2xl sm:rounded-[28px] md:max-h-none"
      style={{
        background:
          "linear-gradient(145deg, color-mix(in srgb, #4a168c 10%, #f6f3f8) 0%, color-mix(in srgb, #4a168c 6%, #ffffff) 55%, #f0ebf8 100%)",
      }}
    >
      <span className="absolute left-3 top-3 z-20 rounded-full bg-brand-white/90 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-brand-purple shadow-sm ring-1 ring-brand-purple/15 sm:left-4 sm:top-4">
        {labels.novidades}
      </span>

      <div
        ref={carrosselRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carrossel"
        aria-label={`${labels.regiao}: ${produtoAtivo?.nome ?? ""}`}
        className="relative outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <button
          type="button"
          className="absolute left-1 top-[42%] z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-brand-white/95 text-brand-purple shadow-md transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple sm:left-2 sm:h-10 sm:w-10"
          aria-label={labels.anterior}
          onClick={() => irPara(-1)}
        >
          <span aria-hidden>‹</span>
        </button>

        <div
          className="relative mx-auto w-full px-10 pt-10 pb-1 sm:px-12 sm:pt-11 md:min-h-[280px] md:max-h-[310px] md:pb-2"
          style={{ perspective: 1200, perspectiveOrigin: "50% 45%" }}
        >
          <div
            ref={perspectivaRef}
            className="relative mx-auto h-[min(34vh,220px)] w-full touch-none sm:h-[min(32vh,240px)] md:h-[min(260px,28vw)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-[min(220px,46vw)] w-[min(220px,46vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-85 blur-md transition-[--halo-color] duration-700 ease-out"
              style={{
                background:
                  "radial-gradient(circle, var(--halo-color) 0%, transparent 68%)",
                ["--halo-color" as string]: haloCor,
              }}
              aria-hidden
            />

            <div
              ref={orbitaRef}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              <ul
                className="absolute inset-0 m-0 list-none p-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                {produtos.map((produto, index) => (
                  <ItemProduto
                    key={produto.id}
                    produto={produto}
                    index={index}
                    localeHref={localeHref}
                    itemRef={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    innerRef={(el) => {
                      innerRefs.current[index] = el;
                    }}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="absolute right-1 top-[42%] z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-brand-white/95 text-brand-purple shadow-md transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple sm:right-2 sm:h-10 sm:w-10"
          aria-label={labels.proximo}
          onClick={() => irPara(1)}
        >
          <span aria-hidden>›</span>
        </button>
      </div>

      <div className="px-4 pb-4 pt-0 text-center sm:pb-5">
        <p className="m-0 text-[0.75rem] font-semibold uppercase tracking-widest text-brand-purple/80">
          {MARCA_EXIBICAO}
        </p>
        <p className="m-0 mt-1 text-base font-bold text-foreground sm:text-lg">
          {produtoAtivo?.nome}
        </p>
        <NovidadeProdutoLink
          link={produtoAtivo?.link ?? "#"}
          className="mt-2.5 inline-flex items-center justify-center rounded-full border border-brand-purple/25 bg-brand-white/80 px-4 py-1.5 text-sm font-semibold text-brand-purple transition hover:bg-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          localeHref={localeHref}
        >
          {labels.verProduto}
        </NovidadeProdutoLink>
      </div>
    </div>
  );
}

type ItemProdutoProps = {
  produto: ProdutoNovidade;
  index: number;
  localeHref: (path?: string) => string;
  itemRef: (el: HTMLLIElement | null) => void;
  innerRef: (el: HTMLDivElement | null) => void;
};

function ItemProduto({
  produto,
  index,
  localeHref,
  itemRef,
  innerRef,
}: ItemProdutoProps) {
  const priority = index < 3;

  return (
    <li
      ref={itemRef}
      role="group"
      aria-label={produto.nome}
      className="pointer-events-none absolute w-[min(28vw,200px)] sm:w-[min(26vw,210px)] md:w-[min(200px,18vw)]"
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        height: "min(36vw, 250px)",
      }}
    >
      <div
        ref={innerRef}
        className="relative flex h-full w-full flex-col items-center justify-end"
        style={{ transformStyle: "preserve-3d" }}
      >
        <figure className="relative m-0 flex h-full w-full items-end justify-center">
          <Image
            src={produto.imagem}
            alt=""
            width={produto.imageWidth}
            height={produto.imageHeight}
            priority={priority}
            className="h-[min(32vw,220px)] w-full object-contain object-bottom md:h-[min(240px,22vw)]"
            sizes="(max-width: 960px) 35vw, 200px"
          />
        </figure>
        <NovidadeProdutoLink
          link={produto.link}
          localeHref={localeHref}
          className="absolute inset-0 z-[2] rounded-xl opacity-0 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-purple"
          tabIndex={-1}
        >
          <span className="sr-only">{produto.nome}</span>
        </NovidadeProdutoLink>
      </div>
    </li>
  );
}

type NovidadeProdutoLinkProps = {
  link: string;
  localeHref: (path?: string) => string;
  className?: string;
  children: ReactNode;
  tabIndex?: number;
};

function NovidadeProdutoLink({
  link,
  localeHref,
  className,
  children,
  tabIndex,
}: NovidadeProdutoLinkProps) {
  if (produtoNovidadeLinkEhExterno(link)) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        tabIndex={tabIndex}
      >
        {children}
      </a>
    );
  }

  return (
    <AppLink href={localeHref(link)} className={className} tabIndex={tabIndex}>
      {children}
    </AppLink>
  );
}