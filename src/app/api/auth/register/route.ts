import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma'; // Importing our reusable Prisma client

export async function POST(request: Request) {
  try {
    // 1. Extract the data sent from the frontend (or Postman)
    const body = await request.json();
    const { name, email, password } = body;

    // 2. Basic Validation: Make sure all fields are provided
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 3. Check if a user with this email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // 4. Hash the password before saving it (NEVER save plain text passwords!)
    // The "10" is the salt rounds, which determines how secure the hash is.
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Save the new user to the database
    // Notice we don't pass the 'role' here; Prisma uses the default 'USER' role we set in schema.prisma
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 6. Return a success response, but do NOT send the password back!
    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}