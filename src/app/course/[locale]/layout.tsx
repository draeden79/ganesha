import { isLocale } from "@/lib/course-schema";
import { notFound } from "next/navigation";
export default async function CourseLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return children;
}
