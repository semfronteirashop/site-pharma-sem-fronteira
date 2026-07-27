import type { Locale } from "@/i18n/config";

export type Dictionary = {
  brandSubtitle: string;
  topbar: string;
  openMenu: string;
  openCart: string;
  cart: string;
  searchPlaceholder: string;
  search: string;
  whatsapp: string;
  shippingNote: (price: string) => string;
  nav: {
    home: string;
    products: string;
    categories: string;
    bestSellers: string;
    offers: string;
    help: string;
  };
  footer: {
    institutional: string;
    policies: string;
    support: string;
    payments: string;
    company: string;
    myOrder: string;
    supportLink: string;
    terms: string;
    privacy: string;
    shipping: string;
    refunds: string;
    paymentMethods: string[];
    copyright: (year: number, name: string) => string;
  };
  home: {
    categoriesTitle: string;
    categoriesDesc: string;
    seeAll: string;
    featuredTitle: string;
    featuredDesc: string;
    catalog: string;
    bestSellersTitle: string;
    seeRanking: string;
    offersTitle: string;
    offersDesc: string;
    seeOffers: string;
    authTitle: string;
    authDesc: (hours: string) => string;
    howToAuth: string;
    heroCtaProducts: string;
    heroCtaOffers: string;
    heroLead: (hours: string) => string;
  };
  productsPage: {
    title: string;
    results: (count: number) => string;
    all: string;
    emptyFilter: string;
    categoriesTitle: string;
    metaDescription: string;
  };
  categoryPage: {
    back: string;
    empty: string;
  };
  productPage: {
    related: string;
    stock: string;
    inStock: string;
    outOfStock: string;
    shipCountry: string;
    discreetPack: string;
    addToCart: string;
    goCheckout: string;
    priceLabel: string;
  };
  searchPage: {
    title: string;
    resultsFor: (q: string) => string;
    count: (n: number) => string;
    hint: string;
    empty: string;
    meta: string;
    metaFor: (q: string) => string;
  };
  checkoutPage: {
    title: string;
    lead: string;
    meta: string;
  };
  offersPage: {
    title: string;
    lead: string;
    empty: string;
    meta: string;
  };
  bestSellersPage: {
    title: string;
    lead: string;
    meta: string;
  };
  privacyPage: {
    title: string;
    meta: string;
    privacyTitle: string;
    privacyBody: string;
    termsTitle: string;
    termsBody: string;
    shippingTitle: string;
    shippingBody: string;
    refundsTitle: string;
    refundsBody: (hours: string) => string;
  };
  helpPage: {
    title: string;
    lead: (hours: string) => string;
    meta: string;
    companyTitle: string;
    companyBody: (name: string) => string;
    authTitle: string;
    authSteps: string[];
    shippingTitle: string;
    shippingBody: string;
    talkWhatsapp: string;
    seeProducts: string;
  };
  notFound: {
    code: string;
    title: string;
    lead: string;
    home: string;
    products: string;
  };
  cartDrawer: {
    title: string;
    items: (n: number) => string;
    close: string;
    empty: string;
    seeProducts: string;
    remove: string;
    subtotal: string;
    goCheckout: string;
  };
  checkout: {
    emptyTitle: string;
    emptyLead: string;
    seeProducts: string;
    shippingNote: string;
    sendWhatsapp: string;
    keepShopping: string;
    clear: string;
  };
  productCard: {
    bestSeller: string;
    add: string;
    out: string;
  };
  language: {
    label: string;
    es: string;
    pt: string;
  };
  whatsappMsg: {
    orderIntro: (name: string) => string;
    total: (price: string) => string;
    confirm: string;
    support: (topic: string, name: string) => string;
    defaultTopic: string;
  };
};

const es: Dictionary = {
  brandSubtitle: "Suplementos",
  topbar: "Envio a Brasil / Paraguay · pedidos por WhatsApp",
  openMenu: "Abrir menu",
  openCart: "Abrir carrito",
  cart: "Carrito",
  searchPlaceholder: "Buscar producto, marca o categoria",
  search: "Buscar",
  whatsapp: "WhatsApp",
  shippingNote: (price) => `Flete a confirmar · desde ${price} hay beneficio`,
  nav: {
    home: "Inicio",
    products: "Productos",
    categories: "Categorias",
    bestSellers: "Mas vendidos",
    offers: "Ofertas",
    help: "Ayuda",
  },
  footer: {
    institutional: "Institucional",
    policies: "Politicas",
    support: "Atencion",
    payments: "Formas de pago",
    company: "La empresa",
    myOrder: "Mi pedido",
    supportLink: "Soporte",
    terms: "Terminos",
    privacy: "Privacidad",
    shipping: "Envio",
    refunds: "Cambios y reembolsos",
    paymentMethods: ["Transferencia", "PIX", "Tarjeta en el sitio"],
    copyright: (year, name) => `© ${year} ${name}. Paraguay.`,
  },
  home: {
    categoriesTitle: "Categorias",
    categoriesDesc: "Elegi por tipo de producto.",
    seeAll: "Ver todas",
    featuredTitle: "Destacados",
    featuredDesc: "Lo que mas sale esta semana.",
    catalog: "Catalogo",
    bestSellersTitle: "Mas vendidos",
    seeRanking: "Ver ranking",
    offersTitle: "Ofertas",
    offersDesc: "Precio tachado = descuento activo.",
    seeOffers: "Ver ofertas",
    authTitle: "Autenticacion por lote",
    authDesc: (hours) =>
      `Mandanos foto del embalaje por WhatsApp. Respondemos de ${hours}.`,
    howToAuth: "Como autenticar",
    heroCtaProducts: "Ver productos",
    heroCtaOffers: "Ver ofertas",
    heroLead: (hours) =>
      `Pedi en el catalogo y cerra por WhatsApp. Embalaje discreto, soporte ${hours}.`,
  },
  productsPage: {
    title: "Productos",
    results: (count) => `${count} resultado(s) en el catalogo.`,
    all: "Todos",
    emptyFilter: "Ningun producto con ese filtro.",
    categoriesTitle: "Categorias",
    metaDescription:
      "Catalogo Sem Fronteira: orales, inyectables, hormonios y combos.",
  },
  categoryPage: {
    back: "Volver al catalogo",
    empty: "Todavia no hay productos en esta categoria.",
  },
  productPage: {
    related: "Quienes vieron esto tambien llevaron",
    stock: "Stock",
    inStock: "Disponible",
    outOfStock: "Sin stock",
    shipCountry: "Envio a todo Paraguay",
    discreetPack: "Embalaje discreto",
    addToCart: "Agregar al carrito",
    goCheckout: "Ir al checkout",
    priceLabel: "Precio",
  },
  searchPage: {
    title: "Buscar",
    resultsFor: (q) => `Resultados para “${q}”`,
    count: (n) => `${n} producto(s).`,
    hint: "Escribi nombre, marca o categoria.",
    empty: "Nada con esa busqueda.",
    meta: "Busca productos en Sem Fronteira.",
    metaFor: (q) => `Resultados para ${q} en Sem Fronteira.`,
  },
  checkoutPage: {
    title: "Checkout",
    lead: "Confirma los items y manda el pedido por WhatsApp.",
    meta: "Revisa tu pedido y envialo por WhatsApp.",
  },
  offersPage: {
    title: "Ofertas",
    lead: "Descuentos activos ahora.",
    empty: "No hay ofertas en este momento.",
    meta: "Productos con descuento en Sem Fronteira.",
  },
  bestSellersPage: {
    title: "Mas vendidos",
    lead: "Ranking por demanda.",
    meta: "Los productos con mas pedidos en Sem Fronteira.",
  },
  privacyPage: {
    title: "Privacidad y terminos",
    meta: "Politicas de Sem Fronteira Suplementos.",
    privacyTitle: "Privacidad",
    privacyBody:
      "Usamos tu telefono y datos de pedido solo para preparar el envio y responder soporte. No vendemos esa informacion.",
    termsTitle: "Terminos",
    termsBody:
      "Para comprar tenes que ser mayor de edad. Precio y stock quedan firmes cuando confirmamos el pedido por WhatsApp.",
    shippingTitle: "Envio",
    shippingBody:
      "Enviamos a todo Paraguay con embalaje discreto. En la mayoria de los casos sale en hasta 48h despues del pago.",
    refundsTitle: "Cambios y reembolsos",
    refundsBody: (hours) =>
      `Pedi el cambio o reembolso por WhatsApp con foto del pedido. Producto abierto o sin lote legible puede quedar fuera. Soporte: ${hours}.`,
  },
  helpPage: {
    title: "Ayuda y autenticacion",
    lead: (hours) =>
      `Atencion de ${hours}. Escribinos al WhatsApp con tu duda o foto del lote.`,
    meta: "Soporte, envio y autenticacion de lote en Sem Fronteira.",
    companyTitle: "La empresa",
    companyBody: (name) =>
      `${name} vende por catalogo online y cierra pedidos por WhatsApp en Paraguay.`,
    authTitle: "Como autenticar",
    authSteps: [
      "Saca foto del lote o codigo del embalaje.",
      "Mandala por WhatsApp.",
      "Te confirmamos en horario de soporte.",
    ],
    shippingTitle: "Envio",
    shippingBody:
      "Embalaje discreto. En la mayoria de los casos despachamos en hasta 48h despues del pago.",
    talkWhatsapp: "Hablar por WhatsApp",
    seeProducts: "Ver productos",
  },
  notFound: {
    code: "Error 404",
    title: "Pagina no encontrada",
    lead: "Esa ruta no existe. Volve al inicio o al catalogo.",
    home: "Inicio",
    products: "Productos",
  },
  cartDrawer: {
    title: "Carrito",
    items: (n) => `${n} item(s)`,
    close: "Cerrar",
    empty: "Tu carrito esta vacio.",
    seeProducts: "Ver productos",
    remove: "Quitar",
    subtotal: "Subtotal",
    goCheckout: "Ir al checkout",
  },
  checkout: {
    emptyTitle: "Tu carrito esta vacio",
    emptyLead: "Agrega productos antes de enviar el pedido.",
    seeProducts: "Ver productos",
    shippingNote: "El envio se confirma en el chat de WhatsApp.",
    sendWhatsapp: "Enviar pedido por WhatsApp",
    keepShopping: "Seguir comprando",
    clear: "Vaciar",
  },
  productCard: {
    bestSeller: "Mas vendido",
    add: "Agregar",
    out: "Sin stock",
  },
  language: {
    label: "Idioma",
    es: "ES",
    pt: "PT",
  },
  whatsappMsg: {
    orderIntro: (name) => `Hola, quiero este pedido en ${name}:`,
    total: (price) => `Total: ${price}`,
    confirm: "Confirmen stock, envio y forma de pago.",
    support: (topic, name) => `Hola, necesito ${topic} de ${name}.`,
    defaultTopic: "ayuda",
  },
};

const pt: Dictionary = {
  brandSubtitle: "Suplementos",
  topbar: "Envio para Brasil / Paraguai · pedidos pelo WhatsApp",
  openMenu: "Abrir menu",
  openCart: "Abrir carrinho",
  cart: "Carrinho",
  searchPlaceholder: "Buscar produto, marca ou categoria",
  search: "Buscar",
  whatsapp: "WhatsApp",
  shippingNote: (price) => `Frete a confirmar · a partir de ${price} tem beneficio`,
  nav: {
    home: "Inicio",
    products: "Produtos",
    categories: "Categorias",
    bestSellers: "Mais vendidos",
    offers: "Ofertas",
    help: "Ajuda",
  },
  footer: {
    institutional: "Institucional",
    policies: "Politicas",
    support: "Atendimento",
    payments: "Formas de pagamento",
    company: "A empresa",
    myOrder: "Meu pedido",
    supportLink: "Suporte",
    terms: "Termos",
    privacy: "Privacidade",
    shipping: "Envio",
    refunds: "Trocas e reembolsos",
    paymentMethods: ["Transferencia", "PIX", "Cartao no site"],
    copyright: (year, name) => `© ${year} ${name}. Paraguai.`,
  },
  home: {
    categoriesTitle: "Categorias",
    categoriesDesc: "Escolha pelo tipo de produto.",
    seeAll: "Ver todas",
    featuredTitle: "Destaques",
    featuredDesc: "O que mais sai nesta semana.",
    catalog: "Catalogo",
    bestSellersTitle: "Mais vendidos",
    seeRanking: "Ver ranking",
    offersTitle: "Ofertas",
    offersDesc: "Preco riscado = desconto ativo.",
    seeOffers: "Ver ofertas",
    authTitle: "Autenticacao por lote",
    authDesc: (hours) =>
      `Mande foto da embalagem no WhatsApp. Respondemos de ${hours}.`,
    howToAuth: "Como autenticar",
    heroCtaProducts: "Ver produtos",
    heroCtaOffers: "Ver ofertas",
    heroLead: (hours) =>
      `Peca no catalogo e feche pelo WhatsApp. Embalagem discreta, suporte ${hours}.`,
  },
  productsPage: {
    title: "Produtos",
    results: (count) => `${count} resultado(s) no catalogo.`,
    all: "Todos",
    emptyFilter: "Nenhum produto com esse filtro.",
    categoriesTitle: "Categorias",
    metaDescription:
      "Catalogo Sem Fronteira: orais, injetaveis, hormonios e combos.",
  },
  categoryPage: {
    back: "Voltar ao catalogo",
    empty: "Ainda nao ha produtos nesta categoria.",
  },
  productPage: {
    related: "Quem viu isso tambem levou",
    stock: "Estoque",
    inStock: "Disponivel",
    outOfStock: "Sem estoque",
    shipCountry: "Envio para todo o Paraguai",
    discreetPack: "Embalagem discreta",
    addToCart: "Adicionar ao carrinho",
    goCheckout: "Ir ao checkout",
    priceLabel: "Preco",
  },
  searchPage: {
    title: "Buscar",
    resultsFor: (q) => `Resultados para “${q}”`,
    count: (n) => `${n} produto(s).`,
    hint: "Digite nome, marca ou categoria.",
    empty: "Nada com essa busca.",
    meta: "Busque produtos na Sem Fronteira.",
    metaFor: (q) => `Resultados para ${q} na Sem Fronteira.`,
  },
  checkoutPage: {
    title: "Checkout",
    lead: "Confirme os itens e envie o pedido pelo WhatsApp.",
    meta: "Revise seu pedido e envie pelo WhatsApp.",
  },
  offersPage: {
    title: "Ofertas",
    lead: "Descontos ativos agora.",
    empty: "Nao ha ofertas no momento.",
    meta: "Produtos com desconto na Sem Fronteira.",
  },
  bestSellersPage: {
    title: "Mais vendidos",
    lead: "Ranking por demanda.",
    meta: "Os produtos com mais pedidos na Sem Fronteira.",
  },
  privacyPage: {
    title: "Privacidade e termos",
    meta: "Politicas da Sem Fronteira Suplementos.",
    privacyTitle: "Privacidade",
    privacyBody:
      "Usamos seu telefone e dados do pedido so para preparar o envio e responder suporte. Nao vendemos essas informacoes.",
    termsTitle: "Termos",
    termsBody:
      "Para comprar voce precisa ser maior de idade. Preco e estoque ficam firmes quando confirmamos o pedido no WhatsApp.",
    shippingTitle: "Envio",
    shippingBody:
      "Enviamos para todo o Paraguai com embalagem discreta. Na maioria dos casos sai em ate 48h depois do pagamento.",
    refundsTitle: "Trocas e reembolsos",
    refundsBody: (hours) =>
      `Peca a troca ou reembolso no WhatsApp com foto do pedido. Produto aberto ou sem lote legivel pode ficar de fora. Suporte: ${hours}.`,
  },
  helpPage: {
    title: "Ajuda e autenticacao",
    lead: (hours) =>
      `Atendimento de ${hours}. Fale no WhatsApp com sua duvida ou foto do lote.`,
    meta: "Suporte, envio e autenticacao de lote na Sem Fronteira.",
    companyTitle: "A empresa",
    companyBody: (name) =>
      `${name} vende por catalogo online e fecha pedidos pelo WhatsApp no Paraguai.`,
    authTitle: "Como autenticar",
    authSteps: [
      "Tire foto do lote ou codigo da embalagem.",
      "Envie pelo WhatsApp.",
      "Confirmamos no horario de suporte.",
    ],
    shippingTitle: "Envio",
    shippingBody:
      "Embalagem discreta. Na maioria dos casos despachamos em ate 48h depois do pagamento.",
    talkWhatsapp: "Falar no WhatsApp",
    seeProducts: "Ver produtos",
  },
  notFound: {
    code: "Erro 404",
    title: "Pagina nao encontrada",
    lead: "Esse caminho nao existe. Volte ao inicio ou ao catalogo.",
    home: "Inicio",
    products: "Produtos",
  },
  cartDrawer: {
    title: "Carrinho",
    items: (n) => `${n} item(ns)`,
    close: "Fechar",
    empty: "Seu carrinho esta vazio.",
    seeProducts: "Ver produtos",
    remove: "Remover",
    subtotal: "Subtotal",
    goCheckout: "Ir ao checkout",
  },
  checkout: {
    emptyTitle: "Seu carrinho esta vazio",
    emptyLead: "Adicione produtos antes de enviar o pedido.",
    seeProducts: "Ver produtos",
    shippingNote: "O frete se confirma no chat do WhatsApp.",
    sendWhatsapp: "Enviar pedido pelo WhatsApp",
    keepShopping: "Continuar comprando",
    clear: "Esvaziar",
  },
  productCard: {
    bestSeller: "Mais vendido",
    add: "Adicionar",
    out: "Sem estoque",
  },
  language: {
    label: "Idioma",
    es: "ES",
    pt: "PT",
  },
  whatsappMsg: {
    orderIntro: (name) => `Ola, quero este pedido na ${name}:`,
    total: (price) => `Total: ${price}`,
    confirm: "Confirmem estoque, frete e forma de pagamento.",
    support: (topic, name) => `Ola, preciso de ${topic} da ${name}.`,
    defaultTopic: "ajuda",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.es;
}
