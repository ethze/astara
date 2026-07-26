import dynamic from 'next/dynamic';
import styles from './page.module.css';
import DynamicSection4 from '@/components/DynamicSection4/DynamicSection4';

const HeroSection = dynamic(() => import('@/components/HeroSection/HeroSection'));
const Section2 = dynamic(() => import('@/components/Section2/Section2'));
const Section3 = dynamic(() => import('@/components/Section3/Section3'));
const Section5 = dynamic(() => import('@/components/Section5/Section5'));
const GallerySection = dynamic(() => import('@/components/GallerySection/GallerySection'));

export default function Home() {
  return (
    <main className={styles.sections}>
      <HeroSection />
      <Section2 />
      <Section3 />
      <DynamicSection4 />
      <Section5 />
      <GallerySection />
    </main>
  );
}
