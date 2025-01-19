import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
  const secret = process.env.NEXTAUTH_SECRET;

  const token = await getToken({ req, secret });

  const loginPath = "/";

  // If the user is already logged in, don't redirect them to the login page
  if (req.nextUrl.pathname === loginPath && token) {
    const homeUrl = new URL("/profile", req.url); // Redirect to the homepage or dashboard
    return NextResponse.redirect(homeUrl);
  }

  // List of paths to protect
  const protectedPaths = ["/profile"];

  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed if authenticated or not a protected route
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/"], // Define specific routes to apply the middleware
};
