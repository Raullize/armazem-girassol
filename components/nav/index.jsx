'use client';

import React from 'react';
import NavLink from '../nav-link';
import styles from './styles.module.css';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Nav() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5519999999999', '_blank');
  };

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
          <li>
            <button onClick={handleWhatsAppClick} className={styles.whatsappButton}>
              <FaWhatsapp size={20} />
              <span>WhatsApp</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
