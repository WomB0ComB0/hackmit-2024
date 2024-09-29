import { NextResponse } from 'next/server';
import superjjson from 'superjson';

export async function GET() {
  return NextResponse.json({ hello: 'world' });
}

