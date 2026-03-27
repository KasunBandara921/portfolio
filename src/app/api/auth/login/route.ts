import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers'; // Next.js utility to manage cookies

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Validate inputs
    if (!email || !password) {
      return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
    }

    // 2. Find the user in the Neon database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 3. Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 4. Generate the JWT (The "ID Card")
    // We embed the user's ID and Role right inside the token payload
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const token = jwt.sign(
      { userId: user.id, role: user.role }, 
      secret, 
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // 5. Set the JWT inside an HTTP-Only Cookie
    // This is highly secure because frontend JavaScript cannot steal this cookie
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: '/',
    });

    // 6. Return success (without the password!)
    return NextResponse.json(
      {
        message: 'Logged in successfully',
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}