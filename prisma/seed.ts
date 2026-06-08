import { PrismaClient, ArticleCategory } from "@prisma/client";
import { seedCommerceRootCategories } from "../lib/seed-commerce-categories";

const prisma = new PrismaClient();

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type CategorySeed = {
  kind: "COMMERCE" | "SPORT" | "ASSOCIATION" | "POLITICS";
  name: string;
  nameVal?: string | null;
  children?: Array<{ name: string; nameVal?: string | null }>;
};

const BASE_DIRECTORY_CATEGORIES: CategorySeed[] = [
  {
    kind: "SPORT",
    name: "Deporte",
    nameVal: "Esport",
    children: [{ name: "Futbol", nameVal: "Futbol" }],
  },
  {
    kind: "ASSOCIATION",
    name: "Asociacion vecinal",
    nameVal: "Associacio veinal",
    children: [],
  },
  {
    kind: "ASSOCIATION",
    name: "Cultura",
    nameVal: "Cultura",
    children: [],
  },
  {
    kind: "POLITICS",
    name: "Partits",
    nameVal: "Partidos",
    children: [{ name: "Municipal", nameVal: "Municipal" }],
  },
];

async function upsertDirectoryCategory(
  kind: "COMMERCE" | "SPORT" | "ASSOCIATION" | "POLITICS",
  name: string,
  nameVal?: string | null,
  parentId?: number | null,
) {
  const existing = await prisma.localDirectoryCategory.findFirst({
    where: { kind, name, parentId: parentId ?? null },
  });
  if (existing) {
    return prisma.localDirectoryCategory.update({
      where: { id: existing.id },
      data: { nameVal: nameVal ?? existing.nameVal ?? null },
    });
  }
  let baseSlug = parentId
    ? slugify(
        `${(await prisma.localDirectoryCategory.findUnique({ where: { id: parentId } }))!.name}-${name}`,
      )
    : slugify(name);
  if (!baseSlug) baseSlug = "categoria";

  for (let counter = 0; counter < 10_000; counter++) {
    const slug = counter === 0 ? baseSlug : `${baseSlug}-${counter}`;
    const bySlug = await prisma.localDirectoryCategory.findFirst({ where: { kind, slug } });
    if (!bySlug) {
      return prisma.localDirectoryCategory.create({
        data: { kind, name, nameVal: nameVal ?? null, parentId: parentId ?? null, slug },
      });
    }
    if (bySlug.name === name && (bySlug.parentId ?? null) === (parentId ?? null)) {
      return prisma.localDirectoryCategory.update({
        where: { id: bySlug.id },
        data: { nameVal: nameVal ?? bySlug.nameVal ?? null },
      });
    }
  }
  throw new Error(`No slug for ${kind}/${name}`);
}

async function seedDirectoryCategories() {
  await seedCommerceRootCategories();
  for (const root of BASE_DIRECTORY_CATEGORIES) {
    const parent = await upsertDirectoryCategory(root.kind, root.name, root.nameVal ?? null, null);
    for (const child of root.children ?? []) {
      await upsertDirectoryCategory(root.kind, child.name, child.nameVal ?? null, parent.id);
    }
  }
}

async function seedLocalDirectory() {
  const imageUrl = "/images/comercios/catalogo-local-placeholder.svg";
  const commerce = [
    { kind: "COMMERCE" as const, name: "Mercadona Bétera", category: "Supermercado", description: "Supermercado de proximidad en el casco.", sortOrder: 10 },
    { kind: "COMMERCE" as const, name: "Centro Comercial Mas Camarena", category: "Supermercado", description: "Zona comercial y servicios en la urbanización.", sortOrder: 20 },
    { kind: "COMMERCE" as const, name: "Bar Plaza Bétera", category: "Bar", description: "Hostelería en el centro del municipio.", sortOrder: 30 },
    { kind: "COMMERCE" as const, name: "Restaurante La Huerta", category: "Mediterranea", description: "Cocina mediterránea y arroces.", sortOrder: 40 },
  ];
  const associations = [
    { kind: "ASSOCIATION" as const, name: "Asociación de Vecinos Mas Camarena", category: "Asociacion vecinal", description: "Representación vecinal de la gran urbanización.", sortOrder: 10 },
    { kind: "ASSOCIATION" as const, name: "Unió Musical de Bétera", category: "Cultura", description: "Sociedad musical del municipio.", sortOrder: 20 },
    { kind: "ASSOCIATION" as const, name: "Club Deportivo Bétera", category: "Deporte", description: "Fútbol y actividades deportivas locales.", sortOrder: 30 },
    { kind: "ASSOCIATION" as const, name: "Asociación Fallera", category: "Cultura", description: "Comisión y actividades falleras.", sortOrder: 40 },
  ];
  for (const item of [...commerce, ...associations]) {
    const slug = slugify(`${item.kind}-${item.name}`);
    await prisma.localDirectoryEntry.upsert({
      where: { slug },
      update: { ...item, imageUrl },
      create: { ...item, slug, imageUrl },
    });
  }
}

async function seedNostrePoble() {
  const pages = [
    {
      category: "HISTORY" as const,
      slug: "historia-betera-huerta",
      title: "Historia: de la huerta al municipio moderno",
      titleVal: "Història: de l'horta al municipi modern",
      summary: "Bétera, en el Camp de Túria, pasó de alquería agrícola a uno de los municipios más poblados de la comarca.",
      summaryVal: "Bétera, al Camp de Túria, d'alqueria a municipi densament poblat.",
      content: `## Camp de Túria

Bétera se sitúa a unos **15 km de Valencia**, en la **Horta** y el corredor noroeste metropolitano. Con **~22.000 habitantes** y **17 km²**, es el **tercer municipio más poblado** del Camp de Túria.

## Comunicaciones históricas

La llegada del **Metro Línea 1** y las autovías transformó el municipio en ciudad dormitorio y residencial de alto dinamismo, con urbanizaciones como **Mas Camarena** y **Torre en Conill**.`,
      contentVal: `## Camp de Túria

~22.000 habitants. Tercer municipi més poblat de la comarca.`,
      sortOrder: 10,
    },
    {
      category: "TRADITIONS" as const,
      slug: "fiestas-patronales-betera",
      title: "Fiestas patronales y tradiciones",
      titleVal: "Festes patronals i tradicions",
      summary: "Fallas, fiestas patronales y calendario cultural municipal.",
      summaryVal: "Falles, festes patronals i cultura municipal.",
      content: `El calendario festivo incluye **Fallas**, fiestas patronales y actividades en el casco y en Mas Camarena. Consulta el tablón del ayuntamiento.`,
      contentVal: `Falles i festes patronals. Consulta l'ajuntament.`,
      sortOrder: 20,
    },
    {
      category: "OTHER" as const,
      slug: "mas-camarena-urbanizacion",
      title: "Mas Camarena y el sur de Bétera",
      titleVal: "Mas Camarena i el sud de Bétera",
      summary: "La mayor urbanización del municipio concentra población, comercio y demanda de nuevos equipamientos.",
      summaryVal: "La major urbanització del municipi.",
      content: `**Mas Camarena** y **Torre en Conill** concentran gran parte del crecimiento reciente. El **consultorio auxiliar sur** (calle Opal) responderá a ~6.400 usuarios según la Conselleria de Sanidad.`,
      contentVal: `Mas Camarena i consultori sud (carrer Opal).`,
      sortOrder: 30,
    },
  ];
  for (const p of pages) {
    await prisma.nostrePoblePage.upsert({ where: { slug: p.slug }, update: p, create: p });
  }
}

async function seedArticles() {
  const articles = [
    {
      title: "Bétera ampliará su Centro de Salud con más de 2.200 m²",
      titleVal: "Bétera ampliarà el seu Centre de Salut amb més de 2.200 m²",
      slug: "betera-ampliacion-centro-salud-2025",
      category: "GENERAL" as ArticleCategory,
      isHero: true,
      portadaRank: 100,
      summary: "El solar colindante ya tiene uso sanitario en el DOGV; la ampliación podría duplicar la superficie construida.",
      content: `El Ayuntamiento de Bétera ha completado el cambio de uso del **solar colindante al centro de salud** a espacio sanitario, publicado en el **DOGV**, lo que permite avanzar en una ampliación de más de **2.200 m²** para descongestionar el ambulatorio.`,
      contentVal: `El solar colindant al centre de salut ja té ús sanitari al DOGV.`,
    },
    {
      title: "Nuevo consultorio auxiliar en la zona sur: calle Opal, Mas Camarena",
      slug: "consultorio-auxiliar-sur-betera-opal",
      category: "GENERAL" as ArticleCategory,
      portadaRank: 90,
      summary: "Proyecto en redacción para ~6.400 usuarios entre Mas Camarena y Torre en Conill.",
      summaryVal: null,
      content: `La Conselleria de Sanidad y el Ayuntamiento impulsan un **consultorio auxiliar** en la **calle Opal** (~937 m², dos plantas) para la zona sur del municipio.`,
      contentVal: null,
    },
    {
      title: "Bétera inaugura el Espai Jove i d'Igualitat con 2,3 millones de inversión",
      slug: "espai-jove-igualitat-betera-2026",
      category: "CULTURA" as ArticleCategory,
      portadaRank: 80,
      summary: "Más de 1.300 m² en la calle La Creu: sala de eventos, aulas y espacios para asociaciones.",
      summaryVal: null,
      content: `El nuevo **Espai Jove i d'Igualitat** (c/ La Creu) se inaugura con inversión municipal de **2,3 M€**, sala de 315 m² y programación para juventud e igualdad.`,
      contentVal: null,
    },
    {
      title: "Metrobús CV-103 refuerza la conexión de Bétera con Valencia y la universidad",
      slug: "metrobús-betera-valencia-universidad-2025",
      category: "GENERAL" as ArticleCategory,
      portadaRank: 70,
      summary: "Líneas 145 y 136 universitaria mejoran frecuencias en el Camp de Túria.",
      summaryVal: null,
      content: `La reordenación **Metrobús** beneficia a Bétera con mejores frecuencias y la línea **136** directa a la UV y la UPV, además del **Metro Línea 1**.`,
      contentVal: null,
    },
    {
      title: "El Ayuntamiento restablece el horario de tardes los miércoles",
      slug: "ayuntamiento-betera-horario-vespertino",
      category: "GENERAL" as ArticleCategory,
      portadaRank: 60,
      summary: "Atención 9:00–14:00 y miércoles 17:00–19:30 con cita previa.",
      summaryVal: null,
      content: `El consistorio recupera el horario de **miércoles por la tarde** (17:00–19:30). Cita previa: **961 600 351** (ayuntamiento) y **961 698 180** (urbanismo).`,
      contentVal: null,
    },
  ];
  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        titleVal: a.titleVal ?? null,
        category: a.category,
        summary: a.summary,
        summaryVal: a.summaryVal ?? null,
        content: a.content,
        contentVal: a.contentVal ?? null,
        status: "published",
        isHero: a.isHero ?? false,
        portadaRank: a.portadaRank ?? 0,
      },
      create: {
        title: a.title,
        titleVal: a.titleVal ?? null,
        slug: a.slug,
        category: a.category,
        summary: a.summary,
        summaryVal: a.summaryVal ?? null,
        content: a.content,
        contentVal: a.contentVal ?? null,
        status: "published",
        isHero: a.isHero ?? false,
        portadaRank: a.portadaRank ?? 0,
      },
    });
  }
}

async function seedEvents() {
  const events = [
    {
      slug: "puertas-abiertas-espai-jove-betera-2026",
      title: "Puertas abiertas Espai Jove i d'Igualitat",
      titleVal: "Portes obertes Espai Jove",
      description: "Jornada de puertas abiertas y Bétera Gaming Fest en el nuevo equipamiento de La Creu.",
      descriptionVal: null,
      eventDate: new Date("2026-05-15T10:00:00"),
      category: "generico" as const,
    },
    {
      slug: "taller-improvisacion-betera-2026",
      title: "Taller de improvisación (Cultura)",
      titleVal: null,
      description: "Actividad sociocultural municipal. Inscripción en betera.es.",
      descriptionVal: null,
      eventDate: new Date("2026-01-30T17:00:00"),
      category: "teatro" as const,
    },
    {
      slug: "fiestas-patronales-betera-2026",
      title: "Fiestas patronales de Bétera",
      titleVal: "Festes patronals de Bétera",
      description: "Programación de fiestas mayores del municipio.",
      descriptionVal: null,
      eventDate: new Date("2026-09-01T18:00:00"),
      category: "feria" as const,
      details: { endDate: "2026-09-10" },
    },
  ];
  for (const e of events) {
    await prisma.event.upsert({
      where: { slug: e.slug },
      update: {
        title: e.title,
        titleVal: e.titleVal ?? null,
        description: e.description,
        descriptionVal: e.descriptionVal ?? null,
        eventDate: e.eventDate,
        category: e.category,
        details: e.details ?? undefined,
        status: "active",
      },
      create: {
        slug: e.slug,
        title: e.title,
        titleVal: e.titleVal ?? null,
        description: e.description,
        descriptionVal: e.descriptionVal ?? null,
        eventDate: e.eventDate,
        category: e.category,
        details: e.details ?? undefined,
        status: "active",
      },
    });
  }
}

async function main() {
  await seedDirectoryCategories();
  await seedLocalDirectory();
  await seedNostrePoble();
  await seedArticles();
  await seedEvents();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
