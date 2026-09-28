import Link from "next/link";
import { authorizeCourse } from "@/lib/access";
import { isLocale } from "@/lib/course-schema";
import { ui } from "@/lib/i18n";
import { notFound } from "next/navigation";
export default async function Learn({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const access = await authorizeCourse();
  const t = ui[locale];
  return <main className="access-page"><p className="eyebrow">Ganesha</p><h1>{t.accessTitle}</h1><p>{access.status === "authorized" ? t.remotePending : t.accessBody}</p><Link className="button primary" href={`/course/${locale}`}>{t.openDemo}</Link></main>;
}
