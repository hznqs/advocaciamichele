export const siteConfig = {
  name: "Michele Nogueira Morais Advocacia e Consultoria Jurídica",
  shortName: "Michele Nogueira Morais",
  url: "https://michelenogueiramorais.adv.br",
  description:
    "Escritório jurídico em São Paulo com atuação estratégica em Direito Previdenciário, Trabalhista, Civil e Consultoria Jurídica.",
  keywords: [
    "advogada em São Paulo",
    "advogada previdenciária em São Paulo",
    "advogada trabalhista em São Paulo",
    "consultoria jurídica em São Paulo",
    "escritório de advocacia em Itaquera",
    "advocacia estratégica em São Paulo"
  ],
  phone: "+55 11 94310-3438",
  displayPhone: "(11) 94310-3438",
  whatsapp: "5511943103438",
  email: "minogueiramoraes@gmail.com",
  address: {
    streetAddress: "Rua Flores do Piauí, 361",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "08210-200",
    addressCountry: "BR"
  },
  images: {
    logo: "/images/logo.png",
    office: "/images/escritorio_michele.png",
    attorney: "/images/drmichele.png",
    og: "/images/og-michele.jpg"
  }
};

export const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
  "Olá, Dra. Michele. Gostaria de agendar uma consulta jurídica."
)}`;
