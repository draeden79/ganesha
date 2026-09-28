import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "./lib/course-schema";
export function proxy(request: NextRequest) {
  const candidate = request.nextUrl.pathname.split("/")[2] ?? "";
  const headers = new Headers(request.headers);
  headers.set("x-ganesha-locale", isLocale(candidate) ? candidate : "pt-BR");
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/((?!api|_next|images|favicon.ico).*)"] };
