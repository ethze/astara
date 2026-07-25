import products from '@/data/products';
import ProductDetail from '@/components/ProductDetail/ProductDetail';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.title} — PT Andalan Satu Nusantara`,
    description: product.desc,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return <div style={{ padding: 40 }}>Product not found</div>;
  return <ProductDetail product={product} />;
}
