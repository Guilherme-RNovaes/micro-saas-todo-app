import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/get-url";
import { getToken } from "next-auth/jwt";

export default function middleware(request: NextRequest, req: any) {
  const token = getToken({ req })
  const pathname = request.nextUrl.pathname

  console.log({
    token: token,
    pathname,
    cookies: request.cookies,
  })


  if (pathname.includes('/app') && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth')))
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}
