'use client';

import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import styles from './not-found.module.scss';

export default function NotFound() {
  const { dict, locale } = useI18n();
  const loc = (path) => `/${locale}${path}`;

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>{dict.notFound.title}</h1>
        <p className={styles.desc}>
          {dict.notFound.desc}
        </p>
        <Link href={loc('/')} className={styles.btn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          <span>{dict.notFound.cta}</span>
        </Link>
      </div>
      <div className={styles.grid}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className={styles.gridLine} style={{ '--i': i }} />
        ))}
      </div>
    </div>
  );
}
