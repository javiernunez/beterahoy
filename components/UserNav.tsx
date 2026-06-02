import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import type { Locale } from "@/lib/i18n";
import { getTranslator } from "@/lib/i18n";

type UserNavProps = {
  locale?: Locale;
  variant?: "default" | "header";
};

export async function UserNav({ locale = "es", variant = "default" }: UserNavProps) {
  const session = await getServerSession(authOptions);
  const t = getTranslator(locale);
  const onDark = variant === "header";

  const loginClass = onDark
    ? "rounded-lg px-2.5 py-1 text-sm font-medium text-betera-cream/90 transition hover:bg-white/10 hover:text-white"
    : "rounded-lg px-2 py-1 text-sm text-betera-ink/80 hover:bg-betera-mist";
  const registerClass = onDark
    ? "rounded-lg bg-betera-leaf px-2.5 py-1 text-sm font-semibold text-white transition hover:bg-betera-leaf-dark"
    : "betera-btn-primary !px-2.5 !py-1";
  const mutedClass = onDark ? "max-w-[10rem] truncate text-betera-cream/75" : "max-w-[10rem] truncate text-betera-ink/60";
  const adminClass = onDark
    ? "rounded-full px-2.5 py-1 text-betera-lime hover:bg-white/10"
    : "rounded-lg px-2 py-1 text-betera-forest-light hover:bg-betera-mist";
  const logoutClass = onDark
    ? "rounded-lg px-2 py-1 text-betera-cream/80 hover:bg-white/10"
    : "rounded-lg px-2 py-1 text-betera-ink/70 hover:bg-betera-mist";

  if (!session?.user) {
    return (
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link href="/cuenta/iniciar-sesion" className={loginClass}>
          {t("auth.login")}
        </Link>
        <Link href="/cuenta/registro" className={registerClass}>
          {t("auth.register")}
        </Link>
      </div>
    );
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className={mutedClass} title={session.user.email || ""}>
        {session.user.name || session.user.email}
      </span>
      {isAdmin ? (
        <Link href="/admin" className={adminClass}>
          Admin
        </Link>
      ) : null}
      <form action="/api/auth/signout" method="POST">
        <button type="submit" className={logoutClass}>
          {t("auth.logout")}
        </button>
      </form>
    </div>
  );
}
