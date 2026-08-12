import styles from './ProductViewer3D.module.scss';

export default function ProductViewer3D() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <img src="/mach.webp" alt="" className={styles.image} loading="eager" decoding="async" />
        <div className={styles.overlay} />
      </div>
    </section>
  );
}
