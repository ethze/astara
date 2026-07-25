'use client';

import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import styles from './ProductDetail.module.scss';

export default function ProductDetail({ product }) {
  const { dict, locale } = useI18n();
  const loc = (path) => `/${locale}${path}`;
  const groups = product.specGroups || [];
  const leftGroup = groups[0] || { title: dict.productDetail.specs, items: [] };
  const rightGroup = groups[1] || { title: dict.productDetail.features, items: [] };

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link href={loc('/')} className={styles.backBtn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          <span>{dict.common.back}</span>
        </Link>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <img src={product.image} alt={product.title} className={styles.heroImage} />
        </div>
        <div className={styles.heroInfo}>
          <span className={styles.num}>{product.num}</span>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.desc}>{product.desc}</p>
        </div>
      </div>

      <div className={styles.specSection}>
        <div className={styles.columns}>
          <div className={styles.col}>
            <h2 className={styles.specHeaderTitle}>{leftGroup.title}</h2>
            <table className={styles.table}>
              <tbody>
                {leftGroup.items.map((spec, i) => (
                  <tr key={i} className={styles.row}>
                    <td className={`${styles.cell} ${styles.letterCell}`}>
                      <div className={styles.letterBox}>{String.fromCharCode(65 + i)}</div>
                    </td>
                    <td className={`${styles.cell} ${styles.labelCell}`}>{spec.label}</td>
                    <td className={`${styles.cell} ${styles.valueCell}`}>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.col}>
            <h2 className={styles.specHeaderTitle}>{rightGroup.title}</h2>
            <table className={styles.table}>
              <tbody>
                {rightGroup.items.map((spec, i) => (
                  <tr key={i} className={styles.row}>
                    <td className={`${styles.cell} ${styles.letterCell}`}>
                      <div className={styles.letterBox}>{String.fromCharCode(65 + i)}</div>
                    </td>
                    <td className={`${styles.cell} ${styles.labelCell}`}>{spec.label}</td>
                    <td className={`${styles.cell} ${styles.valueCell}`}>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
