import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, emailU, message } = await req.json();

    if (!name || !emailU || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const result = await prisma.evaluation.create({
      data: {
        name,
        emailU,
        message,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error saving contact form data' }, { status: 500 });
  }
}

export function methodNotAllowed() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export function handler(req: NextRequest) {
  if (req.method === 'POST') {
    return POST(req);
  }
  return methodNotAllowed();
}
