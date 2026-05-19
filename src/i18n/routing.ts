import type { Locale } from "./locales";

export function stripLocale(pathname: string) {
  const parts = pathname.split("/");

  if (parts.length > 1 && (parts[1] === "en" || parts[1] === "fr")) {
    const nextPath = `/${parts.slice(2).join("/")}`;
    return nextPath === "/" ? "/" : nextPath.replace(/\/$/, "");
  }

  return pathname === "" ? "/" : pathname;
}

export function withLocalePath(locale: Locale, pathname: string) {
  const basePath = stripLocale(pathname);
  const normalized = basePath === "/" ? "" : basePath;
  return `/${locale}${normalized}`;
}
