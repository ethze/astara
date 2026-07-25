'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/context';
import styles from './contact.module.scss';

export default function ContactPage() {
  const { dict, locale } = useI18n();
  const loc = (path) => `/${locale}${path}`;
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

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
          <span className={styles.label}>{dict.contact.label}</span>
          <h1 className={styles.title}>
            {dict.contact.title1}&nbsp;<span className={styles.highlight}>{dict.contact.title2}</span>
          </h1>
          <p className={styles.intro}>
            {dict.contact.intro}
          </p>
        </div>
        <div className={styles.heroImageWrap} style={{ backgroundImage: 'url(/1.webp)' }} />
      </section>

      <div className={styles.bodyGrid}>
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>{dict.contact.formTitle}</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="name">{dict.contact.name}</label>
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
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="email">{dict.contact.email}</label>
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
                <label className={styles.fieldLabel} htmlFor="phone">{dict.contact.phone}</label>
                <input
                  className={styles.input}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="message">{dict.contact.message} <span className={styles.optional}>{dict.common.optional}</span></label>
              <textarea
                className={styles.textarea}
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              <span>{dict.contact.submit}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </form>
        </section>

        <section className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>{dict.contact.infoTitle}</h2>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>{dict.contact.addressLabel}</span>
              <span className={styles.infoValue}>
                {dict.contact.addressValue}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>{dict.contact.emailLabel}</span>
              <span className={styles.infoValue}>{dict.contact.emailValue}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>{dict.contact.phoneLabel}</span>
              <span className={styles.infoValue}>{dict.contact.phoneValue}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>{dict.contact.hoursLabel}</span>
              <span className={styles.infoValue}>{dict.contact.hoursValue}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
