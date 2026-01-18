import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { lehlekaApi } from "../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();

        const body = await request.json();

        const res = await lehlekaApi.post('/tasks', body, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            return NextResponse.json(
                { error: error.message, response: error.response?.data },
                { status: error.status }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const { data } = await lehlekaApi.get('/tasks',
      {
        headers: {
        Cookie: cookieStore.toString(),
      }
      });

    return NextResponse.json(data);
  } catch (err) {
    if (isAxiosError(err)) {
      return NextResponse.json(
        err.response?.data ?? { error: err.message },
        { status: err.response?.status ?? 500 }
      );
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}