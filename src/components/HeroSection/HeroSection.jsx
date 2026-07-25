'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import styles from './HeroSection.module.scss';

export default function HeroSection() {
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
    <div className={styles.container}>
      <section className={styles.hero}>
        <img src="/asci.svg" alt="" className={styles.heroBgSvg} />
        <div className={styles.heroImages}>
          <div className={styles.heroImgWrap}>
            <img src="/1.webp" alt="" className={styles.heroImg} loading="eager" decoding="async" />
            <div className={styles.heroImgOverlay} />
            <div className={styles.badge}>
              <span className={styles.badgeYear}>{dict.hero.badgeYear}</span>
              <span className={styles.badgeText}>{dict.hero.badgeText}</span>
            </div>
          </div>
          <div className={styles.heroImgWrap}>
            <img src="/2.webp" alt="" className={styles.heroImg} loading="eager" decoding="async" />
            <div className={styles.heroImgOverlay} />
          </div>
        </div>
        <div className={styles.heroBottom}>
          <div className={styles.heroTopRow}>
            <h1 className={styles.heroTitle}>
              <span>{dict.hero.title1}</span>
              <span>{dict.hero.title2}</span>
              <span className={styles.heroTitleGray}>{dict.hero.title3}</span>
            </h1>
            <p className={styles.heroBody}>
              <span className={styles.heroBodyPrimary}>{dict.hero.bodyPrimary}</span><br /><span className={styles.heroBodySecondary}>{dict.hero.bodySecondary}</span>
            </p>
          </div>
          <Link href={loc('/contact')} className={styles.btnWork} ref={btnRef}>
            <span className={styles.btnWorkText} ref={btnTextRef}>{dict.hero.cta}</span>
            <span className={styles.btnWorkIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
          </Link>
        </div>

      </section>
    </div>
  );
}
