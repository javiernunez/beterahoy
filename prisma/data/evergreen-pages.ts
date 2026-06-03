/**
 * Información útil — Bétera (Camp de Túria).
 */

export type EvergreenPageSeed = {
  slug: string;
  title: string;
  titleVal: string;
  content: string;
  contentVal: string;
  isHighlighted?: boolean;
};

export const EVERGREEN_PAGE_SEEDS: EvergreenPageSeed[] = [
  {
    slug: "telefonos-importantes",
    title: "Teléfonos importantes",
    titleVal: "Telèfons importants",
    isHighlighted: true,
    content: `# Teléfonos de emergencia y servicios en Bétera

## Emergencias

| Servicio | Teléfono |
|----------|----------|
| **Emergencias** | [112](tel:112) |
| **Sanidad urgente** | [061](tel:061) |
| **Policía Local** | Consultar [betera.es](https://www.betera.es/) |
| **Guardia Civil** | [062](tel:062) |

## Ayuntamiento de Bétera

- **Centralita:** [961 600 351](tel:961600351)
- **Sede principal:** C/ José Gascón Sirera, 9 — 46117 Bétera
- **Horario:** lunes a viernes 9:00–14:00; **miércoles** también 17:00–19:30
- **Verano (15 jul–15 sep):** tardes cerradas
- **Gestión tributaria:** C/ Colón, 5 — [961 698 316](tel:961698316)
- **Urbanismo:** C/ Les Masses, 26 — [961 698 180](tel:961698180)

Cita previa recomendada para trámites presenciales.`,
    contentVal: `# Telèfons a Bétera

Ajuntament: [961 600 351](tel:961600351). Dill-div 9–14 h; dimecres també 17–19:30 h.`,
  },
  {
    slug: "farmacias-de-guardia",
    title: "Farmacias de guardia",
    titleVal: "Farmàcies de guàrdia",
    isHighlighted: true,
    content: `# Farmacias de guardia en Bétera

Consulta el buscador del [Colegio de Farmacéuticos de Valencia](https://www.cofpv.com/) con código postal **46117** o llama al [961 496 199](tel:961496199).

La farmacia de guardia puede estar en Bétera o en municipios limítrofes (Paterna, Moncada, San Antonio de Benagéber).`,
    contentVal: `# Farmàcies de guàrdia

COF València · CP 46117 · [961 496 199](tel:961496199).`,
  },
  {
    slug: "centro-salud-betera",
    title: "Centro de salud",
    titleVal: "Centre de salut",
    isHighlighted: true,
    content: `# Salud en Bétera

## Centro de salud principal

El ambulatorio de Bétera atiende a una población en crecimiento (~22.000 hab., tercer municipio del Camp de Túria).

## Ampliación y consultorio sur

- **Ampliación:** más de **2.200 m²** en solar colindante (cambio de uso a sanitario aprobado en el DOGV).
- **Consultorio auxiliar sur:** proyectado en **calle Opal** (zona Mas Camarena / Torre en Conill), ~937 m² y ~6.400 usuarios previstos.

La Conselleria de Sanidad y el Ayuntamiento (concejalía de Sanidad) han ratificado estas actuaciones como prioridad.`,
    contentVal: `# Salut a Bétera

Ampliació del centre de salut i nou consultori al sud (carrer Opal).`,
  },
  {
    slug: "salud-betera",
    title: "Salud y emergencias",
    titleVal: "Salut i emergències",
    content: `# Guía de salud

- [Centro de salud y proyectos](/centro-salud-betera)
- [Farmacias de guardia](/farmacias-de-guardia)
- [Hospitales cercanos](/hospitales-cercanos)
- [Urgencias](/urgencias-betera)`,
    contentVal: `# Salut

Enllaços a [centre de salut](/centro-salud-betera) i [farmàcies](/farmacias-de-guardia).`,
  },
  {
    slug: "urgencias-betera",
    title: "Urgencias",
    titleVal: "Urgències",
    content: `# Urgencias

- **112** / **061** — emergencias vitales
- Urgencias de atención primaria según horario del centro de salud
- Hospitales de referencia en **Valencia** — ver [hospitales cercanos](/hospitales-cercanos)`,
    contentVal: `# Urgències: 112, 061`,
  },
  {
    slug: "hospitales-cercanos",
    title: "Hospitales cercanos",
    titleVal: "Hospitals propers",
    content: `# Hospitales desde Bétera

Bétera no tiene hospital general; derivación habitual a **Valencia** (La Fe, Clínico, General, 9 d'Octubre) y **Burjassot** (centro de especialidades).

**Metro Línea 1** desde estación Bétera / Empalme facilita el acceso.`,
    contentVal: `# Hospitals

València i Burjassot. [Transport](/transporte-publico-betera).`,
  },
  {
    slug: "colegios-betera",
    title: "Colegios e institutos",
    titleVal: "Col·legis i instituts",
    isHighlighted: true,
    content: `# Educación en Bétera

Bétera cuenta con centros públicos de infantil, primaria y secundaria, además de referencias concertadas y privadas en la comarca. Consulta la ficha de cada centro en el directorio inferior.

## Escolarización y matrícula

El proceso de **admisión para centros públicos y concertados** lo gestiona la Conselleria de Educación de la Generalitat Valenciana. El plazo suele abrirse entre **marzo y abril** de cada año.

- 🌐 Portal de admisión: [ceice.gva.es/es/web/admision-alumnado](https://ceice.gva.es/es/web/admision-alumnado)
- 📞 Información educación GVA: **012**

## Más información

- [Información útil](/informacion-util)`,
    contentVal: `# Educació a Bétera

Col·legis públics d'infantil i primària, IES de secundària i referències privades a la comarca. Consulta la fitxa de cada centre al directori inferior.

## Escolarització

Portal d'admissió GVA: [ceice.gva.es/es/web/admision-alumnado](https://ceice.gva.es/es/web/admision-alumnado)

## Més informació

- [Informació útil](/informacion-util)`,
  },
  {
    slug: "transporte-publico-betera",
    title: "Transporte público",
    titleVal: "Transport públic",
    isHighlighted: true,
    content: `# Transporte en Bétera

## Metrovalencia — Línea 1

Estación **Bétera** en el corredor hacia Llíria; conexión con Valencia (Empalme, Benimaclet, etc.).

## Autobús (Metrobús / ATMV)

Red **CV-103** (desde mayo 2025): líneas **145**, **136** universitaria, conexión con Paterna, l'Eliana, San Antonio de Benagéber, Llíria, Náquera…

Información: [ETM Valencia](https://www.atmv.es/) — punto de información en Burjassot (Av. Enric Valor, 13).

## Por carretera

A-7, CV-35, enlaces con Paterna, Burjassot y Valencia (~15 km).`,
    contentVal: `# Transport

Metro L1. Metrobus CV-103. [betera.es](https://www.betera.es/)`,
  },
  {
    slug: "movilidad-betera",
    title: "Movilidad",
    titleVal: "Mobilitat",
    content: `# Movilidad

[Transporte público](/transporte-publico-betera) · aparcamientos · vías ciclistas según plan municipal.`,
    contentVal: `[Transport públic](/transporte-publico-betera)`,
  },
  {
    slug: "tramites-betera",
    title: "Trámites en el Ayuntamiento",
    titleVal: "Tràmits a l'Ajuntament",
    isHighlighted: true,
    content: `# Trámites en Bétera

- **Registro integrado** (convenio con AGE y Generalitat desde 2016)
- **Sede electrónica:** [betera.es](https://www.betera.es/)
- **Empadronamiento:** ver [cómo empadronarse](/como-empadronarse)

Bétera: ~17 km², ~22.000 habitantes, comarca **Camp de Túria**.`,
    contentVal: `# Tràmits

Registre integrat. [Empadronament](/como-empadronarse).`,
  },
  {
    slug: "como-empadronarse",
    title: "Cómo empadronarse",
    titleVal: "Com empadronar-se",
    content: `# Empadronamiento

Acude al ayuntamiento (cita previa) con DNI, contrato o escritura y libro de familia si hay menores.

**Horario registro:** 9:00–14:00; miércoles 17:00–19:30.`,
    contentVal: `# Empadronament

Cita prèvia. Dill-div 9–14 h.`,
  },
  {
    slug: "recogida-basura-horarios",
    title: "Recogida de basura",
    titleVal: "Recollida de brossa",
    content: `Consulta calendario en [betera.es](https://www.betera.es/) o tablón de anuncios municipal.`,
    contentVal: `Consulta l'ajuntament.`,
  },
  {
    slug: "puntos-limpios",
    title: "Puntos limpios",
    titleVal: "Punts nets",
    content: `Información de residuos en el ayuntamiento y mancomunidad del Camp de Túria.`,
    contentVal: `Ajuntament de Bétera.`,
  },
  {
    slug: "actividades-ninos",
    title: "Actividades para niños",
    titleVal: "Activitats per a xiquets",
    content: `# Ocio infantil y juvenil

- **Espai Jove i d'Igualtat** (c/ La Creu, 2,3 M€, inaugurado 2026): sala eventos, aulas, asociaciones
- Programación municipal de cultura y deportes
- Polideportivo municipal

Ver [eventos](/eventos-betera).`,
    contentVal: `# Oci juvenil

Espai Jove i d'Igualtat (La Creu).`,
  },
  {
    slug: "eventos-betera",
    title: "Eventos y cultura",
    titleVal: "Esdeveniments i cultura",
    content: `# Agenda cultural

Consulta el [tablón de anuncios](https://www.betera.es/) del ayuntamiento: fiestas patronales, Fallas, actividades en Mas Camarena y casco urbano.`,
    contentVal: `# Cultura

Tauler d'anuncis de l'ajuntament.`,
  },
  {
    slug: "parques-betera",
    title: "Parques y zonas verdes",
    titleVal: "Parcs i zones verdes",
    content: `Bétera apuesta por espacios verdes y la campaña «Vive tus Parques». Consulta rutas y equipamientos en la web municipal.`,
    contentVal: `Espais verds municipals.`,
  },
  {
    slug: "colegio-ceip-lloma-del-mas",
    title: "CEIP Lloma del Mas",
    titleVal: "CEIP Lloma del Mas",
    content: `Colegio público de infantil y primaria en Bétera.`,
    contentVal: `Col·legi públic.`,
  },
  {
    slug: "colegio-ceip-mas-camarena",
    title: "CEIP Mas Camarena",
    titleVal: "CEIP Mas Camarena",
    content: `Centro público en la urbanización Mas Camarena.`,
    contentVal: `Centre públic Mas Camarena.`,
  },
  {
    slug: "colegio-ies-betera",
    title: "IES Bétera",
    titleVal: "IES Bétera",
    content: `Instituto de secundaria y bachillerato del municipio.`,
    contentVal: `Institut de Bétera.`,
  },
  {
    slug: "colegio-caxton-college",
    title: "Caxton College",
    titleVal: "Caxton College",
    content: `Colegio privado bilingüe. [caxtoncollege.com](https://www.caxtoncollege.com/)`,
    contentVal: `Col·legi privat bilingüe.`,
  },
];
