import styles from './Section3.module.scss';

export default function Section3() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <img src="/mach.webp" alt="" className={styles.image} loading="eager" decoding="async" />
        <div className={styles.overlay} />
      </div>
    </section>
  );
}
