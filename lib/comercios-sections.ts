export type CommerceSectionConfig = {
  slug: "restaurantes" | "tiendas" | "gimnasios";
  labelEs: string;
  labelVal: string;
  icon: string;
  categoryHints: string[];
};

export const COMMERCE_SECTIONS: CommerceSectionConfig[] = [
  {
    slug: "restaurantes",
    labelEs: "Restaurantes",
    labelVal: "Restaurants",
    icon: "🍽️",
    categoryHints: ["restaurante", "restaurantes", "hosteleria", "hostelería", "hostaleria"],
  },
  {
    slug: "tiendas",
    labelEs: "Tiendas",
    labelVal: "Botigues",
    icon: "🛍️",
    categoryHints: [
      "tienda",
      "tiendas",
      "comercio",
      "comercios",
      "botiga",
      "botigues",
      "alimentacion",
      "alimentación",
      "alimentacio",
      "moda",
      "multitienda",
      "multibotiga",
      "electrodomestic",
      "papeleria",
      "papereria",
      "decoracion",
      "decoració",
      "florister",
      "ferreter",
      "drogueria",
      "artesania",
      "artesanía",
    ],
  },
  {
    slug: "gimnasios",
    labelEs: "Gimnasios",
    labelVal: "Gimnasos",
    icon: "🏋️",
    categoryHints: ["gimnasio", "gimnasios", "fitness", "entrenamiento", "gym", "deporte", "deportes", "esport", "esports"],
  },
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .trim();
}

export function isCommerceSectionSlug(value: string): value is CommerceSectionConfig["slug"] {
  return COMMERCE_SECTIONS.some((section) => section.slug === value);
}

export function getCommerceSectionConfig(slug: CommerceSectionConfig["slug"]) {
  return COMMERCE_SECTIONS.find((section) => section.slug === slug);
}

export function matchesCommerceSection(categoryName: string, section: CommerceSectionConfig): boolean {
  const base = normalize(categoryName);
  return section.categoryHints.some((hint) => base.includes(normalize(hint)));
}
