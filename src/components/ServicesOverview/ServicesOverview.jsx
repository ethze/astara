'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import styles from './ServicesOverview.module.scss';

const categories = [
  {
    title: 'COMPUTER',
    items: ['Interactive Chair', 'Racing Simulator', 'Laptop/Computer'],
  },
  {
    title: 'TELECOM',
    items: ['GSM/LTE BTS', 'IMSI CATHER', 'GSM Jammer'],
  },
  {
    title: 'VISUAL',
    items: ['Digital Interactive', 'Videotron'],
  },
  {
    title: 'IT SERVICES',
    items: ['Web Development', 'Web App', 'UI/UX Design', 'Progressive Web App'],
  },
  {
    title: 'UI / UX Design',
    items: ['Figma Prototyping', 'Design System', 'User Research'],
  },
  {
    title: 'AI Solutions',
    items: ['Large Language Model', 'Automation', 'Chatbot', 'Machine Learning'],
  },
  {
    title: 'System Integration',
    items: ['RESTful API', 'Cloud Infrastructure', 'Microservice'],
  },
];

export default function ServicesOverview({ hideBtn }) {
  const { dict, locale } = useI18n();
  const btnRef = useRef(null);
  const btnTextRef = useRef(null);

  const loc = (path) => `/${locale}${path}`;

  useEffect(() => {
    const adjustIconBoxWidth = () => {
      if (btnTextRef.current && btnRef.current) {
        const textWidth = btnTextRef.current.offsetWidth;
        btnRef.current.style.setProperty('--text-width', textWidth + 'px');
      }
    };
    const timer = setTimeout(adjustIconBoxWidth, 100);
    window.addEventListener('resize', adjustIconBoxWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', adjustIconBoxWidth);
    };
  }, []);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.topMeta}>
          <span>{dict.section2.metaLeft}</span>
          <span>{dict.section2.metaRight}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <h2 className={styles.heroTitle}>
              {dict.section2.title1}<br />
              {dict.section2.title2}
            </h2>
            <p className={styles.heroSub}>{dict.section2.subtitle}</p>
            <div className={styles.bottomText}>
              {dict.section2.desc}
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.exp}>
            <div className={styles.expBox}>
                <h2 className={styles.expNum}>{dict.section2.expNumber}</h2>
                <p className={styles.expLabel}>{dict.section2.expLabel}</p>
                {!hideBtn && (
                <Link href={loc('/services')} className={styles.btn} ref={btnRef}>
                  <span ref={btnTextRef}>{dict.section2.btnText}</span>
                  <i className={styles.btnIcon}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </i>
                </Link>
                )}
              </div>
            </div>

            <div className={styles.what}>{dict.section2.label}</div>

            <div className={styles.list}>
              {categories.map((cat, i) => (
                <div key={i} className={styles.item}>
                  <div className={styles.itemTitle}>{cat.title}</div>
                  <div className={styles.tags}>
                    {cat.items.map((tag, j) => (
                      <span key={j} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {hideBtn && (
      <section className={styles.outsource}>
        <div className={styles.outsourceInner}>
          <h2 className={styles.outsourceTitle}>{dict.section2.outsourceTitle}</h2>
          <div className={styles.outsourceGrid}>
            <p className={styles.outsourceText}>
              {dict.section2.outsourceP1}
            </p>
            <p className={styles.outsourceText}>
              {dict.section2.outsourceP2}
            </p>
          </div>
        </div>
      </section>
      )}
    </>
  );
}
