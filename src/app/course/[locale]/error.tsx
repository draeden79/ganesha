"use client";
import { useParams } from "next/navigation";
import { isLocale } from "@/lib/course-schema";
import { statusUi } from "@/lib/status-i18n";
export default function CourseError({ retry }: { retry: () => void }) {
  const params = useParams();
  const requested = String(params.locale ?? "pt-BR");
  const locale = isLocale(requested) ? requested : "pt-BR";
  return <main className="access-page"><p className="eyebrow">Ganesha</p><h1>{statusUi[locale].unavailable}</h1><button className="button primary" onClick={retry}>{statusUi[locale].retry}</button></main>;
}
