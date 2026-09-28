import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale } from "@/lib/course-schema";
export default async function Home() {
  const locale = (await cookies()).get("ganesha-locale")?.value ?? "pt-BR";
  redirect(`/course/${isLocale(locale) ? locale : "pt-BR"}`);
}
