import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);
  const res = NextResponse.next({ request: { headers: requestHeaders } });

  return res;
}

export const config = {
  matcher: ["/((?!api|favicon|_next/static|_next/image).*)"],
};
