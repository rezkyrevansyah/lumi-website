import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { sessionOptions, type SessionData } from "./lib/session";

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(request, response, sessionOptions);
    if (!session.isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return response;
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
