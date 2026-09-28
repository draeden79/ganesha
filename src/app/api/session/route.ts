import { authorizeCourse } from "@/lib/access";
export async function GET() {
  const access = await authorizeCourse();
  return Response.json({ mode: "demo", access: access.status, persistence: "browser-only" }, { headers: { "Cache-Control": "no-store" } });
}
