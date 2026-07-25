'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ModelContext = createContext({ ready: true, glbScene: null });

export function useModel() {
  return useContext(ModelContext);
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });
}

export function ModelProvider({ children }) {
  const [state, setState] = useState({ ready: false, glbScene: null });
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    const imagesReady = Promise.all([
      preloadImage('/1.webp'),
      preloadImage('/2.webp'),
      preloadImage('/mach.webp'),
      preloadImage('/gallery/proses_design.webp'),
      preloadImage('/gallery/proses_rangkaian_elektronika.webp'),
      preloadImage('/gallery/interactive_chair_demo.webp'),
      preloadImage('/gallery/interactive_chair_demo_alt.webp'),
      preloadImage('/gallery/interactive_chair_instalation.webp'),
      preloadImage('/gallery/departemen_cyber_aau.webp'),
      preloadImage('/product/interactive-chair.webp'),
      preloadImage('/product/smartboard-interactive.webp'),
      preloadImage('/product/led-display-light.webp'),
      preloadImage('/product/imsi-cather.webp'),
      preloadImage('/product/gsm-lte-bts.webp'),
      preloadImage('/product/gsm-jammer.webp'),
    ]);

    const threeReady = Promise.all([
      import('three'),
      import('three/examples/jsm/controls/OrbitControls.js'),
      import('three/examples/jsm/loaders/GLTFLoader.js'),
      import('three/examples/jsm/loaders/DRACOLoader.js'),
      import('three/examples/jsm/environments/RoomEnvironment.js'),
    ]);

    const modelReady = new Promise(async (resolve) => {
      try {
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        loader.load(
          '/new.glb',
          (gltf) => {
            dracoLoader.dispose();
            resolve(gltf.scene);
          },
          undefined,
          () => {
            dracoLoader.dispose();
            resolve(null);
          }
        );
      } catch {
        resolve(null);
      }
    });

    Promise.all([imagesReady, modelReady, threeReady]).then(([, glbScene]) => {
      if (cancelled) return;
      setState({ ready: true, glbScene });
    });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!state.ready) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase('revealing');
        document.documentElement.classList.add('page-revealed');

        setTimeout(() => {
          setPhase('done');
        }, 1200);
      });
    });
  }, [state.ready]);

  return (
    <ModelContext.Provider value={state}>
      {children}
      {phase !== 'done' && (
        <div className={`modelLoader ${phase === 'revealing' ? 'modelLoaderSlide' : ''}`}>
          <div className="modelLoaderInner">
            <div className="modelLoaderSpinner" />
            <span className="modelLoaderText">Loading...</span>
          </div>
        </div>
      )}
    </ModelContext.Provider>
  );
}
