import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // @ts-ignore
    const role = req.nextauth.token?.role;

    if (req.nextUrl.pathname.startsWith("/attendance")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Must be logged in
    },
  }
);

export const config = {
  matcher: ["/attendance", "/attendance/:path*"],
};
