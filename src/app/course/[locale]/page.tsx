import { notFound } from "next/navigation";
import { CourseApp } from "@/components/course-app";
import { isLocale } from "@/lib/course-schema";
import { loadCourse } from "@/lib/course-loader";
import { statusUi } from "@/lib/status-i18n";
import { localeNames, locales } from "@/lib/course-schema";
export default async function CoursePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  let course;
  try { course = loadCourse(locale); } catch {
    const t = statusUi[locale];
    return <main className="access-page"><p className="eyebrow">Ganesha</p><h1>{t.unavailable}</h1><p>{t.translationPending}</p><a className="button primary" href={`/course/${locale}`}>{t.retry}</a><nav className="locale-links">{locales.map(value => <a href={`/course/${value}`} key={value} lang={value}>{localeNames[value]}</a>)}</nav></main>;
  }
  return <CourseApp course={course} />;
}
