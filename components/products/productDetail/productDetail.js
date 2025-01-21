import Image from 'next/image';
import styles from './styles.module.css';
import { FiShoppingCart } from 'react-icons/fi';

export default function ProductDetail({ product }) {
  const imageSrc = product.image || '/noImage.png';

  return (
    <div className={styles.productContainer}>
      {/* Imagem e Miniatura */}
      <div className={styles.imageSection}>
        <div className={styles.thumbnail}>
          <Image src={imageSrc} alt={product.nome} width={60} height={60} />
        </div>
        <Image src={imageSrc} alt={product.nome} className={styles.mainImage} width={500} height={500} />
      </div>

      {/* Informações do Produto */}
      <div className={styles.productInfo}>
        <span className={styles.badge}>Disponível!</span>
        <h1 className={styles.productTitle}>{product.nome}</h1>
        <hr></hr>
        <p className={styles.productDescription}><strong>Descrição:</strong> {product.descricao}</p>

        <p className={styles.productPrice}>R$ {product.preco.toFixed(2)}</p>


        {/* Seletor de Quantidade e Botão de Compra */}
        <div className={styles.purchaseSection}>
          <input type="number" min="1" defaultValue="1" className={styles.quantityInput} />
          <button className={styles.buyButton}>
              <FiShoppingCart className={styles.icon} /> Adicionar
            </button>
        </div>
      </div>
    </div>
  );
}

