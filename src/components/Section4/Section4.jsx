'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useModel } from '@/components/ModelContext/ModelContext';
import { useI18n } from '@/i18n/context';
import styles from './Section4.module.scss';

const FX_NONE = 'none';

export default function Section4() {
  const { dict } = useI18n();
  const containerRef = useRef(null);
  const { glbScene } = useModel();
  const [gesture, setGesture] = useState(null);
  const mainCameraRef = useRef(null);
  const camTargetRef = useRef(null);
  const posRef = useRef(null);
  const [posVisible, setPosVisible] = useState(true);

  useEffect(() => {
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setGesture(isMobile ? 'pinch' : 'scroll');
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !glbScene) return;

    let cancelled = false;
    let animId = null;
    let renderer = null;

    (async () => {
      const THREE = await import('three');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
      if (cancelled) return;

      const isDark = document.documentElement.classList.contains('dark');

      const scene = new THREE.Scene();
      const bgColor = new THREE.Color(isDark ? '#0a0a0a' : '#ffffff');
      scene.background = bgColor;

      const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(-7.44, 2.12, 9.36);
      camera.lookAt(0, 0, 0);
      mainCameraRef.current = camera;

      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const brandColor = getComputedStyle(container).getPropertyValue('--brand').trim() || '#117D91';

      const model = glbScene.clone(true);
      const finalGroup = new THREE.Group();

      model.updateWorldMatrix(true, false);

      model.traverse((child) => {
        if (!child.geometry) return;
        const geo = child.geometry.clone();
        geo.applyMatrix4(child.matrixWorld);

        const lineMat = new THREE.LineBasicMaterial({
          color: brandColor,
          transparent: true,
          opacity: 0.7,
        });

        if (child.isLine) {
          const line = new THREE.LineSegments(geo, lineMat);
          line.frustumCulled = false;
          finalGroup.add(line);
        } else if (child.isMesh) {
          const wireframe = new THREE.WireframeGeometry(geo);
          const line = new THREE.LineSegments(wireframe, lineMat);
          line.frustumCulled = false;
          finalGroup.add(line);
        }

        geo.dispose();
      });

      const box = new THREE.Box3().setFromObject(finalGroup);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const scale = 8 / Math.max(size.x, size.y, size.z);

      finalGroup.position.copy(center).multiplyScalar(-scale);
      finalGroup.scale.setScalar(scale);

      scene.add(finalGroup);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2;
      controls.enablePan = false;
      controls.enableZoom = false;

      let targetLen = camera.position.length();
      const MIN_LEN = 3;
      const MAX_LEN = 20;
      const LERP = 0.12;
      const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

      camTargetRef.current = { value: null };

      const onWheel = (e) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          e.stopPropagation();
          targetLen = clamp(targetLen + e.deltaY * 0.02, MIN_LEN, MAX_LEN);
        }
      };

      let pinchStartDist = null;
      let pinchStartLen = null;

      const getPinchDist = (t1, t2) => {
        const dx = t1.clientX - t2.clientX;
        const dy = t1.clientY - t2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
      };

      const onTouchStart = (e) => {
        if (e.touches.length === 2) {
          e.stopImmediatePropagation();
          e.preventDefault();
          controls.enabled = false;
          pinchStartDist = getPinchDist(e.touches[0], e.touches[1]);
          pinchStartLen = targetLen;
        }
      };

      const onTouchMove = (e) => {
        if (e.touches.length === 2 && pinchStartDist !== null) {
          e.stopImmediatePropagation();
          e.preventDefault();
          const dist = getPinchDist(e.touches[0], e.touches[1]);
          const ratio = pinchStartDist / dist;
          targetLen = clamp(pinchStartLen * ratio, MIN_LEN, MAX_LEN);
        }
      };

      const onTouchEnd = (e) => {
        if (e.touches.length === 0) {
          controls.enabled = true;
        }
        if (e.touches.length < 2) {
          pinchStartDist = null;
          pinchStartLen = null;
        }
      };

      renderer.domElement.addEventListener('wheel', onWheel, { capture: true, passive: false });
      renderer.domElement.addEventListener('touchstart', onTouchStart, { capture: true, passive: false });
      renderer.domElement.addEventListener('touchmove', onTouchMove, { capture: true, passive: false });
      renderer.domElement.addEventListener('touchend', onTouchEnd, { capture: true, passive: true });

      let idleTimeout;
      let interacting = false;
      let frameCount = 0;
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      const THROTTLE_FRAME = isMobile ? 2 : 1;

      controls.addEventListener('start', () => {
        controls.autoRotate = false;
        interacting = true;
        clearTimeout(idleTimeout);
      });
      controls.addEventListener('end', () => {
        idleTimeout = setTimeout(() => {
          interacting = false;
          controls.autoRotate = true;
        }, 3000);
      });

      const animate = () => {
        animId = requestAnimationFrame(animate);
        frameCount++;
        if (isMobile && !interacting && frameCount % THROTTLE_FRAME !== 0) return;
        const time = performance.now() * 0.001;

        const curLen = camera.position.length();
        const newLen = curLen + (targetLen - curLen) * LERP;
        camera.position.normalize().multiplyScalar(newLen);

        if (camTargetRef.current && camTargetRef.current.value) {
          const ct = camTargetRef.current.value;
          camera.position.lerp(ct, 0.08);
          if (camera.position.distanceTo(ct) < 0.01) {
            camera.position.copy(ct);
            camTargetRef.current.value = null;
          }
        }

        controls.update();
        renderer.render(scene, camera);

        if (posRef.current && frameCount % 3 === 0) {
          posRef.current.children[1].textContent = 'X ' + camera.position.x.toFixed(2);
          posRef.current.children[2].textContent = 'Y ' + camera.position.y.toFixed(2);
          posRef.current.children[3].textContent = 'Z ' + camera.position.z.toFixed(2);
        }
      };
      animId = requestAnimationFrame(animate);

      const visObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (!animId) animate();
        } else {
          if (animId) { cancelAnimationFrame(animId); animId = null; }
        }
      }, { rootMargin: '100px' });
      visObserver.observe(container);

      const resize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('resize', resize);

      const darkObserver = new MutationObserver(() => {
        const dark = document.documentElement.classList.contains('dark');
        bgColor.set(dark ? '#0a0a0a' : '#ffffff');
      });
      darkObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

      container._cleanup = () => {
        cancelled = true;
        renderer.domElement.removeEventListener('wheel', onWheel, { capture: true });
        renderer.domElement.removeEventListener('touchstart', onTouchStart, { capture: true });
        renderer.domElement.removeEventListener('touchmove', onTouchMove, { capture: true });
        renderer.domElement.removeEventListener('touchend', onTouchEnd, { capture: true });
        darkObserver.disconnect();
        visObserver.disconnect();
        window.removeEventListener('resize', resize);
        if (animId) cancelAnimationFrame(animId);
        clearTimeout(idleTimeout);
        controls.dispose();
        if (renderer) {
          renderer.dispose();
          if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      if (container && container._cleanup) container._cleanup();
    };
  }, [glbScene]);

  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <h2 className={styles.heading}>
          {dict.section4.title}
        </h2>
        <p className={styles.desc}>
          {dict.section4.desc}
        </p>
      </div>
      <div className={styles.right}>
        <div className={styles.canvasArea} ref={containerRef}>
          <button className={styles.posToggle} onClick={() => setPosVisible((v) => !v)} aria-label="Toggle camera position">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
          <div className={`${styles.posIndicator} ${posVisible ? '' : styles.posHidden}`} ref={posRef}>
            <span className={styles.posLabel}>CAM</span>
            <span className={styles.posVal}>X 0.00</span>
            <span className={styles.posVal}>Y 0.00</span>
            <span className={styles.posVal}>Z 0.00</span>
          </div>
          {gesture && (
            <div className={`${styles.gestureHint} ${styles.gestureHintVisible}`}>
              {gesture === 'scroll' ? (
                <>
                  <div className={styles.gestureItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
                  <span>{dict.section4.dragHint}</span>
                  </div>
                  <div className={styles.gestureDivider} />
                  <div className={styles.gestureItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/><path d="M11 8v6M8 11h6"/></svg>
                  <span>{dict.section4.zoomHintDesktop}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.gestureItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/><path d="M11 8v6M8 11h6"/></svg>
                  <span>{dict.section4.zoomHintMobile}</span>
                  </div>
                  <div className={styles.gestureDivider} />
                  <div className={styles.gestureItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
                  <span>{dict.section4.dragHint}</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className={styles.metaBar}>
          <div className={styles.specs}>
            <div className={styles.specRow}>{dict.section4.spec1}</div>
            <div className={styles.specRow}>{dict.section4.spec2}</div>
            <div className={styles.specRow}>{dict.section4.spec3}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
