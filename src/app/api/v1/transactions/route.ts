import { NextRequest, NextResponse } from 'next/server';
import superjson from 'superjson';
import { schema } from '@/app/api/v1/transactions/schema';
import { API } from '@/app/api/v1/config';
import { auth } from "@clerk/nextjs/server";

const CACHE_DURATION = 24 * 60 * 60 * 1000;
let cache: { data: any; timestamp: number } | null = null;

export const GET = async (_req: NextRequest) => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json(superjson.stringify(cache.data), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
      });
    }

    const response = await fetch(`${API}/transactions`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch transactions');
    }

    cache = { data, timestamp: Date.now() };

    return NextResponse.json(superjson.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
      statusText: 'OK',
    });
  } catch (error) {
    console.error(`Error in /transactions in GET method: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Failed to fetch transactions data' }, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const validatedData = schema.parse(body);

    const response = await fetch(`${API}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create transaction');
    }

    cache = null;

    return NextResponse.json(superjson.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
      statusText: 'Created',
    });
  } catch (error) {
    console.error(`Error in /transactions in POST method: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Failed to create transaction' }, {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const HEAD = async (_req: NextRequest) => {
  try {
    return NextResponse.json({}, {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error(`Error in /transactions in HEAD method: ${(error as Error).message}`);
    return NextResponse.json({}, {
      status: 500,
    });
  }
};

export const OPTIONS = async (_req: NextRequest) => {
  return NextResponse.json({}, {
    headers: {
      'Allow': 'GET, POST, HEAD, OPTIONS',
      'Content-Type': 'application/json',
    },
    status: 200,
  });
};
