import Link from "next/link";
import { headers } from "next/headers";
import { isLocale } from "@/lib/course-schema";
import { statusUi } from "@/lib/status-i18n";
import { ui } from "@/lib/i18n";
export default async function NotFound() {
  const requested = (await headers()).get("x-ganesha-locale") ?? "pt-BR";
  const locale = isLocale(requested) ? requested : "pt-BR";
  const routeBase = (await headers()).get("x-ganesha-route-base") === "/classroom" ? "/classroom" : "/course";
  return <main className="access-page"><p>Ganesha · 404</p><h1>{statusUi[locale].notFound}</h1><Link className="button primary" href={`${routeBase}/${locale}`}>{ui[locale].overview}</Link></main>;
}
