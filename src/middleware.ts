import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    // Define known public and protected routes
    const publicRoutes = ["/auth/login", "/auth/recover"];
    const protectedRoutes = ["/account", "/alerts", "/devices", "/guide", "/patients"];

    // Check if the route is a known public or protected route
    const isPublicRoute = publicRoutes.includes(pathname);
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Redirect logged-in users trying to access public routes to /alerts
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL("/alerts", request.url));
    }

    // Redirect users without a token trying to access protected routes to /auth/login
    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Handle default route redirect based on authentication status
    if (pathname === "/") {
        return NextResponse.redirect(new URL(token ? "/alerts" : "/auth/login", request.url));
    }

    // Handle undefined routes:
    // - If the route is neither public nor protected, redirect based on auth status
    if (!isPublicRoute && !isProtectedRoute) {
        return NextResponse.redirect(new URL(token ? "/alerts" : "/auth/login", request.url));
    }

    // Allow the request if none of the above conditions are met
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|favicon.ico|icons|images).*)",
        "/",               // Root route
        "/account/:path*", // Matches all routes under /account
        "/alerts/:path*",  // Matches all routes under /alerts
        "/auth/:path*",    // Matches all routes under /auth
        "/devices/:path*", // Matches all routes under /devices
        "/guide/:path*",   // Matches all routes under /guide
        "/patients/:path*", // Matches all routes under /patients
    ],
};
