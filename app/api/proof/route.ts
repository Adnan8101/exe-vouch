import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const [proofs, total] = await Promise.all([
      prisma.proof.findMany({
        skip,
        take: limit,
        orderBy: {
          timestamp: 'desc',
        },
        select: {
          id: true,
          messageId: true,
          authorId: true,
          authorName: true,
          authorAvatar: true,
          message: true,
          timestamp: true,
          imageUrls: true,
          channelId: true,
        },
      }),
      prisma.proof.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      proofs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching proofs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch proofs' },
      { status: 500 }
    );
  }
}
