import { NextResponse } from "next/server"

// Auth protection is handled server-side in each layout via @clerk/nextjs/server auth()
// This middleware is intentionally minimal to avoid Edge runtime incompatibilities
export function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
