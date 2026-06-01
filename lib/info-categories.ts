export type InfoCategorySlug = "colegios" | "salud" | "tramites" | "movilidad";

export type InfoCategory = {
  slug: InfoCategorySlug;
  evergreenSlug: string;
  title: string;
  titleVal: string;
  description: string;
  descriptionVal: string;
  icon: string;
  color: string;
  colorLight: string;
  colorBorder: string;
  match: RegExp;
};

export const INFO_CATEGORIES: InfoCategory[] = [
  {
    slug: "colegios",
    evergreenSlug: "colegios-betera",
    title: "Educación y colegios",
    titleVal: "Educació i col·legis",
    description: "Colegios e institutos en Bétera y Mas Camarena.",
    descriptionVal: "Col·legis i instituts a Bétera i Mas Camarena.",
    icon: "🎒",
    color: "text-green-700",
    colorLight: "bg-green-50",
    colorBorder: "border-green-200 hover:border-green-400",
    match: /(educaci[oó]n|colegio|instituto|escuela|familia|infantil|juventud|beca)/i,
  },
  {
    slug: "salud",
    evergreenSlug: "salud-betera",
    title: "Salud y emergencias",
    titleVal: "Salut i emergències",
    description: "Centro de salud, ampliación y consultorio sur. Farmacias y urgencias.",
    descriptionVal: "Centre de salut, ampliació i consultori sud.",
    icon: "🏥",
    color: "text-red-700",
    colorLight: "bg-red-50",
    colorBorder: "border-red-200 hover:border-red-400",
    match: /(salud|m[eé]dico|hospital|farmacia|urgencia|emergencia|112|centro de salud|consultorio)/i,
  },
  {
    slug: "tramites",
    evergreenSlug: "tramites-betera",
    title: "Servicios y trámites",
    titleVal: "Serveis i tràmits",
    description: "Ayuntamiento, registro, urbanismo y gestión tributaria.",
    descriptionVal: "Ajuntament, registre, urbanisme i gestió tributària.",
    icon: "🧾",
    color: "text-emerald-700",
    colorLight: "bg-emerald-50",
    colorBorder: "border-emerald-200 hover:border-emerald-400",
    match: /(tramite|trámite|document|certific|empadron|ayuda|servicio|sede|oficina|basura|residuo)/i,
  },
  {
    slug: "movilidad",
    evergreenSlug: "movilidad-betera",
    title: "Movilidad y transporte",
    titleVal: "Mobilitat i transport",
    description: "Metro Línea 1, Metrobus y conexión con Valencia, Paterna y Camp de Túria.",
    descriptionVal: "Metro L1, Metrobus i connexió amb València i el Camp de Túria.",
    icon: "🚌",
    color: "text-green-700",
    colorLight: "bg-green-50",
    colorBorder: "border-green-200 hover:border-green-400",
    match: /(transporte|metro|bus|autob[uú]s|tr[aá]fico|aparc|movilidad|carretera)/i,
  },
];

export function getCategoryBySlug(slug: string): InfoCategory | undefined {
  return INFO_CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryForPage(page: { title: string; slug: string }): InfoCategory | undefined {
  const searchableText = `${page.title} ${page.slug}`;
  return INFO_CATEGORIES.find((category) => category.match.test(searchableText));
}
