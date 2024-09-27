import { create, getById } from '@/prisma/Session';
import { type NextRequest } from 'next/server';

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
