import NavLink from '../nav-link/nav-link';
import styles from './styles.module.css';
import { Menu, X } from 'lucide-react';


export default function Nav({ menuOpen, setMenuOpen }) {
  return (
    <>
      <button
        className={`${styles.menuButton} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label='Toggle menu'
      >
        {menuOpen ? <X size={30} color='white' /> : <Menu size={30} color='white' />}
      </button>
      <nav   className={`${styles.nav} ${menuOpen ? styles.open : ''}`} style={{ display: menuOpen || window.innerWidth > 768 ? 'block' : 'none' }}>
        <ul>
          <li>
            <NavLink href='/products'>Nossos produtos</NavLink>
          </li>
          <li>
            <NavLink href='/contact'>Entre em contato</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
