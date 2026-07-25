'use client';

import dynamic from 'next/dynamic';

const Section4 = dynamic(() => import('@/components/Section4/Section4'), { ssr: false });

export default function DynamicSection4() {
  return <Section4 />;
}
