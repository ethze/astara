'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '@/i18n/context';
import styles from './GallerySection.module.scss';

const images = [
  '/gallery/proses_design.webp',
  '/gallery/proses_rangkaian_elektronika.webp',
  '/gallery/interactive_chair_demo.webp',
  '/gallery/interactive_chair_demo_alt.webp',
  '/gallery/interactive_chair_instalation.webp',
  '/gallery/departemen_cyber_aau.webp',
];

export default function GallerySection() {
  const { dict } = useI18n();
  const scrollRef = useRef(null);
  const [modalItem, setModalItem] = useState(null);
  const [closing, setClosing] = useState(false);
  const [scrollDir, setScrollDir] = useState({ left: false, right: true });

  const galleryData = dict.gallery.items.map((item, i) => ({
    ...item,
    id: i + 1,
    num: String(i + 1),
    image: images[i],
  }));

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollDir({
      left: el.scrollLeft > 5,
      right: el.scrollLeft < el.scrollWidth - el.clientWidth - 5,
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.5;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const openModal = (item) => {
    setClosing(false);
    setModalItem(item);
  };
  const closeModal = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setModalItem(null);
      setClosing(false);
    }, 250);
  }, []);

  useEffect(() => {
    if (!modalItem) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [modalItem, closeModal]);

  return (
    <>
    <section className={styles.section}>
      {/* HEADER SECTION */}
      <div className={styles.headerGrid}>
        <div className={styles.headerLeft}>
          <span className={styles.label}>{dict.gallery.label}</span>
          <h2 className={styles.heading}>
            {dict.gallery.title1} <br />
            <span className={styles.headingGray}>{dict.gallery.title2}</span>
          </h2>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.headerDesc}>
            {dict.gallery.desc}
          </p>
        </div>
      </div>

      {/* GALLERY GRID SECTION */}
      <div className={styles.grid} ref={scrollRef}>
        {galleryData.map((item) => (
          <div key={item.id} className={styles.card} onClick={() => openModal(item)}>
            <div className={styles.cardImageWrap}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.cardImage}
                loading="eager"
                decoding="async"
              />
              <div className={styles.cardOverlay}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.arrowRow}>
        <button className={styles.arrowBtn} style={{ opacity: scrollDir.left ? 1 : 0.3 }} onClick={() => scroll('left')} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
        </button>
        <button className={styles.arrowBtn} style={{ opacity: scrollDir.right ? 1 : 0.3 }} onClick={() => scroll('right')} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M5 12h14M19 12l-7-7M19 12l-7 7" />
          </svg>
        </button>
      </div>
    </section>

      {modalItem && createPortal(
        <div className={`${styles.modalBackdrop} ${closing ? styles.closing : ''}`} onClick={closeModal}>
          <div className={`${styles.modal} ${closing ? styles.closing : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalInner}>
              <button className={styles.modalClose} onClick={closeModal} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
              <div className={styles.modalImageWrap}>
                <img
                  src={modalItem.image}
                  alt={modalItem.title}
                  className={styles.modalImage}
                />
              </div>
              <div className={styles.modalInfo}>
                <h3 className={styles.modalTitle}>{modalItem.title}</h3>
                <p className={styles.modalDesc}>{modalItem.desc}</p>
                {modalItem.tags && (
                  <div className={styles.modalTags}>
                    {modalItem.tags.map((t, i) => (
                      <span key={i} className={styles.modalTag}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
