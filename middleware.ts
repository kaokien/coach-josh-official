import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/cornerman(.*)', '/blueprint(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
    
    // Enforce stripe payment metadata check
    const { sessionClaims } = auth();
    const hasAccess = sessionClaims?.publicMetadata?.hasBlueprintAccess;

    if (!hasAccess && req.nextUrl.pathname.startsWith('/blueprint')) {
      return NextResponse.redirect(new URL('/#programs', req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
