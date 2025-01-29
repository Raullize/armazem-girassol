'use client'
import Link from "next/link";
import logoImg from "@/assets/images/logo.png"
import styles from "./styles.module.css"
import Image from "next/image";
import NavLink from "../nav-link/nav-link";
import InputHeader from "../inputHeader/inputHeader";
import { useState } from 'react';
import CartIcon from "../cart/cartIcon/cartIcon";
import CartModal from "../cart/cartModal/cartModal";
import CheckoutModal from "../cart/checkoutModal/checkoutModal";
import { useCheckoutLogic } from "@/hooks/useCheckoutLogic ";
import { useCartLogic } from "@/hooks/useCartLogic";


export default function Header({ children }) {
  const { cart, removeFromCart, clearCart, calculateTotalPrice, isOpen, openCart, closeCart } = useCartLogic();
  const { formData, handleInputChange, generateWhatsAppMessage } = useCheckoutLogic(cart);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  return <>

    <CartIcon cartCount={cart.length} onClick={openCart} />
    {isOpen && (
      <CartModal
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        calculateTotalPrice={calculateTotalPrice}
        onClose={closeCart}
        onCheckout={handleCheckout}
      />
    )}
    {isCheckoutModalOpen && (
      <CheckoutModal
        formData={formData}
        handleInputChange={handleInputChange}
        generateWhatsAppMessage={generateWhatsAppMessage}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    )}
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src={logoImg}
          alt="Flor logo"
          priority />
        Armazem Girassol
      </Link>

      <InputHeader />

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