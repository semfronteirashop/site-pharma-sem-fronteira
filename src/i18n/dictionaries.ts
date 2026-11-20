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
    offers: string;
    launches: string;
    bestSellers: string;
    about: string;
    howToBuy: string;
  };
  footer: {
    brandName: string;
    brandDescription: string;
    tagline: string;
    contacts: string;
    explore: string;
    institutional: string;
    policies: string;
    support: string;
    supportHours: string;
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
    findProductTitle: string;
    findProductSubtitle: string;
    findProductSearch: string;
    launchesTitle: string;
    launchesDesc: string;
    seeLaunches: string;
    howToBuyTitle: string;
    howToBuyDesc: string;
    seeHowToBuy: string;
    whatsappCta: string;
    whatsappCtaDesc: string;
    healthSection: string;
    instagramBannerTitle: string;
    instagramBannerDesc: string;
    instagramBannerCta: string;
  };
  instagramSection: {
    title: string;
    subtitle: string;
    viewCta: string;
    placeholderAlt: (id: string) => string;
    cardLabel: (id: string) => string;
  };
  floatingContact: {
    groupLabel: string;
    whatsappLabel: string;
    instagramLabel: string;
  };
  productFinder: {
    category: string;
    brand: string;
    priceRange: string;
    availability: string;
    sort: string;
    all: string;
    inStock: string;
    outOfStock: string;
    priceLow: string;
    priceMid: string;
    priceHigh: string;
    sortRelevance: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortBestSellers: string;
    results: (count: number) => string;
    empty: string;
  };
  productsPage: {
    title: string;
    subtitle: string;
    results: (count: number) => string;
    all: string;
    emptyFilter: string;
    browseHint: string;
    categoryComingSoon: string;
    exploreCategory: string;
    categoriesTitle: string;
    metaDescription: string;
  };
  categoryPage: {
    back: string;
    empty: string;
    emptyHint: string;
    comingSoon: string;
    comingSoonWhatsapp: string;
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
    finalizeWhatsapp: string;
    priceLabel: string;
    categoryLabel: string;
    quantityLabel: string;
    shortDescriptionLabel: string;
    fullDescriptionLabel: string;
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
  launchesPage: {
    title: string;
    lead: string;
    empty: string;
    emptyHint: string;
    meta: string;
  };
  aboutPage: {
    title: string;
    meta: string;
    lead: string;
    sections: { title: string; body: string }[];
    serviceBody: (hours: string) => string;
    ctaWhatsapp: string;
  };
  howToBuyPage: {
    title: string;
    meta: string;
    lead: string;
    steps: string[];
    legalNotice: string;
    ctaProducts: string;
    ctaWhatsapp: string;
  };
  privacyPage: {
    title: string;
    meta: string;
    lead: string;
    sections: { title: string; body: string }[];
    contactTitle: string;
    contactBody: (email: string, hours: string) => string;
  };
  termsPage: {
    title: string;
    meta: string;
    lead: string;
    sections: { title: string; body: string }[];
    legalNotice: string;
    ctaWhatsapp: string;
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
    requestQuoteWhatsapp: string;
    keepShopping: string;
    clear: string;
  };
  productCard: {
    bestSeller: string;
    offer: string;
    launch: string;
    add: string;
    out: string;
    consultPriceWhatsapp: string;
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
    productPriceInquiry: (productName: string) => string;
    cartQuoteIntro: (storeName: string) => string;
    cartQuoteClosing: string;
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
    offers: "Ofertas",
    launches: "Lanzamientos",
    bestSellers: "Mas buscados",
    about: "Sobre nosotros",
    howToBuy: "Como comprar",
  },
  footer: {
    brandName: "SEM FRONTEIRA SHOP",
    brandDescription:
      "Productos seleccionados con atención a la procedencia y autenticidad, priorizando calidad y excelencia en cada elección.",
    tagline:
      "Atencion personalizada | Productos seleccionados | Compra facil por WhatsApp",
    contacts: "Contactos",
    explore: "Explorar",
    institutional: "Institucional",
    policies: "Politicas",
    support: "Atencion",
    supportHours: "Atencion",
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
    seeRanking: "Ver todos",
    offersTitle: "Ofertas",
    offersDesc: "",
    seeOffers: "Ver todos",
    authTitle: "Autenticacion por lote",
    authDesc: (hours) =>
      `Mandanos foto del embalaje por WhatsApp. Respondemos de ${hours}.`,
    howToAuth: "Como autenticar",
    heroCtaProducts: "Ver productos",
    heroCtaOffers: "Ver ofertas",
    heroLead: (hours) =>
      `Pedi en el catalogo y cerra por WhatsApp. Embalaje discreto, soporte ${hours}.`,
    findProductTitle: "Encuentre su producto",
    findProductSubtitle: "Busque por nombre, marca o categoria.",
    findProductSearch: "Buscar por nombre o categoria",
    launchesTitle: "Nuevos productos",
    launchesDesc: "Lo ultimo que llego al catalogo.",
    seeLaunches: "Ver todos",
    howToBuyTitle: "Como comprar",
    howToBuyDesc: "Cinco pasos simples para cerrar tu pedido por WhatsApp.",
    seeHowToBuy: "Ver como comprar",
    whatsappCta: "Hablar por WhatsApp",
    whatsappCtaDesc: "Atencion de lunes a domingo en horario comercial.",
    healthSection: "Salud y Bienestar",
    instagramBannerTitle: "Segui a Sem Fronteira",
    instagramBannerDesc: "Contenidos, novedades y actualizaciones.",
    instagramBannerCta: "Ver Instagram",
  },
  instagramSection: {
    title: "Segui a Sem Fronteira no Instagram",
    subtitle: "@semfronteiras.py",
    viewCta: "Ver Instagram",
    placeholderAlt: (id) => `Espacio reservado para contenido ${id} de Instagram`,
    cardLabel: (id) => `Abrir Instagram — contenido ${id}`,
  },
  floatingContact: {
    groupLabel: "Contacto rapido",
    whatsappLabel: "Abrir WhatsApp de Sem Fronteira",
    instagramLabel: "Abrir Instagram @semfronteiras.py",
  },
  productFinder: {
    category: "Categoria",
    brand: "Marca",
    priceRange: "Rango de precio",
    availability: "Disponibilidad",
    sort: "Ordenar por",
    all: "Todos",
    inStock: "En stock",
    outOfStock: "Sin stock",
    priceLow: "Hasta 300 mil",
    priceMid: "300 mil a 700 mil",
    priceHigh: "Mas de 700 mil",
    sortRelevance: "Mas relevantes",
    sortPriceAsc: "Menor precio",
    sortPriceDesc: "Mayor precio",
    sortBestSellers: "Mas buscados",
    results: (count) => `${count} resultado(s).`,
    empty: "Ningun producto con ese filtro.",
  },
  productsPage: {
    title: "Productos",
    subtitle: "Encuentre productos por categoria o busque por nombre.",
    results: (count) => `${count} resultado(s) en el catalogo.`,
    all: "Todos",
    emptyFilter: "Ningun producto con ese filtro.",
    browseHint: "Seleccione una categoria o use la busca para encontrar productos.",
    categoryComingSoon: "Proximamente",
    exploreCategory: "Explorar categoría",
    categoriesTitle: "Categorias",
    metaDescription:
      "Catalogo Sem Fronteira: emagrecedores, estetica, anabolizantes, hormonios, perfumaria, vitaminas e suplementos e saude e bem-estar.",
  },
  categoryPage: {
    back: "Volver al catalogo",
    empty: "Todavia no hay productos en esta categoria.",
    emptyHint:
      "Pronto agregaremos novedades aqui. Explore otras categorias o escribinos por WhatsApp.",
    comingSoon:
      "Pronto nuevos productos. Hable con nosotros por WhatsApp.",
    comingSoonWhatsapp: "WhatsApp",
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
    finalizeWhatsapp: "Finalizar por WhatsApp",
    priceLabel: "Precio",
    categoryLabel: "Categoria",
    quantityLabel: "Cantidad",
    shortDescriptionLabel: "Descripcion",
    fullDescriptionLabel: "Descripcion completa",
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
    lead: "Productos seleccionados con precio especial por tiempo limitado.",
    empty: "No hay ofertas activas en este momento.",
    meta: "Productos con descuento en Sem Fronteira.",
  },
  bestSellersPage: {
    title: "Mas buscados",
    lead: "Los productos con mayor demanda en el catalogo.",
    meta: "Los productos mas buscados en Sem Fronteira.",
  },
  launchesPage: {
    title: "Lanzamientos",
    lead: "Lo mas reciente que llego al catalogo.",
    empty: "Pronto agregaremos nuevos productos.",
    emptyHint: "Vuelve pronto para ver las novedades.",
    meta: "Nuevos productos en Sem Fronteira.",
  },
  aboutPage: {
    title: "Sobre Sem Fronteira Shop",
    meta: "Conoce Sem Fronteira Shop: catalogo online de productos seleccionados.",
    lead: "Sem Fronteira Shop es un catalogo online de productos seleccionados, con atencion personalizada y envio a todo Paraguay.",
    sections: [
      {
        title: "Nuestro enfoque",
        body: "Presentamos productos con informacion clara en cada ficha. Priorizamos procedencia, autenticidad y calidad en cada eleccion del catalogo.",
      },
      {
        title: "Procedencia y autenticidad",
        body: "Trabajamos con marcas y lineas presentes en nuestro catalogo. Cuando lo necesites, podemos confirmar lote y embalaje por WhatsApp.",
      },
      {
        title: "Calidad y seleccion",
        body: "Seleccionamos productos con criterio de calidad y excelencia. La informacion disponible en el sitio es orientativa; confirmamos detalles al atenderte.",
      },
      {
        title: "Atencion",
        body: "",
      },
    ],
    serviceBody: (hours) =>
      `Respondemos consultas por WhatsApp de ${hours}, todos los dias. Es nuestro canal para confirmar stock, condiciones y cerrar pedidos.`,
    ctaWhatsapp: "Hablar por WhatsApp",
  },
  howToBuyPage: {
    title: "Como comprar",
    meta: "Pasos para comprar en Sem Fronteira por WhatsApp.",
    lead: "Comprar es simple: encontra, consulta y confirma por WhatsApp.",
    steps: [
      "Encontre su producto",
      "Consulte la informacion disponible",
      "Entre en contacto por WhatsApp",
      "Confirme disponibilidad y condiciones",
      "Finalice su pedido",
    ],
    legalNotice:
      "Algunos productos pueden requerir orientacion o documentacion segun la legislacion aplicable. Consulte antes de comprar.",
    ctaProducts: "Ver productos",
    ctaWhatsapp: "Hablar por WhatsApp",
  },
  privacyPage: {
    title: "Privacidad",
    meta: "Como tratamos tu informacion en Sem Fronteira Shop.",
    lead: "Esta pagina describe de forma general como manejamos los datos que nos compartes al usar nuestro catalogo y contactarnos.",
    sections: [
      {
        title: "Datos que recopilamos",
        body: "Recopilamos la informacion que nos envias al contactarnos: nombre, telefono y datos del pedido compartidos por WhatsApp u otros canales de contacto del sitio.",
      },
      {
        title: "Como usamos tu informacion",
        body: "Usamos esos datos solo para responder consultas, preparar pedidos y brindar soporte. No vendemos ni compartimos tu informacion con terceros para marketing.",
      },
      {
        title: "Conservacion",
        body: "Conservamos la informacion el tiempo necesario para gestionar tu pedido y el soporte relacionado.",
      },
      {
        title: "Actualizaciones",
        body: "Podemos actualizar esta pagina cuando sea necesario. La version publicada en el sitio es la vigente.",
      },
    ],
    contactTitle: "Contacto",
    contactBody: (email, hours) =>
      `Para consultas sobre privacidad, escribinos por WhatsApp o a ${email} en horario de ${hours}.`,
  },
  termsPage: {
    title: "Terminos de uso",
    meta: "Terminos generales de uso de Sem Fronteira Shop.",
    lead: "Al usar este sitio y contactarnos, aceptas estos terminos generales de uso del catalogo.",
    sections: [
      {
        title: "Catalogo online",
        body: "Sem Fronteira Shop es un catalogo online de productos seleccionados. La informacion en cada ficha es orientativa; confirmamos detalles por WhatsApp.",
      },
      {
        title: "Pedidos y compras",
        body: "Los pedidos y orientaciones de compra se realizan por WhatsApp cuando corresponda. Precio, stock y condiciones se confirman al cerrar el pedido.",
      },
      {
        title: "Edad minima",
        body: "Para realizar compras debes ser mayor de edad segun la legislacion aplicable.",
      },
      {
        title: "Informacion de productos",
        body: "El contenido del sitio no sustituye orientacion profesional. Consulta la informacion disponible y contactanos antes de comprar cuando tengas dudas.",
      },
      {
        title: "Cambios en los terminos",
        body: "Podemos actualizar estos terminos. La version publicada en el sitio es la vigente.",
      },
    ],
    legalNotice:
      "Algunos productos pueden requerir orientacion o documentacion segun la legislacion aplicable. Consulte antes de comprar.",
    ctaWhatsapp: "Hablar por WhatsApp",
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
    requestQuoteWhatsapp: "Pedir presupuesto por WhatsApp",
    keepShopping: "Seguir comprando",
    clear: "Vaciar",
  },
  productCard: {
    bestSeller: "Mas vendido",
    offer: "Oferta",
    launch: "Lanzamiento",
    add: "Agregar",
    out: "Sin stock",
    consultPriceWhatsapp: "Consultar precio por WhatsApp",
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
    productPriceInquiry: (productName) =>
      `¡Hola! Quisiera saber el precio de ${productName}.`,
    cartQuoteIntro: (name) => `Hola, quiero pedir presupuesto en ${name}:`,
    cartQuoteClosing: "Quisiera saber el precio de estos productos.",
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
    offers: "Ofertas",
    launches: "Lancamentos",
    bestSellers: "Mais procurados",
    about: "Sobre nos",
    howToBuy: "Como comprar",
  },
  footer: {
    brandName: "SEM FRONTEIRA SHOP",
    brandDescription:
      "Produtos selecionados com atenção à procedência e autenticidade, priorizando qualidade e excelência em cada escolha.",
    tagline:
      "Atendimento personalizado | Produtos selecionados | Compra facil pelo WhatsApp",
    contacts: "Contatos",
    explore: "Explorar",
    institutional: "Institucional",
    policies: "Politicas",
    support: "Atendimento",
    supportHours: "Atendimento",
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
    seeRanking: "Ver todos",
    offersTitle: "Ofertas",
    offersDesc: "",
    seeOffers: "Ver todos",
    authTitle: "Autenticacao por lote",
    authDesc: (hours) =>
      `Mande foto da embalagem no WhatsApp. Respondemos de ${hours}.`,
    howToAuth: "Como autenticar",
    heroCtaProducts: "Ver produtos",
    heroCtaOffers: "Ver ofertas",
    heroLead: (hours) =>
      `Peca no catalogo e feche pelo WhatsApp. Embalagem discreta, suporte ${hours}.`,
    findProductTitle: "Encontre seu produto",
    findProductSubtitle: "Busque por nome, marca ou categoria.",
    findProductSearch: "Buscar por nome ou categoria",
    launchesTitle: "Novos produtos",
    launchesDesc: "O que chegou recentemente ao catalogo.",
    seeLaunches: "Ver todos",
    howToBuyTitle: "Como comprar",
    howToBuyDesc: "Cinco passos simples para fechar seu pedido pelo WhatsApp.",
    seeHowToBuy: "Ver como comprar",
    whatsappCta: "Falar no WhatsApp",
    whatsappCtaDesc: "Atendimento todos os dias no horario comercial.",
    healthSection: "Saude e Bem-Estar",
    instagramBannerTitle: "Siga a Sem Fronteira",
    instagramBannerDesc: "Conteudos, novidades e atualizacoes.",
    instagramBannerCta: "Ver Instagram",
  },
  instagramSection: {
    title: "Siga a Sem Fronteira no Instagram",
    subtitle: "@semfronteiras.py",
    viewCta: "Ver Instagram",
    placeholderAlt: (id) => `Espaco reservado para conteudo ${id} do Instagram`,
    cardLabel: (id) => `Abrir Instagram — conteudo ${id}`,
  },
  floatingContact: {
    groupLabel: "Contato rapido",
    whatsappLabel: "Abrir WhatsApp da Sem Fronteira",
    instagramLabel: "Abrir Instagram @semfronteiras.py",
  },
  productFinder: {
    category: "Categoria",
    brand: "Marca",
    priceRange: "Faixa de preço",
    availability: "Disponibilidade",
    sort: "Ordenar por",
    all: "Todos",
    inStock: "Em estoque",
    outOfStock: "Indisponível",
    priceLow: "Até 300 mil",
    priceMid: "300 mil a 700 mil",
    priceHigh: "Acima de 700 mil",
    sortRelevance: "Mais relevantes",
    sortPriceAsc: "Menor preço",
    sortPriceDesc: "Maior preço",
    sortBestSellers: "Mais procurados",
    results: (count) => `${count} resultado(s).`,
    empty: "Nenhum produto com esse filtro.",
  },
  productsPage: {
    title: "Produtos",
    subtitle: "Encontre produtos por categoria ou pesquise pelo nome.",
    results: (count) => `${count} resultado(s) no catalogo.`,
    all: "Todos",
    emptyFilter: "Nenhum produto com esse filtro.",
    browseHint: "Selecione uma categoria ou use a busca para encontrar produtos.",
    categoryComingSoon: "Em breve",
    exploreCategory: "Explorar categoria",
    categoriesTitle: "Categorias",
    metaDescription:
      "Catalogo Sem Fronteira: emagrecedores, estetica, anabolizantes, hormonios, perfumaria, vitaminas e suplementos e saude e bem-estar.",
  },
  categoryPage: {
    back: "Voltar ao catalogo",
    empty: "Ainda nao ha produtos nesta categoria.",
    emptyHint:
      "Novidades serao adicionadas em breve. Explore outras categorias ou fale conosco pelo WhatsApp.",
    comingSoon:
      "Em breve novos produtos. Fale com a gente no WhatsApp.",
    comingSoonWhatsapp: "WhatsApp",
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
    finalizeWhatsapp: "Finalizar pelo WhatsApp",
    priceLabel: "Preco",
    categoryLabel: "Categoria",
    quantityLabel: "Quantidade",
    shortDescriptionLabel: "Descricao",
    fullDescriptionLabel: "Descricao completa",
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
    lead: "Produtos selecionados com preço especial por tempo limitado.",
    empty: "Não há ofertas ativas no momento.",
    meta: "Produtos com desconto na Sem Fronteira.",
  },
  bestSellersPage: {
    title: "Mais procurados",
    lead: "Os produtos com maior demanda no catalogo.",
    meta: "Os produtos mais procurados na Sem Fronteira.",
  },
  launchesPage: {
    title: "Lançamentos",
    lead: "O que chegou recentemente ao catálogo.",
    empty: "Novos produtos serão adicionados em breve.",
    emptyHint: "Volte em breve para conferir as novidades.",
    meta: "Novos produtos na Sem Fronteira.",
  },
  aboutPage: {
    title: "Sobre a Sem Fronteira Shop",
    meta: "Conheca a Sem Fronteira Shop: catalogo online de produtos selecionados.",
    lead: "A Sem Fronteira Shop e um catalogo online de produtos selecionados, com atendimento personalizado e envio para todo o Paraguai.",
    sections: [
      {
        title: "Nosso enfoque",
        body: "Apresentamos produtos com informacoes claras em cada ficha. Priorizamos procedencia, autenticidade e qualidade em cada escolha do catalogo.",
      },
      {
        title: "Procedencia e autenticidade",
        body: "Trabalhamos com marcas e linhas presentes no nosso catalogo. Quando precisar, podemos confirmar lote e embalagem pelo WhatsApp.",
      },
      {
        title: "Qualidade e selecao",
        body: "Selecionamos produtos com criterio de qualidade e excelencia. As informacoes disponiveis no site sao orientativas; confirmamos detalhes no atendimento.",
      },
      {
        title: "Atendimento",
        body: "",
      },
    ],
    serviceBody: (hours) =>
      `Respondemos consultas pelo WhatsApp das ${hours}, todos os dias. E nosso canal para confirmar estoque, condicoes e fechar pedidos.`,
    ctaWhatsapp: "Falar no WhatsApp",
  },
  howToBuyPage: {
    title: "Como comprar",
    meta: "Passos para comprar na Sem Fronteira pelo WhatsApp.",
    lead: "Comprar e simples: encontre, consulte e confirme pelo WhatsApp.",
    steps: [
      "Encontre seu produto",
      "Consulte as informacoes disponiveis",
      "Entre em contato pelo WhatsApp",
      "Confirme disponibilidade e condicoes",
      "Finalize seu pedido",
    ],
    legalNotice:
      "Alguns produtos podem exigir orientacao ou documentacao conforme a legislacao aplicavel. Consulte antes de comprar.",
    ctaProducts: "Ver produtos",
    ctaWhatsapp: "Falar no WhatsApp",
  },
  privacyPage: {
    title: "Privacidade",
    meta: "Como tratamos suas informacoes na Sem Fronteira Shop.",
    lead: "Esta pagina descreve de forma geral como tratamos os dados que voce compartilha ao usar nosso catalogo e entrar em contato conosco.",
    sections: [
      {
        title: "Dados que coletamos",
        body: "Coletamos as informacoes que voce envia ao nos contatar: nome, telefone e dados do pedido compartilhados pelo WhatsApp ou outros canais de contato do site.",
      },
      {
        title: "Como usamos suas informacoes",
        body: "Usamos esses dados apenas para responder consultas, preparar pedidos e oferecer suporte. Nao vendemos nem compartilhamos suas informacoes com terceiros para marketing.",
      },
      {
        title: "Conservacao",
        body: "Conservamos as informacoes pelo tempo necessario para gerenciar seu pedido e o suporte relacionado.",
      },
      {
        title: "Atualizacoes",
        body: "Podemos atualizar esta pagina quando necessario. A versao publicada no site e a vigente.",
      },
    ],
    contactTitle: "Contato",
    contactBody: (email, hours) =>
      `Para consultas sobre privacidade, fale conosco pelo WhatsApp ou em ${email}, no horario de ${hours}.`,
  },
  termsPage: {
    title: "Termos de uso",
    meta: "Termos gerais de uso da Sem Fronteira Shop.",
    lead: "Ao usar este site e entrar em contato conosco, voce aceita estes termos gerais de uso do catalogo.",
    sections: [
      {
        title: "Catalogo online",
        body: "A Sem Fronteira Shop e um catalogo online de produtos selecionados. As informacoes em cada ficha sao orientativas; confirmamos detalhes pelo WhatsApp.",
      },
      {
        title: "Pedidos e compras",
        body: "Pedidos e orientacoes de compra sao realizados pelo WhatsApp quando aplicavel. Preco, estoque e condicoes sao confirmados ao fechar o pedido.",
      },
      {
        title: "Idade minima",
        body: "Para realizar compras, voce deve ser maior de idade conforme a legislacao aplicavel.",
      },
      {
        title: "Informacoes de produtos",
        body: "O conteudo do site nao substitui orientacao profissional. Consulte as informacoes disponiveis e entre em contato antes de comprar quando tiver duvidas.",
      },
      {
        title: "Alteracoes nos termos",
        body: "Podemos atualizar estes termos. A versao publicada no site e a vigente.",
      },
    ],
    legalNotice:
      "Alguns produtos podem exigir orientacao ou documentacao conforme a legislacao aplicavel. Consulte antes de comprar.",
    ctaWhatsapp: "Falar no WhatsApp",
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
    requestQuoteWhatsapp: "Pedir orçamento no WhatsApp",
    keepShopping: "Continuar comprando",
    clear: "Esvaziar",
  },
  productCard: {
    bestSeller: "Mais vendido",
    offer: "Oferta",
    launch: "Lançamento",
    add: "Adicionar",
    out: "Sem estoque",
    consultPriceWhatsapp: "Consultar preço no WhatsApp",
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
    productPriceInquiry: (productName) =>
      `Olá! Gostaria de saber o preço do ${productName}.`,
    cartQuoteIntro: (name) => `Olá, quero pedir orçamento na ${name}:`,
    cartQuoteClosing: "Gostaria de saber o valor desses produtos.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.es;
}
