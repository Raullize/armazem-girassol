'use client';

import styles from './styles.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={path === href || (href !== '/' && path.startsWith(href)) ? `${styles.link} ${styles.active}` : styles.link}
    >
      {children}
    </Link>
  );
}
