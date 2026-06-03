export type SchoolType = "publico" | "concertado" | "privado";

export type School = {
  slug: string;
  name: string;
  nameVal?: string;
  type: SchoolType;
  description: string;
  descriptionVal: string;
  address?: string;
  phone?: string;
  website?: string;
  evergreenSlug: string;
};

export const SCHOOL_TYPES: Record<SchoolType, { label: string; labelVal: string; color: string; colorLight: string }> = {
  publico: { label: "Público", labelVal: "Públic", color: "text-green-700", colorLight: "bg-green-50" },
  concertado: { label: "Concertado", labelVal: "Concertat", color: "text-emerald-700", colorLight: "bg-emerald-50" },
  privado: { label: "Privado", labelVal: "Privat", color: "text-lime-800", colorLight: "bg-lime-50" },
};

export const SCHOOLS: School[] = [
  {
    slug: "ceip-lloma-del-mas",
    name: "CEIP Lloma del Mas",
    nameVal: "CEIP Lloma del Mas",
    type: "publico",
    description: "Colegio público de infantil y primaria en Bétera, referencia para el casco y zonas centrales.",
    descriptionVal: "Col·legi públic d'infantil i primària a Bétera.",
    address: "Bétera",
    evergreenSlug: "colegio-ceip-lloma-del-mas",
  },
  {
    slug: "ceip-mas-camarena",
    name: "CEIP Mas Camarena",
    nameVal: "CEIP Mas Camarena",
    type: "publico",
    description: "Centro público que da servicio a la gran urbanización Mas Camarena y entorno sur del municipio.",
    descriptionVal: "Centre públic a la urbanització Mas Camarena.",
    address: "Mas Camarena — Bétera",
    evergreenSlug: "colegio-ceip-mas-camarena",
  },
  {
    slug: "ies-betera",
    name: "IES Bétera",
    nameVal: "IES Bétera",
    type: "publico",
    description: "Instituto de Educación Secundaria del municipio. ESO y Bachillerato para el alumnado de Bétera.",
    descriptionVal: "Institut d'Educació Secundària de Bétera.",
    address: "Bétera",
    evergreenSlug: "colegio-ies-betera",
  },
  {
    slug: "caxton-college",
    name: "Caxton College",
    nameVal: "Caxton College",
    type: "privado",
    description: "Colegio privado bilingüe de referencia en la comarca, con amplia demanda en Bétera y alrededores.",
    descriptionVal: "Col·legi privat bilingüe de referència a la comarca.",
    address: "Urbanización Montepilar — Puzol / zona Bétera",
    website: "https://www.caxtoncollege.com/",
    evergreenSlug: "colegio-caxton-college",
  },
];

export function getSchoolBySlug(slug: string): School | undefined {
  return SCHOOLS.find((s) => s.slug === slug);
}

export function getSchoolByEvergreenSlug(evergreenSlug: string): School | undefined {
  return SCHOOLS.find((s) => s.evergreenSlug === evergreenSlug);
}

export function isSchoolEvergreenSlug(slug: string): boolean {
  return SCHOOLS.some((s) => s.evergreenSlug === slug);
}

/** Ruta canónica: fichas de colegio en `/colegios/[slug]`, resto en `/[evergreenSlug]`. */
export function hrefForEvergreenSlug(pageSlug: string): string {
  const school = getSchoolByEvergreenSlug(pageSlug);
  return school ? `/colegios/${school.slug}` : `/${pageSlug}`;
}

export function getSchoolsByType(type: SchoolType): School[] {
  return SCHOOLS.filter((s) => s.type === type);
}
