import { NextResponse, NextRequest } from 'next/server';
import superjson from 'superjson';
import { z } from 'zod';
import { schema, Schema } from '@/app/api/v1/'

export const GET = async (req: NextRequest) => {
  return NextResponse.json({ hello: 'world' });
}

export const POST = async (req: NextRequest) => {
  return NextResponse.json({ hello: 'world' });
}

export const PUT = async (req: NextRequest) => {
  return NextResponse.json({ hello: 'world' });
}

export const DELETE = async (req: NextRequest) => {
  return NextResponse.json({ hello: 'world' });
}

expoort 