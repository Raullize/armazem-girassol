import { useState } from 'react';

export const useCheckoutLogic = (cart) => {
  const [formData, setFormData] = useState({
    address: '',
    neighborhood: '',
    paymentMethod: '',
    deliveryOption: 'frete',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateWhatsAppMessage = () => {
    // Cálculo total do carrinho com correção para gramas
    const total = cart.reduce((acc, item) => {
      const itemTotal = item.unit === 'g'
        ? (item.price / 1000) * item.quantity // Corrigido para dividir por 1000 ao invés de 100
        : item.price * item.quantity;         
      return acc + itemTotal;
    }, 0).toFixed(2);
  
    // Detalhes do produto para WhatsApp
    const productDetails = cart
      .map((item) => {
        const itemTotal = item.unit === 'g'
          ? ((item.price / 1000) * item.quantity).toFixed(2) // Correção aqui também
          : (item.price * item.quantity).toFixed(2);
        return `- ${item.quantity}${item.unit} ${item.name}: R$ ${itemTotal}`;
      })
      .join('\n');
  
    // Gerar a mensagem final para WhatsApp
    return `Olá, gostaria de realizar uma compra:\n\nPRODUTOS:\n${productDetails}\n\nTOTAL: R$ ${total}\nENDEREÇO: ${formData.address}\nBAIRRO: ${formData.neighborhood}\nOPÇÃO DE ENTREGA: ${formData.deliveryOption}\nMÉTODO DE PAGAMENTO: ${formData.paymentMethod}`;
  };

  return {
    formData,
    handleInputChange,
    generateWhatsAppMessage,
  };
};
