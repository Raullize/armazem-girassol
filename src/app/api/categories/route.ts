import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/data';

const FAKE_DELAY_MS = 1000;

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, FAKE_DELAY_MS));

  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(
      { error: 'Falha ao buscar categorias.' },
      { status: 500 }
    );
  }
}
