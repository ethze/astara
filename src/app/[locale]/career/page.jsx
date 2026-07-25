'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import styles from './career.module.scss';

export default function CareerPage() {
  const { dict, locale } = useI18n();
  const loc = (path) => `/${locale}${path}`;
  const [openId, setOpenId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>{dict.career.label}</span>
          <h1 className={styles.title}>
            {dict.career.title1}&nbsp;<span className={styles.highlight}>{dict.career.title2}</span>
          </h1>
          <p className={styles.intro}>
            {dict.career.intro}
          </p>
        </div>
        <div className={styles.heroImageWrap} style={{ backgroundImage: 'url(/1.webp)' }} />
      </section>

      <div className={styles.bodyGrid}>
        <section className={styles.positionsSection} data-lenis-prevent>
          <h2 className={styles.sectionTitle}>{dict.career.positionsTitle}</h2>
          <div className={styles.positionsList} data-lenis-prevent>
            {dict.career.positions.map((pos, idx) => (
              <div key={idx} className={`${styles.positionItem} ${openId === idx ? styles.positionItemOpen : ''}`}>
                <button className={styles.positionBtn} onClick={() => toggle(idx)}>
                  <div className={styles.positionBtnLeft}>
                    <h3 className={styles.positionTitle}>{pos.title}</h3>
                    <div className={styles.positionMeta}>
                      <span className={styles.positionType}>{pos.type}</span>
                      <span className={styles.positionLocation}>{pos.location}</span>
                    </div>
                  </div>
                  <svg className={`${styles.positionArrow} ${openId === idx ? styles.positionArrowOpen : ''}`} viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={`${styles.positionAccordion} ${openId === idx ? styles.positionAccordionOpen : ''}`}>
                  <div className={styles.positionAccordionInner}>
                    <p className={styles.positionDesc}>{pos.desc}</p>
                    <span className={styles.requirementsLabel}>{dict.career.requirements}</span>
                    <ul className={styles.requirementsList}>
                      {pos.requirements.map((req, i) => (
                        <li key={i} className={styles.requirementItem}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>{dict.career.applyTitle}</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="name">{dict.career.name}</label>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="email">{dict.career.email}</label>
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="phone">{dict.career.phone}</label>
              <input
                className={styles.input}
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="message">{dict.career.message} <span className={styles.optional}>{dict.common.optional}</span></label>
              <textarea
                className={styles.textarea}
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>{dict.career.uploadCv}</label>
              <label className={styles.uploadBtn}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span>{dict.career.chooseFile}</span>
                <input type="file" accept=".pdf,.doc,.docx" hidden />
              </label>
              <span className={styles.uploadHint}>{dict.career.uploadHint}</span>
            </div>
            <button type="submit" className={styles.submitBtn}>
              <span>{dict.career.submit}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
