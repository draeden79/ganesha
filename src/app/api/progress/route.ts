import { authorizeCourse } from "@/lib/access";
async function protectedProgress() {
  const access = await authorizeCourse();
  if (access.status !== "authorized") return Response.json({ error: access.status }, { status: access.status === "forbidden" ? 403 : access.status === "unconfigured" ? 503 : 401, headers: { "Cache-Control": "no-store" } });
  return Response.json({ error: "persistence_unconfigured" }, { status: 503, headers: { "Cache-Control": "no-store" } });
}
export const GET = protectedProgress;
export const POST = protectedProgress;
