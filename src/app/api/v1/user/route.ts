import { NextRequest, NextResponse } from 'next/server';
import superjson from 'superjson';
import { schema, type Schema } from '@/app/api/v1/'

const API = process.env.NEXT_PUBLIC_API_URL;

if (typeof API === undefined) {
  throw new Error('API is not defined.')
}

export const GET = async (req: NextRequest) => {
  return NextResponse.json(superjson.stringify({ hello: 'world' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
    statusText: 'OK',
  });
}

export const POST = async (req: NextRequest) => {
  return NextResponse.json(superjson.stringify({ hello: 'world' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
    statusText: 'OK',
  });
}

export const HEAD = async (req: NextRequest) => {
  return NextResponsson(superjson.stringify({ hello: 'world' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
    statusText: 'OK',
  });
}

export const OPTIONS = async (req: NextRequest) => {
  return NextResponse.json(superjson.stringify({ hello: 'world' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
    statusText: 'OK',
  });
}