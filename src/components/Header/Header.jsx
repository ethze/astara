import Navbar from '@/components/Navbar/Navbar';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Navbar />
    </header>
  );
}
