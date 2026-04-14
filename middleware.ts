import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Only enforce that the user is logged in — the blueprint page itself
// handles purchase verification via direct Stripe lookup (src/lib/stripe.ts)
const isAuthRequired = createRouteMatcher(['/blueprint(.*)', '/checkout/blueprint']);

export default clerkMiddleware(async (auth, req) => {
  if (isAuthRequired(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next|api/webhooks).*)", "/", "/(api(?!/webhooks)|trpc)(.*)"],
};
