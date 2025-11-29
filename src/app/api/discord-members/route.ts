import { NextResponse } from 'next/server';

// Cache por 24 horas (86400 segundos)
export const revalidate = 86400;

export async function GET() {
  try {
    const response = await fetch(
      'https://discord.com/api/invites/indies?with_counts=true',
      {
        next: { revalidate: 86400 }, // 24 horas
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Discord invite data');
    }

    const data = await response.json();
    const memberCount = data.approximate_member_count || 0;

    return NextResponse.json(
      { memberCount },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=86400, stale-while-revalidate=43200',
        },
      },
    );
  } catch (error) {
    console.error('Error fetching Discord members:', error);
    // Retornar un valor por defecto en caso de error
    return NextResponse.json(
      { memberCount: 1000 },
      {
        status: 500,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
        },
      },
    );
  }
}
