import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/cornerman(.*)']);

// ADD 'async' HERE vvv
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // ADD 'await' HERE vvv
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
