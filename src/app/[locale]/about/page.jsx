'use client';

import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import styles from './about.module.scss';

export default function AboutPage() {
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
          <span className={styles.label}>{dict.about.label}</span>
          <h1 className={styles.title}>
            {dict.about.title1}&nbsp;<span className={styles.highlight}>{dict.about.title2}</span>
          </h1>
          <p className={styles.intro}>
            {dict.about.intro}
          </p>
        </div>
        <div className={styles.heroImageWrap} style={{ backgroundImage: 'url(/1.webp)' }} />
      </section>

      {/* <section className={styles.milestones}>
        <h2 className={styles.sectionTitle}>{dict.about.milestonesTitle}</h2>
        <div className={styles.timeline}>
          {dict.about.milestones.map((m) => (
            <div key={m.year} className={styles.milestone}>
              <div className={styles.year}>{m.year}</div>
              <div className={styles.events}>
                {m.items.map((text, i) => (
                  <p key={i} className={styles.event}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section> */}

      <section className={styles.dualSection}>
        <div className={styles.dualCol}>
          <h2 className={styles.sectionTitle}>{dict.about.philosophyTitle}</h2>
          <p className={styles.bodyText}>
            {dict.about.philosophyDesc}
          </p>
        </div>
        <div className={styles.dualCol}>
          <h2 className={styles.sectionTitle}>{dict.about.visionTitle}</h2>
          <p className={styles.bodyText}>
            {dict.about.visionDesc}
          </p>
        </div>
      </section>

      <section className={styles.values}>
        <h2 className={styles.sectionTitle}>{dict.about.valuesTitle}</h2>
        <div className={styles.valuesGrid}>
          {dict.about.values.map((v, i) => (
            <div key={v.title} className={styles.valueCard}>
              <div className={styles.valueNum}>
                {i === 0 && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                )}
                {i === 1 && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )}
                {i === 2 && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                )}
              </div>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
