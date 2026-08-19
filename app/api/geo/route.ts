import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET() {
  const headersList = await headers();
  const city = headersList.get('x-vercel-ip-city') || 'Unknown';
  
  return NextResponse.json({ city: decodeURIComponent(city) });
}
