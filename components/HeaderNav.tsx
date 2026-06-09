"use client";

import { useState } from "react";
import Link from "next/link";
import { NavItemIcon } from "@/components/NavItemIcon";
import type { NavIconId } from "@/lib/constants";

export type HeaderNavItem = {
  href: string;
  label: string;
  icon: NavIconId;
  active: boolean;
};

type HeaderNavProps = {
  items: HeaderNavItem[];
  navLabel: string;
  openLabel: string;
  closeLabel: string;
};

export function HeaderNav({ items, navLabel, openLabel, closeLabel }: HeaderNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="border-t border-betera-sand/70 bg-gradient-to-b from-white to-betera-mist/50 md:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="container-page flex w-full items-center justify-between gap-2 py-2.5 text-sm font-semibold text-betera-forest"
          aria-expanded={open}
          aria-controls="mobile-main-nav"
          aria-label={open ? closeLabel : openLabel}
        >
          <span>{navLabel}</span>
          <svg
            className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open ? (
          <nav
            id="mobile-main-nav"
            className="container-page border-t border-betera-sand/60 pb-2.5 pt-1.5"
            aria-label={navLabel}
          >
            <ul className="flex flex-col gap-0.5">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      item.active
                        ? "betera-nav-link-active"
                        : "text-betera-ink/80 hover:bg-betera-mist hover:text-betera-forest"
                    }`}
                    aria-current={item.active ? "page" : undefined}
                  >
                    <NavItemIcon id={item.icon} className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>

      <div className="hidden border-t border-betera-sand/70 bg-gradient-to-b from-white to-betera-mist/50 md:block">
        <nav className="container-page !py-0" aria-label={navLabel}>
          <ul className="flex flex-wrap items-center gap-1.5 py-2 md:py-2.5">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`betera-nav-link group ${item.active ? "betera-nav-link-active" : ""}`}
                  aria-current={item.active ? "page" : undefined}
                >
                  <span className="shrink-0">
                    <NavItemIcon id={item.icon} className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
