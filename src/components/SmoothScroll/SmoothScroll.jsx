'use client';
import { useEffect, useState, createContext, useContext, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

const globalScrollPos = {};

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const pathname = usePathname();
  const initializedRef = useRef(false);

  const doRestoreScroll = (target) => {
    const isMobile = window.innerWidth <= 834;
    let tries = 0;
    const maxTries = 20;

    const tryRestore = () => {
      tries++;
      if (isMobile) {
        const w = document.querySelector('#scroll-wrapper');
        if (w) {
          w.scrollTop = target;
        }
        if (tries < maxTries) requestAnimationFrame(tryRestore);
        return;
      }

      if (window.__lenis) {
        window.__lenis.resize();
        const limit = window.__lenis.limit;
        if (limit >= target || tries >= maxTries) {
          window.__lenis.scrollTo(Math.min(target, limit), { immediate: true });
          return;
        }
      }
      if (tries < maxTries) requestAnimationFrame(tryRestore);
    };

    requestAnimationFrame(tryRestore);
  };

  useEffect(() => {
    const isMobile = window.innerWidth <= 834;
    const wrapper = document.querySelector('#scroll-wrapper');

    if (isMobile) {
      if (!wrapper) return;
      initializedRef.current = true;
      const onScroll = () => {
        globalScrollPos[window.location.pathname] = wrapper.scrollTop;
        sessionStorage.setItem('spos', JSON.stringify(globalScrollPos));
      };
      wrapper.addEventListener('scroll', onScroll, { passive: true });
      return () => wrapper.removeEventListener('scroll', onScroll);
    }

    const content = document.querySelector('#scroll-content');
    if (!wrapper || !content) return;

    const lenisInstance = new Lenis({
      wrapper,
      content,
      lerp: 0.1,
      duration: 1.2,
      syncTouch: true,
    });

    window.__lenis = lenisInstance;

    let frameId;
    function raf(time) {
      lenisInstance.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    lenisInstance.on('scroll', (e) => {
      const p = window.location.pathname;
      globalScrollPos[p] = Math.round(e.scroll);
      sessionStorage.setItem('spos', JSON.stringify(globalScrollPos));
    });

    initializedRef.current = true;
    setLenis(lenisInstance);

    return () => {
      window.__lenis = null;
      lenisInstance.destroy();
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!initializedRef.current) return;

    try {
      const stored = sessionStorage.getItem('spos');
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.assign(globalScrollPos, parsed);
      }
    } catch {}

    const saved = globalScrollPos[pathname];
    doRestoreScroll(saved !== undefined ? saved : 0);
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

export default function SmoothScroll({ children }) {
  return (
    <div id="scroll-wrapper">
      <div id="scroll-content">
        {children}
      </div>
    </div>
  );
}
