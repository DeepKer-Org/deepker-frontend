import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const roles = request.cookies.get("roles") ? JSON.parse(request.cookies.get("roles")!.value) : [];
    const { pathname } = request.nextUrl;

    // Define exact public and protected routes
    const publicRoutes = ["/auth/login", "/auth/recover"];
    const doctorRoutes = [
        "/account",
        "/alerts",
        "/alerts/recent/:id",
        "/alerts/past/:id",
        "/devices",
        "/guide",
        "/patients",
        "/patients/:id",
    ];
    const adminRoutes = ["/admin/panel", "/admin/panel/register", "/admin/panel/edit/:id"];

    // Check if the route is a known public or protected route
    const isPublicRoute = publicRoutes.includes(pathname);
    const isDoctorRoute = doctorRoutes.some(route =>
        new RegExp(`^${route.replace(":id", "[^/]+")}$`).test(pathname)
    );
    const isAdminRoute = adminRoutes.some(route =>
        new RegExp(`^${route.replace(":id", "[^/]+")}$`).test(pathname)
    );

    // Redirect logged-in users trying to access public routes to /alerts
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL("/alerts", request.url));
    }

    // Redirect users without a token trying to access protected routes to /auth/login
    if (!token && (isDoctorRoute || isAdminRoute)) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Allow access based on user roles
    const hasDoctorRole = roles.includes("doctor");
    const hasAdminRole = roles.includes("admin");

    // Allow doctors to access doctor routes
    if (isDoctorRoute && hasDoctorRole) {
        return NextResponse.next();
    }

    // Allow admins to access admin routes
    if (isAdminRoute && hasAdminRole) {
        return NextResponse.next();
    }

    // Allow users with both roles to access both doctor and admin routes
    if ((isDoctorRoute || isAdminRoute) && hasDoctorRole && hasAdminRole) {
        return NextResponse.next();
    }

    // Restrict non-admins from accessing admin-protected routes
    if (isAdminRoute && !hasAdminRole) {
        return NextResponse.redirect(new URL("/alerts", request.url));
    }

    // Handle default route redirect based on authentication status
    if (pathname === "/") {
        return NextResponse.redirect(new URL(token ? "/alerts" : "/auth/login", request.url));
    }

    // Redirect undefined routes based on auth status
    if (!isPublicRoute && !isDoctorRoute && !isAdminRoute) {
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
        "/admin/panel",    // Matches admin route
        "/admin/panel/register", // Matches admin route
    ],
};