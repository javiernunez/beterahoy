/** Clases reutilizables del diseño Betera Hoy (ver también `app/globals.css`). */
export const ui = {
  link: "font-semibold text-betera-leaf-dark underline decoration-betera-leaf/40 underline-offset-[3px] transition hover:text-betera-forest hover:decoration-betera-forest/50",
  linkSubtle: "font-medium text-betera-forest-light transition hover:text-betera-leaf-dark",
  btnPrimary:
    "inline-flex items-center justify-center rounded-lg bg-betera-forest px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-betera-forest-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-betera-leaf",
  btnGhost:
    "inline-flex items-center justify-center rounded-lg border border-betera-sand bg-white px-3 py-1.5 text-sm font-medium text-betera-ink transition hover:border-betera-leaf/40 hover:bg-betera-mist",
  card: "rounded-2xl border border-betera-sand/90 bg-white p-4 shadow-betera",
  cardHover:
    "rounded-2xl border border-betera-sand/90 bg-white p-4 shadow-betera transition hover:border-betera-leaf/35 hover:shadow-betera-lg",
  chip: "inline-block rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
  sectionTitle: "font-serif text-xl font-bold tracking-tight text-betera-ink md:text-2xl",
  pageTitle: "font-serif text-3xl font-bold tracking-tight text-betera-ink md:text-4xl",
  muted: "text-betera-ink/65",
} as const;
