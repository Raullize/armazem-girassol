import { useCart } from '@/context/CartContext';

export const useCartLogic = () => {
  const { cart, removeFromCart, clearCart, isOpen, setIsOpen } = useCart();

  // Função para calcular o preço total
  const calculateTotalPrice = () => {
    return cart
      .reduce((acc, item) => {
        const itemTotal = item.unit === 'g'
          ? (item.price / 100) * item.quantity // Ajusta para gramas
          : item.price * item.quantity;        // Preço direto para kg ou unidades

        return acc + itemTotal;
      }, 0)
      .toFixed(2); // Formatação com 2 casas decimais
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return {
    cart,
    removeFromCart,
    clearCart,
    calculateTotalPrice,
    isOpen,
    openCart,
    closeCart,
  };
};
