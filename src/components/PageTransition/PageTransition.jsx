'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './PageTransition.module.scss';

function waitForImages() {
  const content = document.querySelector('#scroll-content');
  if (!content) return Promise.resolve();

  const imgs = content.querySelectorAll('img');
  const promises = [];

  imgs.forEach((img) => {
    if (img.complete) return;
    if (img.getAttribute('loading') === 'lazy') return;
    promises.push(
      new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      })
    );
  });

  if (promises.length === 0) return Promise.resolve();
  return Promise.race([
    Promise.all(promises),
    new Promise((r) => setTimeout(r, 4000)),
  ]);
}

export default function PageTransitionOverlay() {
  const pathname = usePathname();
  const prevRef = useRef(pathname);
  const overlayRef = useRef(null);
  const mountedRef = useRef(false);
  const visibleRef = useRef(false);
  const manualNavRef = useRef(false);

  const show = () => {
    const el = overlayRef.current;
    if (!el) return;
    visibleRef.current = true;
    el.style.transition = 'none';
    el.style.height = '100%';
    el.offsetHeight;
  };

  const hide = () => {
    const el = overlayRef.current;
    if (!el) return;
    visibleRef.current = false;
    el.style.transition = 'height 0.7s cubic-bezier(0.76, 0, 0.24, 1)';
    el.offsetHeight;
    el.style.height = '0';
  };

  useEffect(() => {
    window.__showPageTransition = () => {
      manualNavRef.current = true;
      show();
    };
    return () => { delete window.__showPageTransition; };
  }, []);

  // Link click interception
  useEffect(() => {
    const handler = (e) => {
      const link = e.target.closest('a');
      if (!link || !link.href) return;
      try {
        const url = new URL(link.href, window.location.origin);
        if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
          manualNavRef.current = true;
          show();
        }
      } catch {}
    };
    document.addEventListener('click', handler, { capture: true });
    return () => document.removeEventListener('click', handler, { capture: true });
  }, []);

  // Popstate interception
  useEffect(() => {
    const handler = () => {
      if (manualNavRef.current) {
        manualNavRef.current = false;
        return;
      }
      show();
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  // pageshow (bfcache restore) → hide overlay
  useEffect(() => {
    const handler = () => {
      manualNavRef.current = false;
      hide();
    };
    window.addEventListener('pageshow', handler);
    return () => window.removeEventListener('pageshow', handler);
  }, []);

  // Pathname changed → wait for images → hide
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      prevRef.current = pathname;
      return;
    }
    if (pathname === prevRef.current) return;
    prevRef.current = pathname;
    manualNavRef.current = false;

    const minShow = new Promise((r) => setTimeout(r, 800));
    Promise.all([waitForImages(), minShow]).then(() => {
      setTimeout(hide, 50);
    });
  }, [pathname]);

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.inner}>
        <div className={styles.spinner} />
      </div>
    </div>
  );
}
