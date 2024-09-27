import { create, getById } from '@/prisma/User';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) return new Response('ID NOT FOUND', { status: 400 });

  const user = await getById(id);

  return Response.json({ data: user });
}

export async function POST(request: Request) {
  const res = await request.json();

  try {
    await create(res);

    return new Response('Success!', {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
    });
  }
}
