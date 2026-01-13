import { NextRequest, NextResponse } from 'next/server';
import { NextServer } from '@/lib/api/api';
import { isAxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const apiRes = await NextServer.post('/auth/logout');

    const response = new NextResponse(null, { status: 204 });

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    response.cookies.delete('token');

    return response;
  } catch (error: unknown) {
    console.error('Logout error:', error);

    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || error.message },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Помилка виходу',
      },
      { status: 500 }
    );
  }
}