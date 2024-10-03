import { NextRequest, NextResponse } from 'next/server';
import superjson from 'superjson';
import { schema } from '@/app/api/v1/user/schema';
import { API } from '@/app/api/v1/config';

const CACHE_DURATION = 24 * 60 * 60 * 1000;
let cache: { data: any; timestamp: number } | null = null;

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');

  try {
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json(superjson.stringify(cache.data), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
      });
    }

    const response = await fetch(`${API}/users/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'User not found');
    }

    cache = { data, timestamp: Date.now() };

    return NextResponse.json(superjson.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
      statusText: 'OK',
    });
  } catch (error) {
    console.error(`Error in /user/[id] in GET method: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Failed to fetch user data' }, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const PUT = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');
  const body = await req.json();

  try {
    const validatedData = schema.parse(body);

    const response = await fetch(`${API}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update user');
    }

    cache = null;

    return NextResponse.json(superjson.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
      statusText: 'OK',
    });
  } catch (error) {
    console.error(`Error in /user/[id] in PUT method: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Failed to update user data' }, {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');

  try {
    const response = await fetch(`${API}/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to delete user');
    }

    cache = null;

    return NextResponse.json({ message: 'User deleted successfully' }, {
      headers: { 'Content-Type': 'application/json' },
      status: 204,
    });
  } catch (error) {
    console.error(`Error in /user/[id] in DELETE method: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Failed to delete user' }, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const HEAD = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');

  try {
    const response = await fetch(`${API}/users/${id}`);

    if (!response.ok) {
      return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json({}, {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error(`Error in /user/[id] in HEAD method: ${(error as Error).message}`);
    return NextResponse.json({}, {
      status: 500,
    });
  }
};

export const OPTIONS = async (_req: NextRequest) => {
  return NextResponse.json({}, {
    headers: {
      'Allow': 'GET, PUT, DELETE, HEAD, OPTIONS',
      'Content-Type': 'application/json',
    },
    status: 200,
  });
};
