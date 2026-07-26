'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo/Logo';
import AsciiArt from './AsciiArt';
import { useI18n } from '@/i18n/context';
import styles from './Footer.module.scss';

export default function Footer() {
  const { dict, locale } = useI18n();
  const btnRef = useRef(null);
  const btnTextRef = useRef(null);

  const loc = (path) => `/${locale}${path}`;

  const navLinks = [
    { label: dict.nav.services, href: loc('/services') },
    { label: dict.nav.products, href: loc('/products/interactive-chair') },
    { label: dict.nav.aboutUs, href: loc('/about') },
    { label: dict.nav.contact, href: loc('/contact') },
  ];

  const contactItems = [
    { label: dict.contact.emailLabel, value: dict.contact.emailValue },
    { label: dict.contact.phoneLabel, value: dict.contact.phoneValue },
  ];

  useEffect(() => {
    const adjustIconWidth = () => {
      if (btnTextRef.current && btnRef.current) {
        const textWidth = btnTextRef.current.offsetWidth;
        btnRef.current.style.setProperty('--text-width', textWidth + 'px');
      }
    };
    const timer = setTimeout(adjustIconWidth, 100);
    window.addEventListener('resize', adjustIconWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', adjustIconWidth);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.btnRow}>
        <a href={loc('/contact')} className={styles.btn} ref={btnRef} aria-label={dict.footer.cta}>
          <span ref={btnTextRef} className={styles.btnText}>{dict.footer.cta}</span>
          <span className={styles.btnIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
        </a>
        <AsciiArt className={styles.asciiArt} />
      </div>

      <div className={styles.grid}>
        <div className={styles.columnBrand}>
          <Link href={loc('/')} className={styles.logoWrap} aria-label={dict.common.brand}>
            <Logo className={styles.footerLogo} />
            <div className={styles.brandText}>
              <span className={styles.brandName}>{dict.common.brand}</span>
              <span className={styles.tagline}>{dict.common.tagline}</span>
            </div>
          </Link>
          <div className={styles.addressBlock}>
            <span className={styles.addressLabel}>{dict.footer.headOffice}</span>
            <span className={styles.addressValue}>
              {dict.contact.addressValue}
            </span>
          </div>
        </div>
        <div className={styles.columnNav}>
          <span className={styles.colTitle}>{dict.footer.navigation}</span>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={styles.navLink}>{link.label}</Link>
          ))}
        </div>
        <div className={styles.columnContact}>
          <span className={styles.colTitle}>{dict.footer.contactTitle}</span>
          {contactItems.map((item) => (
            <div key={item.label} className={styles.contactItem}>
              <span className={styles.contactLabel}>{item.label}</span>
              <span className={styles.contactValue}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span>{dict.footer.copyright}</span>
        <span className={styles.bottomTagline}>{dict.footer.techIntegration}</span>
      </div>
    </footer>
  );
}
