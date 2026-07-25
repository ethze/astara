'use client';

import Link from 'next/link';
import products from '@/data/products';
import { useI18n } from '@/i18n/context';
import styles from './Section5.module.scss';

export default function Section5() {
  const { dict, locale } = useI18n();
  const loc = (path) => `/${locale}${path}`;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>{dict.section5.label}</span>
        <h2 className={styles.heading}>
          {dict.section5.title1} <span className={styles.headingGray}>{dict.section5.title2}</span>
        </h2>
      </div>
      <div className={styles.list}>
        {products.map((product, i) => (
          <Link key={i} href={loc(`/products/${product.slug}`)} className={styles.card}>
            <div className={styles.cardLeft}>
              <div className={styles.cardNum}>{product.num}</div>
              <div className={styles.cardImageWrap}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.cardImage}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.cardCategory}>{product.category}</div>
              <h3 className={styles.cardTitle}>{product.title}</h3>
              <p className={styles.cardDesc}>{product.desc}</p>
              <div className={styles.cardArrow}>
                <svg width="clamp(24px, 3vw, 40px)" height="clamp(24px, 3vw, 40px)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
