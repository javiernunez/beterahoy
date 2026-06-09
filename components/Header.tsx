import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { UserNav } from "@/components/UserNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { HeaderNav } from "@/components/HeaderNav";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { getNavLabelByHref, getTranslator } from "@/lib/i18n";
import { getLocaleFromCookie } from "@/lib/i18n-server";

export async function Header() {
  const locale = getLocaleFromCookie();
  const t = getTranslator(locale);
  const pathname = headers().get("x-pathname") || "/";

  const navItems = NAV_ITEMS.map((item) => ({
    href: item.href,
    label: getNavLabelByHref(item.href, t),
    icon: item.icon,
    active: pathname === item.href || pathname.startsWith(`${item.href}/`),
  }));

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

      <HeaderNav
        items={navItems}
        navLabel={t("nav.main")}
        openLabel={t("menu.open")}
        closeLabel={t("menu.close")}
      />
    </header>
  );
}
