import type { Metadata } from "next";
import { headers } from "next/headers";
import { isLocale } from "@/lib/course-schema";
import "./globals.css";
export const metadata: Metadata = { title: "Ganesha", robots: { index: false, follow: false } };
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requested = (await headers()).get("x-ganesha-locale") ?? "pt-BR";
  const locale = isLocale(requested) ? requested : "pt-BR";
  return <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}><body>{children}</body></html>;
}
