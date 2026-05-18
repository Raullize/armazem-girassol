import { NextResponse } from 'next/server';
import { getFeaturedCollections } from '@/lib/data';

const FAKE_DELAY_MS = 1500;

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, FAKE_DELAY_MS));

  try {
    const collections = await getFeaturedCollections();
    return NextResponse.json(collections);
  } catch {
    return NextResponse.json(
      { error: 'Falha ao buscar coleções em destaque.' },
      { status: 500 }
    );
  }
}
