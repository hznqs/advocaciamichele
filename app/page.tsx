import { LandingPage } from "@/components/landing-page";
import { siteConfig } from "@/lib/site";

const attorneySchema = {
  "@context": "https://schema.org",
  "@type": "Attorney",
  name: siteConfig.name,
  image: `${siteConfig.url}${siteConfig.images.attorney}`,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  priceRange: "$$$",
  areaServed: ["São Paulo", "Itaquera", "Brasil"],
  knowsAbout: [
    "Direito Previdenciário",
    "Direito do Trabalho",
    "Direito Civil",
    "Processo Civil",
    "Consultoria Jurídica"
  ],
  address: {
    "@type": "PostalAddress",
    ...siteConfig.address
  },
  identifier: "OAB/SP 235.717"
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: siteConfig.name,
  image: `${siteConfig.url}${siteConfig.images.office}`,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    ...siteConfig.address
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    }
  ],
  sameAs: []
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([attorneySchema, localBusinessSchema])
        }}
      />
      <LandingPage />
    </>
  );
}
