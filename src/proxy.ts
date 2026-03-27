import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; 

// Notice the function is now named "proxy" instead of "middleware"
export async function proxy(request: NextRequest) {
  // 1. Get the token from the cookies
  const token = request.cookies.get('token')?.value;

  // 2. Identify the path the user is trying to visit
  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith('/admin');
  const isUserRoute = path.startsWith('/user');

  // If the route isn't protected, let them pass immediately
  if (!isAdminRoute && !isUserRoute) {
    return NextResponse.next();
  }

  // 3. If they are trying to access a protected route but have no token, kick them to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // 4. Verify the token using the secret from your .env
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'my_super_secret_jwt_key_for_learning_rbac_2026'
    );
    
    // Decode the token to look at the payload (where we stored the role!)
    const { payload } = await jwtVerify(token, secret);

    // 5. Enforce Role-Based Access Control (RBAC)
    if (isAdminRoute && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/user/dashboard', request.url));
    }

    return NextResponse.next();
    
  } catch (error) {
    console.error('Invalid token in proxy:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/admin/:path*', 
    '/user/:path*'
  ],
};