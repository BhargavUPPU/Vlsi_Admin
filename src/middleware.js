import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  console.log("middleware", pathname, token);

  // Redirect authenticated users away from signin or signup pages
  if (
    token &&
    ["/signin", "/signup"].some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to signin page for protected routes
  if (!token && pathname !== "/signin" && pathname !== "/signup") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Allow request to proceed for all other cases
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup"],
};
