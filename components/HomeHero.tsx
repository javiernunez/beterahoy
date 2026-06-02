import Link from "next/link";
import { CtaLink } from "@/components/CtaLink";
import { QUICK_ACCESS, SITE_NAME } from "@/lib/constants";

type Props = {
  isVal: boolean;
};

export function HomeHero({ isVal }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-betera-forest/20 bg-gradient-to-br from-betera-forest via-[#234d3a] to-betera-forest-light px-6 py-10 text-betera-cream shadow-betera-lg md:px-10 md:py-12">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-betera-leaf/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-betera-lime/15 blur-3xl"
        aria-hidden
      />

      <p className="betera-section-kicker !text-betera-lime/90">{isVal ? "Camp de Túria · València" : "Camp de Túria · Valencia"}</p>
      <h1 className="mt-2 max-w-2xl font-serif text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
        {isVal ? "El teu portal a " : "Tu portal en "}
        <span className="text-betera-lime">Bétera</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-betera-cream/85 md:text-xl">
        {isVal
          ? "Notícies, agenda, comerços i informació pràctica del teu municipi al Camp de Túria."
          : "Noticias, agenda, comercios e información práctica de tu municipio en el Camp de Túria."}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <CtaLink
          href="/denuncias/nueva"
          trackParams={{ cta_name: "home_hero_report", cta_context: "home_hero", destination: "/denuncias/nueva" }}
          className="rounded-full bg-betera-leaf px-5 py-3 text-base font-bold text-white shadow-md transition hover:bg-betera-leaf-dark"
        >
          {isVal ? "Enviar incidència" : "Enviar incidencia"}
        </CtaLink>
        <CtaLink
          href="/noticias"
          trackParams={{ cta_name: "home_hero_news", cta_context: "home_hero", destination: "/noticias" }}
          className="rounded-full border border-betera-cream/30 bg-white/10 px-5 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
        >
          {isVal ? "Últimes notícies" : "Últimas noticias"}
        </CtaLink>
      </div>

      <ul className="mt-8 flex flex-wrap gap-2 border-t border-white/15 pt-6">
        {QUICK_ACCESS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-block rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-betera-cream transition hover:bg-betera-leaf/90 hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-betera-cream/50">
        {SITE_NAME} · {isVal ? "Informació local de Bétera" : "Información local de Bétera"}
      </p>
    </section>
  );
}
