import styles from './Logo.module.scss';

export default function Logo({ className }) {
  return (
    <svg
      className={`${styles.logo}${className ? ' ' + className : ''}`}
      viewBox="0 0 190.64329 51.464811"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m -1305.66,-109.66297 -50.9495,26.45773 h 0.1123 l -48.16,25.007081 h 58.8321 l 48.1596,-25.007081 h 32.7003 l 50.9499,-26.45773 z m 40.6962,26.45773 v 25.007081 h 50.9499 V -83.20524 Z"
        transform="translate(1404.6571,109.66297)"
      />
    </svg>
  );
}
