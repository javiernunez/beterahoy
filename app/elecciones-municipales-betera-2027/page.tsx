import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdBreadcrumbList } from "@/components/JsonLdBreadcrumb";
import { NewsCard } from "@/components/NewsCard";
import { SharePlatformsRow } from "@/components/SharePlatformsRow";
import { getLocaleFromCookie } from "@/lib/i18n-server";
import { localizedText } from "@/lib/localized";
import { prisma } from "@/lib/prisma";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { canonicalPath, truncateMetaDescription } from "@/lib/seo";

export const dynamic = "force-dynamic";

function isDbUnavailable(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return (
    message.includes("Can't reach database server") ||
    message.includes("PrismaClientInitializationError") ||
    message.includes("ECONNREFUSED")
  );
}

const SLUG = "elecciones-municipales-betera-2027";
const PAGE_PATH = `/${SLUG}`;

const descriptionEs =
  "Contexto, memoria electoral y claves de las elecciones municipales 2027 en Bétera: corporación saliente PP–Mas Camarena, urbanismo y servicios. Jornada: 23 de mayo de 2027.";
const descriptionVal =
  "Context, memòria electoral i claus de les eleccions municipals 2027 a Bétera: corporació sortint PP–Mas Camarena, urbanisme i serveis. Jornada: 23 de maig de 2027.";

const descEsShort = truncateMetaDescription(descriptionEs, 160);
const descValShort = truncateMetaDescription(descriptionVal, 160);

const pageUrl = canonicalPath(PAGE_PATH);
/** Banner ancho: hero junto al título (<h1>) y OG/Twitter. */
const OG_BANNER = "/banner-elecciones-municipales-betera-2027-wide.png";
const ogImage = canonicalPath(OG_BANNER);

type UpcomingItem = { icon: string; title: string; body: string };
type HistoryItem = { year: string; text: string };
type WatchItem = { title: string; body: string };

const COPY = {
  es: {
    webPageName: "Elecciones municipales Bétera 2027",
    eventName: "Elecciones municipales en Bétera 2027",
    shareTitle: "Elecciones municipales Bétera 2027",
    sectionContext: "Contexto de estas elecciones",
    contextBody:
      "Bétera elige 21 concejales; la mayoría absoluta son 11. La legislatura 2023–2027 cierra con un ejecutivo estable del PP (8) y Mas Camarena–Torre en Conill (4), con María Elia Verdevío como alcaldesa — cargo que ostenta desde 2019. La oposición principal es Acord per Guanyar (5 concejales). A junio de 2026 no constan candidaturas oficiales ni pactos previos anunciados.",
    sectionHistory: "Perspectiva histórica",
    history: [
      {
        year: "2015–2019",
        text: "Compromís gobernó con Cristina Alemany como alcaldesa; referencia para comparar gestiones cuando haya datos verificables por áreas.",
      },
      {
        year: "2019",
        text: "El PP recuperó la alcaldía con apoyo de Ciudadanos y Mas Camarena–Torre en Conill. La lista de urbanizaciones del sur mantuvo 4 concejales.",
      },
      {
        year: "2023",
        text: "El PP duplicó escaños (de 4 a 8) y Ciudadanos desapareció del pleno. Se repitió el pacto PP + MC-TC (12 votos) frente a Acord per Guanyar (5). Participación: 68,4 %.",
      },
      {
        year: "2027",
        text: "Comicio previsto el 23-M dentro del calendario electoral estatal; convocatoria y plazos definitivos pendientes de publicación oficial (BOE / DOGV).",
      },
    ] satisfies HistoryItem[],
    sectionWatch: "Qué tener en cuenta en 2027",
    watchIntro:
      "Estos ejes salen del mandato actual y del debate local documentado; no son predicciones ni encuestas.",
    watch: [
      {
        title: "Pacto PP – Mas Camarena–Torre en Conill",
        body: "La mayoría actual (12/21) depende de renovar o romper la coalición con la lista ligada a Mas Camarena y Torre en Conill — clave del voto en el sur del municipio.",
      },
      {
        title: "Oposición y posibles confluencias de izquierdas",
        body: "Acord per Guanyar (Compromís) y PSPV-PSOE (2 escaños) pueden buscar fórmulas unitarias; VOX (2) podría actuar como bisagra en una investidura ajustada.",
      },
      {
        title: "Urbanismo y crecimiento",
        body: "Presión demográfica, sector R-13 Habitat, densidad en urbanizaciones y equipamientos (sanidad, educación, movilidad) suelen marcar el debate entre casco y periferia.",
      },
      {
        title: "Continuidad o relevo en la alcaldía",
        body: "Verdevío (PP) y figuras como Alemany (oposición) o Abad Palomar (MC-TC, primer teniente) serán referentes hasta que se oficialicen las listas.",
      },
    ] satisfies WatchItem[],
    disclaimer:
      "Sin inventar candidatos, encuestas ni acuerdos no anunciados públicamente. Actualizaremos esta página con las candidaturas cuando se publiquen.",
    sectionUpcoming: "Próximamente en esta sección",
    sectionUpcomingHint: "Estamos preparando contenido; conforme se acerque la campaña, iremos publicando.",
    moreContext: "Más contexto",
    breadcrumb: "Elecciones 2027",
    bannerHeadingAlt: `Especial Elecciones Municipales 2027. ${SITE_NAME}.`,
    sectionNews: "Últimas noticias del especial",
    sectionNewsEmpty:
      "Aún no hay noticias en la categoría Elecciones 2027. Cuando publiquemos piezas sobre el proceso electoral municipal, aparecerán aquí.",
    sectionNewsSeeAll: "Ver todas en Noticias",
    upcoming: [
      { icon: "🗳️", title: "Lista de partidos políticos que concurren", body: "Cuando se publiquen las candidaturas oficiales, recogeremos quién se presenta en Bétera." },
      { icon: "⚖️", title: "Comparativa de propuestas de los programas electorales", body: "Resumen y comparación de ejes clave para decidir con criterio." },
      { icon: "🎙️", title: "Entrevistas a los principales candidatos a la alcaldía", body: "Propuestas y prioridades directamente de los cabezas de lista." },
      { icon: "📰", title: "Noticias sobre todo el proceso y resultados", body: "Campaña, debates, jornada del 23-M y análisis de lo que ocurre en el consistorio." },
    ] satisfies UpcomingItem[],
  },
  val: {
    webPageName: "Eleccions municipals Bétera 2027",
    eventName: "Eleccions municipals a Bétera 2027",
    shareTitle: "Eleccions municipals Bétera 2027",
    sectionContext: "Context d'estes eleccions",
    contextBody:
      "Bétera elegeix 21 regidors; la majoria absoluta són 11. La legislatura 2023–2027 acaba amb un executiu estable del PP (8) i Mas Camarena–Torre en Conill (4), amb María Elia Verdevío com a alcaldessa — càrrec que ocupa des de 2019. L'oposició principal és Acord per Guanyar (5 regidors). A juny de 2026 no consten candidatures oficials ni pactes previs anunciats.",
    sectionHistory: "Perspectiva històrica",
    history: [
      {
        year: "2015–2019",
        text: "Compromís va governar amb Cristina Alemany com a alcaldessa; referència per a comparar gestions quan hi haja dades verificables per àrees.",
      },
      {
        year: "2019",
        text: "El PP va recuperar l'alcaldia amb suport de Ciutadans i Mas Camarena–Torre en Conill. La llista d'urbanitzacions del sud va mantindre 4 regidors.",
      },
      {
        year: "2023",
        text: "El PP va duplicar escons (de 4 a 8) i Ciutadans va desaparéixer del ple. Es va repetir el pacte PP + MC-TC (12 vots) davant d'Acord per Guanyar (5). Participació: 68,4 %.",
      },
      {
        year: "2027",
        text: "Comici previst el 23-M dins del calendari electoral estatal; convocatòria i terminis definitius pendents de publicació oficial (BOE / DOGV).",
      },
    ] satisfies HistoryItem[],
    sectionWatch: "Què tenir en compte el 2027",
    watchIntro:
      "Aquests eixos ixen del mandat actual i del debat local documentat; no són prediccions ni enquestes.",
    watch: [
      {
        title: "Pacte PP – Mas Camarena–Torre en Conill",
        body: "La majoria actual (12/21) depén de renovar o trencar la coalició amb la llista lligada a Mas Camarena i Torre en Conill — clau del vot al sud del municipi.",
      },
      {
        title: "Oposició i possibles confluències d'esquerres",
        body: "Acord per Guanyar (Compromís) i PSPV-PSOE (2 escons) poden buscar fórmules unitàries; VOX (2) podria actuar com a frontissa en una investidura ajustada.",
      },
      {
        title: "Urbanisme i creixement",
        body: "Pressió demogràfica, sector R-13 Habitat, densitat en urbanitzacions i equipaments (sanitat, educació, mobilitat) solen marcar el debat entre nucli i perifèria.",
      },
      {
        title: "Continuïtat o relleu a l'alcaldia",
        body: "Verdevío (PP) i figures com Alemany (oposició) o Abad Palomar (MC-TC, primer tinent) seran referents fins que es oficialitzen les llistes.",
      },
    ] satisfies WatchItem[],
    disclaimer:
      "Sense inventar candidats, enquestes ni acords no anunciats públicament. Actualitzarem esta pàgina amb les candidatures quan es publiquen.",
    sectionUpcoming: "Pròximament en aquesta secció",
    sectionUpcomingHint: "Estem preparant contingut; conforme s'acosti la campanya, anirem publicant.",
    moreContext: "Més context",
    breadcrumb: "Eleccions 2027",
    bannerHeadingAlt: `Especial Eleccions Municipals 2027. ${SITE_NAME}.`,
    sectionNews: "Últimes notícies de l'especial",
    sectionNewsEmpty:
      "Encara no hi ha notícies en la categoria Eleccions 2027. Quan publiquem peces sobre el procés electoral municipal, apareixeran ací.",
    sectionNewsSeeAll: "Veure totes a Notícies",
    upcoming: [
      { icon: "🗳️", title: "Llista de partits polítics que concorren", body: "Quan es publiquen les candidatures oficials, recollirem qui es presenta a Bétera." },
      { icon: "⚖️", title: "Comparativa de propostes dels programes electorals", body: "Resum i comparació de temes clau per a ajudar-te a decidir amb criteri." },
      { icon: "🎙️", title: "Entrevistes als principals candidats a l'alcaldia", body: "Propostes i prioritats directament dels caps de llista." },
      { icon: "📰", title: "Notícies sobre tot el procés i resultats", body: "Campanya, debats, jornada del 23-M i anàlisi del que passa al consistori." },
    ] satisfies UpcomingItem[],
  },
} as const;

export const metadata: Metadata = {
  title: "Elecciones municipales Bétera 2027",
  description: descEsShort,
  keywords: [
    "elecciones municipales 2027",
    "Bétera",
    "Bétera",
    "Camp de Túria",
    "Valencia",
    "ayuntamiento Bétera",
    "candidatos alcaldía",
    "programas electorales",
    "23 mayo 2027",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    title: `Elecciones municipales Bétera 2027 | ${SITE_NAME}`,
    description: descEsShort,
    url: pageUrl,
    locale: "es_ES",
    siteName: SITE_NAME,
    images: [{ url: ogImage, width: 1024, height: 372, alt: "Especial Elecciones Municipales 2027 Bétera" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Elecciones municipales Bétera 2027 | ${SITE_NAME}`,
    description: descEsShort,
    images: [ogImage],
  },
};

export default async function EleccionesMunicipales2027Page() {
  const locale = getLocaleFromCookie();
  const isVal = locale === "val";
  const t = COPY[isVal ? "val" : "es"];
  const descPlain = isVal ? descValShort : descEsShort;
  const fullUrl = `${SITE_URL}${PAGE_PATH}`;

  let electionArticles: Awaited<ReturnType<typeof prisma.article.findMany>> = [];
  try {
    electionArticles = await prisma.article.findMany({
      where: { category: "ELECCIONES_2027", status: "published" },
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    if (!isDbUnavailable(error)) throw error;
  }

  const localizedNews = electionArticles.map((article) => ({
    ...article,
    title: localizedText(locale, article.title, article.titleVal),
    summary: localizedText(locale, article.summary, article.summaryVal) || null,
    content: localizedText(locale, article.content, article.contentVal),
  }));
  const [leadNews, ...restNews] = localizedNews;

  const webPageJson = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.webPageName,
    description: descPlain,
    url: fullUrl,
    inLanguage: isVal ? "ca-ES" : "es-ES",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
    },
  };

  const electionEventJson = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: t.eventName,
    description: descPlain,
    startDate: "2027-05-23T09:00:00+02:00",
    endDate: "2027-05-23T20:00:00+02:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Bétera",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bétera",
        addressRegion: "Valencia",
        addressCountry: "ES",
      },
    },
    url: fullUrl,
  };

  return (
    <article className="container-page max-w-3xl py-8 md:py-10">
      <JsonLdBreadcrumbList
        items={[
          { name: isVal ? "Inici" : "Inicio", path: "/" },
          { name: t.breadcrumb, path: PAGE_PATH },
        ]}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJson) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(electionEventJson) }}
      />

      <header className="border-b border-slate-200 pb-8">
        <h1 className="m-0 leading-none border-0 p-0 shadow-none outline-none">
          {/* eslint-disable-next-line @next/next/no-img-element -- hero local */}
          <img
            src={OG_BANNER}
            width={1024}
            height={372}
            alt={t.bannerHeadingAlt}
            className="h-auto w-full rounded-2xl border border-slate-200/80 shadow-sm"
            fetchPriority="high"
            decoding="async"
          />
        </h1>
        <p className="mt-6 text-base text-slate-600">
          <LeadParagraph isVal={isVal} />
        </p>
        <SharePlatformsRow url={fullUrl} title={t.shareTitle} isVal={isVal} className="mt-4" />
      </header>

      <ElectionContextSections t={t} />

      <section className="mt-10" aria-labelledby="elecciones-noticias-heading">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-3">
          <h2 id="elecciones-noticias-heading" className="text-xl font-bold text-slate-900">
            {t.sectionNews}
          </h2>
          <Link
            href="/noticias?categoria=ELECCIONES_2027"
            className="text-sm font-semibold text-betera-leaf-dark underline decoration-blue-300 underline-offset-2 hover:no-underline"
          >
            {t.sectionNewsSeeAll}
          </Link>
        </div>
        {localizedNews.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">{t.sectionNewsEmpty}</p>
        ) : (
          <div className="mt-6">
            {leadNews ? <NewsCard key={leadNews.id} article={leadNews} lead /> : null}
            <div className="divide-y divide-slate-200">
              {restNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">{t.sectionUpcoming}</h2>
        <p className="mt-2 text-sm text-slate-600">{t.sectionUpcomingHint}</p>
        <ul className="mt-6 space-y-4">
          {t.upcoming.map((item) => (
            <li
              key={item.title}
              className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
            >
              <span className="text-2xl leading-none" aria-hidden>
                {item.icon}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <MoreContext isVal={isVal} heading={t.moreContext} />
    </article>
  );
}

function LeadParagraph({ isVal }: { readonly isVal: boolean }) {
  if (isVal) {
    return (
      <>
        Les <strong>eleccions municipals</strong> estan previstes per al{" "}
        <time dateTime="2027-05-23">diumenge 23 de maig de 2027</time> (calendari electoral estatal). Ací reunim
        context, memòria del cicle 2023–2027 i el seguiment editorial de <strong>{SITE_NAME}</strong>.
      </>
    );
  }
  return (
    <>
      Las <strong>elecciones municipales</strong> están previstas para el{" "}
      <time dateTime="2027-05-23">domingo 23 de mayo de 2027</time> (calendario electoral estatal). Aquí reunimos
      contexto, memoria del ciclo 2023–2027 y el seguimiento editorial de <strong>{SITE_NAME}</strong>.
    </>
  );
}

type ElectionCopy = (typeof COPY)["es"];

function ElectionContextSections({ t }: { readonly t: ElectionCopy }) {
  return (
    <>
      <section className="mt-8" aria-labelledby="elecciones-contexto-heading">
        <h2 id="elecciones-contexto-heading" className="text-xl font-bold text-slate-900">
          {t.sectionContext}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-700">{t.contextBody}</p>
      </section>

      <section className="mt-10" aria-labelledby="elecciones-historia-heading">
        <h2 id="elecciones-historia-heading" className="text-xl font-bold text-slate-900">
          {t.sectionHistory}
        </h2>
        <ol className="mt-4 space-y-3 border-l-2 border-betera-leaf/40 pl-4">
          {t.history.map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute -left-[calc(1rem+5px)] top-1.5 h-2 w-2 rounded-full bg-betera-leaf" aria-hidden />
              <p className="text-sm font-semibold text-slate-900">{item.year}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-slate-700">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="elecciones-claves-heading">
        <h2 id="elecciones-claves-heading" className="text-xl font-bold text-slate-900">
          {t.sectionWatch}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{t.watchIntro}</p>
        <ul className="mt-4 space-y-3">
          {t.watch.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">{t.disclaimer}</p>
      </section>
    </>
  );
}

function MoreContext({ isVal, heading }: { readonly isVal: boolean; readonly heading: string }) {
  return (
    <section className="mt-10 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 text-sm text-slate-700">
      <p className="font-semibold text-slate-900">{heading}</p>
      <p className="mt-2">
        {isVal ? (
          <>
            Pots seguir la política local al nostre apartat de{" "}
            <Link href="/politica" className="font-semibold text-betera-leaf-dark underline hover:no-underline">
              Política
            </Link>
            , les notícies d&apos;este especial a{" "}
            <Link href="/noticias?categoria=ELECCIONES_2027" className="font-semibold text-betera-leaf-dark underline hover:no-underline">
              Eleccions 2027
            </Link>{" "}
            i la política local general al{" "}
            <Link href="/noticias?categoria=POLITICA_LOCAL" className="font-semibold text-betera-leaf-dark underline hover:no-underline">
              butlletí
            </Link>
            .
          </>
        ) : (
          <>
            Puedes seguir la política local en nuestra sección de{" "}
            <Link href="/politica" className="font-semibold text-betera-leaf-dark underline hover:no-underline">
              Política
            </Link>
            , las noticias de este especial en{" "}
            <Link href="/noticias?categoria=ELECCIONES_2027" className="font-semibold text-betera-leaf-dark underline hover:no-underline">
              Elecciones 2027
            </Link>{" "}
            y el resto de política local en el{" "}
            <Link href="/noticias?categoria=POLITICA_LOCAL" className="font-semibold text-betera-leaf-dark underline hover:no-underline">
              boletín
            </Link>
            .
          </>
        )}
      </p>
    </section>
  );
}
