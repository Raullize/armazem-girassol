'use client';

import React from 'react';
import NavLink from '../nav-link';
import styles from './styles.module.css';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <button
        className={`${styles.menuButton} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={30} color="white" /> : <Menu size={30} color="white" />}
      </button>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <ul>
          <li>
            <NavLink href="/">Início</NavLink>
          </li>
          <li>
            <NavLink href="/products">Nossos produtos</NavLink>
          </li>
          <li>
            <NavLink href="/about">Sobre Nós</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
