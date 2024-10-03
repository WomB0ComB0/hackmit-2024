import { NextResponse, NextRequest } from 'next/server';
import superjson from 'superjson';
import { schema, Schema } from '@/app/api/v1/'
import { API } from '../../config'

if (!(typeof API === 'string')) {
  throw new Error('API is not defined.')
}

export const GET = async (req: NextRequest) => {
  return NextResponse.json(superjson.stringify({ hello: 'world' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
    statusText: 'OK',
  });
}

export const PUT = async (req: NextRequest) => {
  return NextResponse.json(superjson.stringify({ hello: 'world' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
    statusText: 'OK',
  });
}

export const DELETE = async (req: NextRequest) => {
  return NextResponse.json(superjson.stringify({ hello: 'world' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
    statusText: 'OK',
  });
}

export const HEAD = async (req: NextRequest) => {
  return NextResponse.json(superjson.stringify({ hello: 'world' }), {
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