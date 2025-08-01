import ProductDetail from '@/components/products/productDetail';
import { getProduct } from '@/lib/products';
import { notFound } from 'next/navigation';


export default async function ProductPage({ params }) {
  const product = await getProduct(params.productSlug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}