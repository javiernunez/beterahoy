import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { UserNav } from "@/components/UserNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavItemIcon } from "@/components/NavItemIcon";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { getNavLabelByHref, getTranslator } from "@/lib/i18n";
import { getLocaleFromCookie } from "@/lib/i18n-server";

export async function Header() {
  const locale = getLocaleFromCookie();
  const t = getTranslator(locale);
  const pathname = headers().get("x-pathname") || "/";

  return (
    <header className="sticky top-0 z-40 border-b border-betera-sand/80 bg-betera-cream/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-betera-cream/90">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3 md:py-4">
        <Link href="/" aria-label={SITE_NAME} className="block">
          <Image
            src="/branding/logo-beterahoy.png"
            alt={SITE_NAME}
            width={437}
            height={120}
            priority
            className="h-9 w-auto max-w-[min(100%,20rem)] md:h-10 md:max-w-[min(100%,24rem)]"
          />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <UserNav locale={locale} />
        </div>
      </div>

      <div className="border-t border-betera-sand/70 bg-gradient-to-b from-white to-betera-mist/50">
        <nav className="container-page overflow-x-auto !py-0" aria-label={t("nav.main")}>
          <ul className="flex min-w-max items-center gap-1.5 py-2 md:py-2.5">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`betera-nav-link group ${active ? "betera-nav-link-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="shrink-0">
                      <NavItemIcon id={item.icon} className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </span>
                    {getNavLabelByHref(item.href, t)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
