import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale } from "@/lib/course-schema";

export default async function ClassroomEntry() {
  const preference = (await cookies()).get("ganesha-locale")?.value ?? "en";
  redirect(`/classroom/${isLocale(preference) ? preference : "en"}`);
}
