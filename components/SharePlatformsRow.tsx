"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  url: string;
  title: string;
  isVal: boolean;
  className?: string;
};

/** País-style: título, doble salto, URL */
function buildWhatsappText(title: string, url: string) {
  return `${title.trim()}\r\n\r\n${url}`;
}

const btnClass =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

function IconWhatsapp({ className = "h-[22px] w-[22px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#25D366"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      />
    </svg>
  );
}

function IconFacebook({ className = "h-[22px] w-[22px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#1877F2"
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 5.996 4.388 10.976 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.049 24 18.069 24 12.073z"
      />
    </svg>
  );
}

function IconX({ className = "h-[19px] w-[19px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

function IconBluesky({ className = "h-[22px] w-[22px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#0085FF"
        d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.686 6.383 3.369.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.22-4.075 1.166-6.498-2.74-7.078a8.741 8.741 0 01-.415-.056c.14.017.279.036.415.056 2.67.317 5.568-.633 6.383-3.369.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.299-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"
      />
    </svg>
  );
}

function IconLinkedIn({ className = "h-[20px] w-[20px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function IconLink({ className = "h-[20px] w-[20px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" />
    </svg>
  );
}

export function SharePlatformsRow({ url, title, isVal, className = "" }: Readonly<Props>) {
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  const labels = useMemo(
    () => ({
      nav: isVal ? "Compartir a xarxes socials" : "Compartir en redes sociales",
      wa: isVal ? "Comparteix al WhatsApp" : "Compartir en WhatsApp",
      fb: isVal ? "Comparteix a Facebook" : "Compartir en Facebook",
      x: isVal ? "Comparteix a X" : "Compartir en X",
      bsky: isVal ? "Comparteix a Bluesky" : "Compartir en Bluesky",
      li: isVal ? "Comparteix a LinkedIn" : "Compartir en LinkedIn",
      copy: isVal ? "Copiar enllaç" : "Copiar enlace",
      copiedUrl: isVal ? "Enllaç copiat al porta-retalls." : "Enlace copiado al portapapeles.",
      copyFail: isVal ? "No s'ha pogut copiar." : "No se pudo copiar.",
    }),
    [isVal],
  );

  useEffect(() => {
    if (!copiedNotice) return;
    const id = globalThis.setTimeout(() => setCopiedNotice(null), 4000);
    return () => globalThis.clearTimeout(id);
  }, [copiedNotice]);

  const waHref = `https://wa.me/?text=${encodeURIComponent(buildWhatsappText(title, url))}`;
  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const xHref = `https://twitter.com/intent/tweet?${new URLSearchParams({
    text: title.trim(),
    url,
    lang: isVal ? "ca" : "es",
  }).toString()}`;
  const bskyHref = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title.trim()}\n\n${url}`)}`;
  const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const copyUrlOnly = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setCopiedNotice(labels.copiedUrl);
        return;
      }
    } catch {
      // fall through
    }
    setCopiedNotice(labels.copyFail);
  }, [url, labels]);

  return (
    <div className={className}>
      <nav className="flex flex-wrap items-center gap-2" aria-label={labels.nav}>
        <a href={waHref} className={btnClass} target="_blank" rel="noreferrer noopener" aria-label={labels.wa} data-share="whatsapp">
          <IconWhatsapp />
        </a>
        <a href={fbHref} className={btnClass} target="_blank" rel="noreferrer noopener" aria-label={labels.fb} data-share="facebook">
          <IconFacebook />
        </a>
        <a href={xHref} className={btnClass} target="_blank" rel="noreferrer noopener" aria-label={labels.x} data-share="twitter">
          <IconX />
        </a>
        <a href={bskyHref} className={btnClass} target="_blank" rel="noreferrer noopener" aria-label={labels.bsky} data-share="bluesky">
          <IconBluesky />
        </a>
        <a href={liHref} className={btnClass} target="_blank" rel="noreferrer noopener" aria-label={labels.li} data-share="linkedin">
          <IconLinkedIn />
        </a>
        <button type="button" className={btnClass} aria-label={labels.copy} onClick={() => void copyUrlOnly()} data-share="copy">
          <IconLink />
        </button>
      </nav>

      {copiedNotice ? (
        <output className="mt-2 block text-xs text-slate-600" aria-live="polite">
          {copiedNotice}
        </output>
      ) : null}
    </div>
  );
}
