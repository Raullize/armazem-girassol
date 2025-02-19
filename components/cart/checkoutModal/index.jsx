'use client';
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './styles.module.css';
import { useCart } from '@/context/CartContext';

export default function CheckoutModal({ formData, handleInputChange, onClose }) {
  const { cart, clearCart } = useCart();
  const [localFormData, setLocalFormData] = useState({
    name: formData.name || '',
    address: formData.address || '',
    neighborhood: formData.neighborhood || '',
    paymentMethod: formData.paymentMethod || '',
    deliveryOption: formData.deliveryOption || 'busca'
  });

  const [errors, setErrors] = useState({});

  const calculateTotalPrice = () => {
    if (!cart || cart.length === 0) return '0.00';
    
    return cart.reduce((total, item) => {
      const itemTotal = item.unit === 'KG'
        ? (item.price / 1000) * item.quantity
        : item.price * item.quantity;
      return total + itemTotal;
    }, 0).toFixed(2);
  };

  const formatProductList = () => {
    if (!cart || cart.length === 0) return 'Nenhum produto selecionado';
    
    return cart.map(item => {
      const totalPrice = item.unit === 'KG'
        ? ((item.price / 1000) * item.quantity).toFixed(2)
        : (item.price * item.quantity).toFixed(2);
      
      return `${item.quantity}${item.unit} - ${item.name} (R$ ${totalPrice})`;
    }).join('\n');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!localFormData.name?.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (localFormData.deliveryOption === 'frete') {
      if (!localFormData.address?.trim()) {
        newErrors.address = 'Endereço é obrigatório';
      }
      if (!localFormData.neighborhood?.trim()) {
        newErrors.neighborhood = 'Bairro é obrigatório';
      }
    }

    if (!localFormData.paymentMethod?.trim()) {
      newErrors.paymentMethod = 'Método de pagamento é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLocalInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      alert('Adicione produtos ao carrinho antes de finalizar a compra');
      return;
    }

    const isFormValid = validateForm();

    if (isFormValid) {
      const totalPrice = calculateTotalPrice();
      const productList = formatProductList();

      const message = `Olá, gostaria de realizar um pedido! Meu nome é ${localFormData.name}.

PRODUTOS:
${productList}

TOTAL: R$ ${totalPrice}
ENDEREÇO: ${localFormData.deliveryOption === 'frete' ? localFormData.address : 'Retirada no local'}
BAIRRO: ${localFormData.deliveryOption === 'frete' ? localFormData.neighborhood : '-'}
OPÇÃO DE ENTREGA: ${localFormData.deliveryOption}
MÉTODO DE PAGAMENTO: ${localFormData.paymentMethod}`;

      window.open(
        `https://wa.me/5551997572837?text=${encodeURIComponent(message)}`, 
        '_blank'
      );

      // Limpar o carrinho após o envio
      clearCart();
      onClose();
    }
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.checkoutContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.checkoutHeader}>
          <h2>Finalizar Compra</h2>
          <button aria-label="Fechar modal de checkout" className={styles.closeButton} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={localFormData.name}
              onChange={handleLocalInputChange}
              required
              placeholder="Digite seu nome completo"
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
          </label>

          {localFormData.deliveryOption === 'frete' && (
            <>
              <label>
                Endereço:
                <input
                  type="text"
                  name="address"
                  value={localFormData.address}
                  onChange={handleLocalInputChange}
                  required
                  placeholder="Rua, número, complemento"
                />
                {errors.address && <span className={styles.errorMessage}>{errors.address}</span>}
              </label>

              <label>
                Bairro:
                <input
                  type="text"
                  name="neighborhood"
                  value={localFormData.neighborhood}
                  onChange={handleLocalInputChange}
                  required
                  placeholder="Seu bairro"
                />
                {errors.neighborhood && <span className={styles.errorMessage}>{errors.neighborhood}</span>}
              </label>
            </>
          )}

          <label>
            Método de Pagamento:
            <input
              type="text"
              name="paymentMethod"
              value={localFormData.paymentMethod}
              onChange={handleLocalInputChange}
              placeholder="Ex: Dinheiro, Pix..."
              required
            />
            {errors.paymentMethod && <span className={styles.errorMessage}>{errors.paymentMethod}</span>}
          </label>

          <div className={styles.radioGroup}>
            <label 
              className={localFormData.deliveryOption === 'frete' ? styles.active : ''}
              onClick={() => handleLocalInputChange({ 
                target: { 
                  name: 'deliveryOption', 
                  value: 'frete' 
                } 
              })}
            >
              <input
                type="radio"
                name="deliveryOption"
                value="frete"
                checked={localFormData.deliveryOption === 'frete'}
                onChange={handleLocalInputChange}
              />
              <span>Frete</span>
            </label>
            <label 
              className={localFormData.deliveryOption === 'busca' ? styles.active : ''}
              onClick={() => handleLocalInputChange({ 
                target: { 
                  name: 'deliveryOption', 
                  value: 'busca' 
                } 
              })}
            >
              <input
                type="radio"
                name="deliveryOption"
                value="busca"
                checked={localFormData.deliveryOption === 'busca'}
                onChange={handleLocalInputChange}
              />
              <span>Retirada no Local</span>
            </label>
          </div>

          <div className={styles.checkoutFooter}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button 
              type="submit" 
              className={styles.whatsappButton}
              disabled={!cart || cart.length === 0}
            >
              <FaWhatsapp />
              Enviar para WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
