'use client';

import dynamic from 'next/dynamic';
import styles from './page.module.css';

const HeroSection = dynamic(() => import('@/components/HeroSection/HeroSection'));
const ServicesOverview = dynamic(() => import('@/components/ServicesOverview/ServicesOverview'));
const ProductViewer3D = dynamic(() => import('@/components/ProductViewer3D/ProductViewer3D'));
const InteractiveChair = dynamic(() => import('@/components/InteractiveChair/InteractiveChair'), { ssr: false });
const ProductsListing = dynamic(() => import('@/components/ProductsListing/ProductsListing'));
const GallerySection = dynamic(() => import('@/components/GallerySection/GallerySection'));

export default function Home() {
  return (
    <main className={styles.sections}>
      <HeroSection />
      <ServicesOverview />
      <ProductViewer3D />
      <InteractiveChair />
      <ProductsListing />
      <GallerySection />
    </main>
  );
}
