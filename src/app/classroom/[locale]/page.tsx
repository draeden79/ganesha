import { notFound } from "next/navigation";
import { CourseApp } from "@/components/course-app";
import { isLocale, locales, localeNames } from "@/lib/course-schema";
import { loadClassroomCourse } from "@/lib/course-loader";
import { statusUi } from "@/lib/status-i18n";

export default async function ClassroomPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  let course;
  try { course = loadClassroomCourse(locale); } catch {
    const t = statusUi[locale];
    return <main className="access-page"><p className="eyebrow">Ganesha</p><h1>{t.unavailable}</h1><p>{t.translationPending}</p><a className="button primary" href={`/classroom/${locale}`}>{t.retry}</a><nav className="locale-links">{locales.map(value => <a href={`/classroom/${value}`} key={value} lang={value}>{localeNames[value]}</a>)}</nav></main>;
  }
  return <CourseApp course={course} routeBase="/classroom" />;
}
