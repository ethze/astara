'use client';

import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import Section2 from '@/components/Section2/Section2';
import styles from './services.module.scss';

export default function ServicesPage() {
  const { dict, locale } = useI18n();
  const loc = (path) => `/${locale}${path}`;

  return (
    <main className={styles.page}>
      <div className={styles.topBar}>
        <Link href={loc('/')} className={styles.backBtn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          <span>{dict.common.back}</span>
        </Link>
      </div>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>{dict.services.label}</span>
          <h1 className={styles.title}>
            {dict.services.title1}&nbsp;<span className={styles.highlight}>{dict.services.title2}</span>
          </h1>
          <p className={styles.intro}>
            {dict.services.intro}
          </p>
        </div>
        <div className={styles.heroImageWrap} style={{ backgroundImage: 'url(/1.webp)' }} />
      </section>
      <Section2 hideBtn />
    </main>
  );
}
