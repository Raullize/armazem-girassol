import Link from "next/link";
import logoImg from "@/assets/images/logo.png"
import styles from "./styles.module.css"
import Image from "next/image";
import NavLink from "../nav-link/nav-link";
import { FiSearch } from "react-icons/fi"; 

export default function Header() {
  return <>
  
  <header className={styles.header}>
    <Link href="/" className={styles.logo}>
      <Image 
      src={logoImg}
      alt="Flor logo"
      priority />
      Armazem Girassol
    </Link>

    <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          placeholder="Pesquisar por..."
        />
        <button className={styles.searchButton}>
          <FiSearch size={20} />
        </button>
      </div>

    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink href="/products">Nossos produtos</NavLink>
        </li>
        <li>
        <NavLink href="/contact">Entre em contato</NavLink>
        </li>
      </ul>
    </nav>
    
  </header>
  </>
  
}