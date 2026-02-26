import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/cart", "/profile","/wishlist","/allorders"];
const authRoutes = ["/login", "/register", "/forgetpassword", "/resetpassword", "/verifycode"];

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

    const { pathname } = request.nextUrl;

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    const isAuthRoute = authRoutes.some((route) =>
        pathname === route || pathname.startsWith(`${route}/`)
    );


    if (!token && isProtectedRoute) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname); 
        return NextResponse.redirect(loginUrl);
    }

    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/cart/:path*",
        "/profile/:path*",
        "/wishlist/:path*",
        "/allorders/:path*",
        "/login",
        "/register",
        "/forgetpassword",
        "/verifycode",
        "/resetpassword",
    ],
};


