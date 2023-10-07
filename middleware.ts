import { headers } from 'next/headers'
import * as jose from "jose";
import { NextResponse } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request:Request) {
  // return NextResponse.redirect(new URL('/search', request.url))
  const bearerToken = headers().get('authorization') as string;

  if (!bearerToken) {
    return Response.json(
      { errorMessage: "Unauthorized request" },
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return Response.json(
      { errorMessage: "Unauthorized request" },
      { status: 401 }
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return Response.json(
      { errorMessage: "Unauthorized request" },
      { status: 401 }
    );
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/auth/me'],
}