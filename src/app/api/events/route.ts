import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  try {
    const secret = process.env.JWT_SECRET || 'my_super_secret_jwt_key_for_learning_rbac_2026';
    return jwt.verify(token, secret) as { userId: string; role: string };
  } catch (error) {
    return null;
  }
}

// GET: Anyone logged in can see the calendar
export async function GET() {
  const user = await getUserFromToken();
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    // Fetch all events, sorted by date (newest/upcoming first)
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
    });
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// POST: ONLY Admins can add to the calendar
export async function POST(request: Request) {
  const user = await getUserFromToken();
  
  // RBAC Check: Kick them out if they are not an ADMIN!
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden: Admins only' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, date, type } = body;

    if (!title || !date || !type) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const newEvent = await prisma.event.create({
      data: {
        title,
        date: new Date(date), // Convert the HTML date string to a Database Date object
        type,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}