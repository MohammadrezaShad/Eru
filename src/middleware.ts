import { HeadersName } from '@/constants';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname =
    req.headers.get('x-original-url') || new URL(req.url).pathname;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(HeadersName.Pathname, pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
