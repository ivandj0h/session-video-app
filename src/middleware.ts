import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define all routes as protected, with exceptions for sign-in/sign-up
const protectedRoutes = createRouteMatcher([
  "/((?!sign-in|sign-up).*)", // Protect all except /sign-in and /sign-up
]);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req)) {
    const authResult = await auth();
    if (!authResult.userId) {
      // Redirect to sign-in if not authenticated
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
