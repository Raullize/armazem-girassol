'use client';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.css';

export default function CheckoutModal({ formData, handleInputChange, generateWhatsAppMessage, onClose }) {
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.checkoutContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.checkoutHeader}>
          <h2>Finalizar Compra</h2>
          <button aria-label="Fechar modal de checkout" className={styles.closeButton} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form className={styles.form}>
          <label>
            Endereço:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Bairro:
            <input
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Método de Pagamento:
            <input
              type="text"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              placeholder="Ex: Dinheiro, Pix..."
              required
            />
          </label>

          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="deliveryOption"
                value="frete"
                checked={formData.deliveryOption === 'frete'}
                onChange={handleInputChange}
              />
              Frete
            </label>
            <label>
              <input
                type="radio"
                name="deliveryOption"
                value="busca"
                checked={formData.deliveryOption === 'busca'}
                onChange={handleInputChange}
              />
              Retirada no Local
            </label>
          </div>
        </form>

        <div className={styles.checkoutFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <a
            href={`https://wa.me/+5551999832724?text=${encodeURIComponent(generateWhatsAppMessage())}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappButton}
          >
            Enviar para WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
