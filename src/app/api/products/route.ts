import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';

const FAKE_DELAY_MS = 1500;

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, FAKE_DELAY_MS));

  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: 'Falha ao buscar produtos.' },
      { status: 500 }
    );
  }
}
