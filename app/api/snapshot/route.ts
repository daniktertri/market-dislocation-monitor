import { NextResponse } from 'next/server';
import { getCachedSnapshot } from '@/lib/cache';

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * API route to retrieve the latest cached snapshot
 * Frontend polls this endpoint every 15 seconds
 */
export async function GET() {
  try {
    const snapshot = await getCachedSnapshot();

    if (!snapshot) {
      return NextResponse.json(
        { error: 'No snapshot available' },
        { status: 404 }
      );
    }

    return NextResponse.json(snapshot);
  } catch (error) {
    console.error('Error fetching snapshot:', error);
    return NextResponse.json(
      { error: 'Failed to fetch snapshot' },
      { status: 500 }
    );
  }
}

