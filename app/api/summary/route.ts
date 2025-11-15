import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { extractCurrencyData } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const [vouches, totalVouches, decorVouches] = await Promise.all([
      prisma.vouch.findMany({
        select: {
          message: true,
        },
      }),
      prisma.vouch.count(),
      // Count vouches containing deco, pfp, or nameplates
      prisma.vouch.count({
        where: {
          OR: [
            { message: { contains: 'deco', mode: 'insensitive' } },
            { message: { contains: 'pfp', mode: 'insensitive' } },
            { message: { contains: 'nameplates', mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    const stats = extractCurrencyData(vouches);

    return NextResponse.json({
      totalVouches,
      ...stats,
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch summary' },
      { status: 500 }
    );
  }
}
