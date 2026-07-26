'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from '@/components/SmoothScroll/SmoothScroll';
import Logo from '@/components/Logo/Logo';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { useI18n } from '@/i18n/context';
import styles from './Navbar.module.scss';

function switchLocale(pathname, newLocale) {
  const segments = pathname.split('/');
  segments[1] = newLocale;
  return segments.join('/');
}

function DotIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 6h18M3 12h18M3 18h18"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function Navbar() {
  const { dict, locale } = useI18n();
  const pathname = usePathname();
  const [openIdx, setOpenIdx] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  const otherLocale = locale === 'en' ? 'id' : 'en';
  const otherLabel = locale === 'en' ? 'Id' : 'En';
  const otherFlag = locale === 'en' ? '\uD83C\uDDEE\uD83C\uDDE9' : '\uD83C\uDDEC\uD83C\uDDE7';
  const currentFlag = locale === 'en' ? '\uD83C\uDDEC\uD83C\uDDE7' : '\uD83C\uDDEE\uD83C\uDDE9';
  const currentLabel = locale === 'en' ? 'En' : 'Id';

  const loc = (path) => `/${locale}${path}`;

  const menu = [
    { label: dict.nav.services, href: loc('/services') },
    {
      label: dict.nav.products,
      children: [
        { text: dict.navProducts.interactiveChair, href: loc('/products/interactive-chair') },
        { text: dict.navProducts.smartboard, href: loc('/products/smartboard') },
        { text: dict.navProducts.ledVideotron, href: loc('/products/led-videotron') },
        { text: dict.navProducts.gsmJammer, href: loc('/products/gsm-jammer') },
        { text: dict.navProducts.gsmLteBts, href: loc('/products/gsm-lte-bts') },
        { text: dict.navProducts.imsiCatcher, href: loc('/products/imsi-catcher') },
      ],
    },
    {
      label: dict.nav.about,
      children: [
        { text: dict.nav.aboutUs, href: loc('/about') },
        { text: dict.nav.career, href: loc('/career') },
      ],
    },
  ];

  const close = () => {
    setOpenIdx(null);
    setLangOpen(false);
  };

  const toggle = (i) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  useEffect(() => {
    if (openIdx === null) return;
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [openIdx]);

  const lenis = useLenis();

  useEffect(() => {
    if (mobileOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => lenis?.start();
  }, [mobileOpen, lenis]);

  const langHref = (lng) => switchLocale(pathname, lng);

  return (
    <nav className={styles.navbar} ref={navRef}>
      <div className={styles.navLeft}>
        <div className={styles.logo}>
          <Link href={loc('/')} aria-label={dict.common.brand}><Logo /></Link>
          <div className={styles.logoText}>
            <Link href={loc('/')}>Astara&trade;</Link>
            <span>{dict.common.tagline}</span>
          </div>
        </div>
      </div>

      {/* Desktop nav */}
      <div className={styles.navRight}>
        <div className={styles.navGroupLeft}>
          {menu.map((item, i) => (
            item.href ? (
              <Link key={item.label} href={item.href} className={styles.menuLink}>{item.label}</Link>
            ) : (
            <div key={item.label} className={styles.menuItem}>
              <button className={`${styles.menuBtn} ${openIdx === i ? styles.menuBtnOpen : ''}`} onClick={() => toggle(i)}>
                {item.label}
                <svg className={`${styles.arrow} ${openIdx === i ? styles.arrowOpen : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`${styles.submenu} ${openIdx === i ? styles.submenuOpen : ''}`}>
                <div className={styles.submenuInner}>
                    {item.children.map((child, j) => (
                      <Link key={child.text} href={child.href} onClick={close} style={{ '--i': j, '--n': item.children.length - 1 - j }}>
                        <span className={styles.num}>[{j + 1}]</span>
                        {child.text}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            )
          ))}
        </div>

        <div className={styles.navGroupRight}>
          <ThemeToggle />
          <div className={styles.langWrap}>
            <button className={styles.langBtn} onClick={() => setLangOpen(prev => !prev)} aria-label={dict.nav.language}>
              {currentFlag} {currentLabel}
              <svg className={styles.langArrow} width="8" height="8" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={`${styles.langMenu} ${langOpen ? styles.langMenuOpen : ''}`}>
              <div className={styles.submenuInner}>
                <Link href={langHref('en')} className={styles.langItem} onClick={close}>&#127468;&#127463; En</Link>
                <Link href={langHref('id')} className={styles.langItem} onClick={close}>&#127470;&#127465; Id</Link>
              </div>
            </div>
          </div>
          <Link href={loc('/contact')} className={styles.contactLink}>{dict.nav.contact}</Link>
        </div>

        {/* 4-dot mobile trigger */}
        <button
          className={styles.dotTrigger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
        >
          {mobileOpen ? <CloseIcon /> : <DotIcon />}
        </button>
      </div>

      {/* Full-width mobile overlay */}
      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ''}`}>
        <div className={styles.mobileBg} onClick={() => setMobileOpen(false)} />
          <div className={styles.mobilePanel}>
            <div className={styles.mobileContent}>
              <div className={styles.mobileSpacer} />
              {menu.map((item, i) => (
                item.href ? (
                <Link key={item.label} href={item.href} className={styles.mobileGroupBtn} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
                ) : (
              <div key={item.label} className={styles.mobileGroup}>
                <button className={styles.mobileGroupBtn} onClick={() => toggle(i)}>
                  {item.label}
                  <svg className={`${styles.mobileArrow} ${openIdx === i ? styles.mobileArrowOpen : ''}`} width="12" height="12" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={`${styles.mobileSub} ${openIdx === i ? styles.mobileSubOpen : ''}`}>
                  <div>
                    {item.children.map((child, j) => (
                      <Link key={child.text} href={child.href} className={styles.mobileLink} onClick={() => { close(); setMobileOpen(false); }}>
                        <span className={styles.num}>[{j + 1}]</span>
                        {child.text}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
                )
            ))}
            <Link href={loc('/contact')} className={styles.mobileLinkAlt} onClick={() => setMobileOpen(false)}>{dict.nav.contact}</Link>
            </div>
            <div className={styles.mobileFooter}>
              <div className={styles.mobileFooterRow}>
                <Link href={langHref(otherLocale)} className={styles.mobileLang} onClick={() => setMobileOpen(false)}>
                  {otherFlag} {otherLocale === 'id' ? dict.nav.bahasa : dict.nav.english}
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>
      </div>
    </nav>
  );
}
