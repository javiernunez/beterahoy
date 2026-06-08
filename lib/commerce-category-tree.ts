/**
 * Árbol de categorías COMMERCE alineado con acbetera.com (asociación de comerciantes de Bétera).
 * Cada entrada es categoría raíz (sin hijos) para simplificar el mapeo 1:1 con sus filtros.
 */
export type CommerceCategorySeed = {
  name: string;
  nameVal: string;
};

export const COMMERCE_ROOT_CATEGORIES: CommerceCategorySeed[] = [
  { name: "Hostelería", nameVal: "Hostaleria" },
  { name: "Salud y Bienestar", nameVal: "Salut i Benestar" },
  { name: "Alimentación", nameVal: "Alimentació" },
  { name: "Belleza", nameVal: "Bellesa" },
  { name: "Educación", nameVal: "Educació" },
  { name: "Automóviles", nameVal: "Automòbils" },
  { name: "Papelería y quioscos", nameVal: "Papereria i quioscs" },
  { name: "Decoración e interiorismo", nameVal: "Decoració i interiorisme" },
  { name: "Moda y complementos", nameVal: "Moda i complements" },
  { name: "Otros servicios", nameVal: "Altres serveis" },
  { name: "Construcción y servicios", nameVal: "Construcció i serveis" },
  { name: "Inmobiliaria", nameVal: "Immobiliària" },
  { name: "Telefonía", nameVal: "Telefonia" },
  { name: "Seguros", nameVal: "Assegurances" },
  { name: "Deportes", nameVal: "Esports" },
  { name: "Imprenta y grafismo", nameVal: "Impremta i grafisme" },
  { name: "Floristerías", nameVal: "Floristeries" },
  { name: "Farmacias", nameVal: "Farmàcies" },
  { name: "Autoescuelas", nameVal: "Autoescoles" },
  { name: "Artesanía", nameVal: "Artesania" },
  { name: "Servicios agrícolas", nameVal: "Serveis agrícoles" },
  { name: "Multitienda", nameVal: "Multibotiga" },
  { name: "Electrodomésticos", nameVal: "Electrodomèstics" },
  { name: "Gestorías", nameVal: "Gestories" },
  { name: "Internet", nameVal: "Internet" },
  { name: "Tatuajes", nameVal: "Tatuatges" },
  { name: "Comunicación", nameVal: "Comunicació" },
  { name: "Entidades bancarias", nameVal: "Entitats bancàries" },
  { name: "Droguería y perfumería", nameVal: "Drogueria i perfumeria" },
  { name: "Ferreterías", nameVal: "Ferreteries" },
  { name: "Informática", nameVal: "Informàtica" },
  { name: "Mascotas", nameVal: "Mascotes" },
];

/** Slug de taxonomía WordPress en acbetera.com → nombre de categoría raíz. */
export const ACBETERA_CATEGORY_SLUG_MAP: Record<string, string> = {
  hosteleria: "Hostelería",
  "salud-y-bienestar": "Salud y Bienestar",
  alimentacion: "Alimentación",
  belleza: "Belleza",
  educacion: "Educación",
  automoviles: "Automóviles",
  "papeleria-quioscos": "Papelería y quioscos",
  "decoracion-e-interiorismo": "Decoración e interiorismo",
  "moda-y-complementos": "Moda y complementos",
  "otros-servicios": "Otros servicios",
  "construccion-servicios": "Construcción y servicios",
  inmobiliaria: "Inmobiliaria",
  telefonia: "Telefonía",
  seguros: "Seguros",
  deportes: "Deportes",
  "imprenta-grafismo": "Imprenta y grafismo",
  floristerias: "Floristerías",
  farmacias: "Farmacias",
  autoescuelas: "Autoescuelas",
  artesania: "Artesanía",
  "servicios-agricolas": "Servicios agrícolas",
  multitienda: "Multitienda",
  electrodomesticos: "Electrodomésticos",
  gestorias: "Gestorías",
  internet: "Internet",
  tatuajes: "Tatuajes",
  comunicacion: "Comunicación",
  "entidades-bancarias": "Entidades bancarias",
  "drogueria-perfumeria": "Droguería y perfumería",
  ferreterias: "Ferreterías",
  informatica: "Informática",
  mascotas: "Mascotas",
};

export function acbeteraCategorySlugsFromHtml(html: string): string[] {
  const matches = html.match(/dt_portfolio_category-([a-z0-9-]+)/g) ?? [];
  return [
    ...new Set(
      matches
        .map((m) => m.replace("dt_portfolio_category-", ""))
        .filter((slug) => !/^\d+$/.test(slug)),
    ),
  ];
}

export function categoryPathFromAcbeteraHtml(html: string): string | null {
  for (const slug of acbeteraCategorySlugsFromHtml(html)) {
    const name = ACBETERA_CATEGORY_SLUG_MAP[slug];
    if (name) return name;
  }
  return null;
}

export function inferCommerceCategoryPath(name: string, description: string): string {
  const t = `${name} ${description}`.toLowerCase();

  if (/restaurante|bar |cafeter|taper|forn|pastiss|hosteler|gastro|mesón|meson|pizzer|asador|cervecer|tapas|bistr|cantina|horno|panader/.test(t)) {
    return "Hostelería";
  }
  if (/farmaci|clínica dental|clinica dental|fisioterap|osteopat|nutrici|salud|dentista|óptica|optica/.test(t)) {
    return "Salud y Bienestar";
  }
  if (/coviran|supermercado|alimentaci|charcuter|carnicer|fruter/.test(t)) {
    return "Alimentación";
  }
  if (/peluquer|barber|estética|estetica|belleza|uñas|unas|tatuaj/.test(t)) {
    return "Belleza";
  }
  if (/autoescuela|academia|educaci|guarder|idiomas/.test(t)) {
    return "Educación";
  }
  if (/taller|motor|automóvil|automovil|concesionario|neumát|neumat|mecánic|mecanic|bikes|biciclet/.test(t)) {
    return "Automóviles";
  }
  if (/papeler|quiosco|lotería|loteria/.test(t)) {
    return "Papelería y quioscos";
  }
  if (/decoraci|interiorismo|mueble/.test(t)) {
    return "Decoración e interiorismo";
  }
  if (/moda|ropa|calzado|complemento|joyer/.test(t)) {
    return "Moda y complementos";
  }
  if (/arquitect|construcc|reforma|fontaner|electric/.test(t)) {
    return "Construcción y servicios";
  }
  if (/inmobiliar/.test(t)) {
    return "Inmobiliaria";
  }
  if (/telefon|móvil|movil/.test(t)) {
    return "Telefonía";
  }
  if (/segur|corredur/.test(t)) {
    return "Seguros";
  }
  if (/deporte|gimnas|fitness|padel|fútbol|futbol/.test(t)) {
    return "Deportes";
  }
  if (/imprent|grafism|rotul/.test(t)) {
    return "Imprenta y grafismo";
  }
  if (/florister/.test(t)) {
    return "Floristerías";
  }
  if (/gestor|asesor|asesoría|asesoria|abogad/.test(t)) {
    return "Gestorías";
  }
  if (/electrodom|informát|informatic|ordenador|software|pixel|web |internet/.test(t)) {
    return /electrodom/.test(t) ? "Electrodomésticos" : "Informática";
  }
  if (/mascot|veterin|pienso/.test(t)) {
    return "Mascotas";
  }
  if (/ferreter/.test(t)) {
    return "Ferreterías";
  }
  if (/droguer|perfumer/.test(t)) {
    return "Droguería y perfumería";
  }
  if (/banco|entidad bancaria/.test(t)) {
    return "Entidades bancarias";
  }
  if (/artesan/.test(t)) {
    return "Artesanía";
  }
  if (/agrícol|agricol|vivero/.test(t)) {
    return "Servicios agrícolas";
  }
  if (/multitienda|bazar/.test(t)) {
    return "Multitienda";
  }
  if (/comunicaci|marketing|medios/.test(t)) {
    return "Comunicación";
  }

  return "Otros servicios";
}
