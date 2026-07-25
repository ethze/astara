'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Cursor.module.scss';

export default function Crosshair() {
  const centerRef = useRef(null);

  useEffect(() => {
    const moveHandler = (e) => {
      if (centerRef.current)
        gsap.to(centerRef.current, {
          top: e.clientY,
          left: e.clientX,
          duration: 0.15,
        });
    };

    const clickDown = () => {
      if (centerRef.current) {
        gsap.to(centerRef.current, { scale: 1.6, duration: 0.2 });
      }
    };
    const clickUp = () => {
      if (centerRef.current) {
        gsap.to(centerRef.current, { scale: 1, duration: 0.3 });
      }
    };

    const handleHoverIn = () => {
      if (centerRef.current) {
        gsap.to(centerRef.current, { scale: 2.7, duration: 0.25 });
      }
    };
    const handleHoverOut = () => {
      if (centerRef.current) {
        gsap.to(centerRef.current, { scale: 1, duration: 0.25 });
      }
    };

    const hoverTargets = document.querySelectorAll('.cursor-hover');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverIn);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mousedown', clickDown);
    window.addEventListener('mouseup', clickUp);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mousedown', clickDown);
      window.removeEventListener('mouseup', clickUp);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn);
        el.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, []);

  return (
    <div className={styles.crosshair}>
      <div className={styles.center} ref={centerRef}>
        <div className={`${styles.corner} ${styles.tl}`}></div>
        <div className={`${styles.corner} ${styles.tr}`}></div>
        <div className={`${styles.corner} ${styles.bl}`}></div>
        <div className={`${styles.corner} ${styles.br}`}></div>
      </div>
    </div>
  );
}
