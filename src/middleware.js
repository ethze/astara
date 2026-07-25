import { NextResponse } from 'next/server';

const locales = ['en', 'id'];
const defaultLocale = 'en';

function getLocale(request) {
  const cookie = request.cookies.get('NEXT_LOCALE');
  if (cookie && locales.includes(cookie.value)) return cookie.value;

  const accept = request.headers.get('accept-language');
  if (accept) {
    const preferred = accept.split(',').map((l) => l.split(';')[0].trim().slice(0, 2));
    for (const lang of preferred) {
      if (locales.includes(lang)) return lang;
    }
  }

  return defaultLocale;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  const pathLocale = pathname.split('/')[1];
  if (locales.includes(pathLocale)) {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', pathLocale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set('NEXT_LOCALE', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
};
