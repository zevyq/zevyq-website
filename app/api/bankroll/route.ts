import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json(
      { detail: "user_id fehlt." },
      { status: 400 }
    );
  }

  const authorization = request.headers.get("authorization");

  if (!authorization || !/^Bearer\s+\S+$/i.test(authorization)) {
    return NextResponse.json(
      { detail: "Authentifizierung erforderlich." },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/users/${encodeURIComponent(userId)}/bankroll`,
      {
        headers: {
          Authorization: authorization,
        },
        cache: "no-store",
      }
    );

    const text = await response.text();

    let data: unknown;

    try {
      data = JSON.parse(text);
    } catch {
      data = {
        detail: text || "Ungültige Antwort vom ZEVYQ Backend.",
      };
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Bankroll proxy error:", error);

    return NextResponse.json(
      {
        detail:
          "Das ZEVYQ Backend ist vom Next.js Server aus nicht erreichbar.",
      },
      { status: 502 }
    );
  }
}