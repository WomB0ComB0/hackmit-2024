import { NextResponse, NextRequest } from 'next/server';
import superjson from 'superjson';
import { schema } from '@/app/api/v1/transactions/schema';
import { API } from '@/app/api/v1/config';

if (!(typeof API === 'string')) {
  throw new Error('API is not defined.');
}

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');

  try {
    const transaction = await fetch(`${API}/transactions/${id}`);
    const data = await transaction.json();

    if (!data) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json(superjson.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error(`Error in /transactions/[id] in GET method: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Failed to fetch transaction data' }, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const PUT = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');
  const body = await req.json();

  try {
    schema.parse(body);

    const updatedTransaction = await fetch(`${API}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!updatedTransaction.ok) {
      return NextResponse.json({ error: 'Failed to update transaction' }, { status: updatedTransaction.status });
    }

    const data = await updatedTransaction.json();
    return NextResponse.json(superjson.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
      statusText: 'OK',
    });
  } catch (error) {
    console.error(`Error in /transactions/[id] in PUT method: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Failed to update transaction data' }, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');

  try {
    const deletedTransaction = await fetch(`${API}/transactions/${id}`, {
      method: 'DELETE',
    });

    if (!deletedTransaction.ok) {
      return NextResponse.json({ error: 'Failed to delete transaction' }, { status: deletedTransaction.status });
    }

    return NextResponse.json({ message: 'Transaction deleted successfully' }, {
      headers: { 'Content-Type': 'application/json' },
      status: 204,
    });
  } catch (error) {
    console.error(`Error in /transactions/[id] in DELETE method: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Failed to delete transaction' }, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const HEAD = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');

  try {
    const transaction = await fetch(`${API}/transactions/${id}`);

    if (!transaction.ok) {
      return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json({}, {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error(`Error in /transactions/[id] in HEAD method: ${(error as Error).message}`);
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
