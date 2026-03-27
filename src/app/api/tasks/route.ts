import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// 1. Helper function to read the secure cookie and get the user's ID and Role
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

// 2. GET: Fetch tasks (Admins see all, Users see only their own)
export async function GET() {
  const user = await getUserFromToken();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    let tasks;

    // RBAC Logic: If Admin, fetch everything and include the user's name
    if (user.role === 'ADMIN') {
      tasks = await prisma.task.findMany({
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, email: true } } }, 
      });
    } else {
      // If regular USER, only fetch tasks that match their specific userId
      tasks = await prisma.task.findMany({
        where: { userId: user.userId },
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Fetch tasks error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// 3. POST: Create a new task
export async function POST(request: Request) {
  const user = await getUserFromToken();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json({ message: 'Task title is required' }, { status: 400 });
    }

    // Save the task to Neon and link it to the userId hidden inside the token
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        userId: user.userId, 
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}