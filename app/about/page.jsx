'use client';

import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './styles.module.css';

export default function AboutPage() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5500000000000', '_blank');
  };

  return (
    <main className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.imageContainer}>
          <Image
            src="/assets/images/armazem.webp"
            alt="Armazém Girassol"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className={styles.storeImage}
          />
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>Armazém Girassol</h1>
            <p className={styles.heroSubtitle}>Qualidade e tradição em cada produto</p>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Nossa História</h2>
          <div className={styles.card}>
            <p className={styles.text}>
              O Armazém Girassol nasceu do sonho de oferecer produtos de qualidade a preços justos para nossa comunidade. 
              Com anos de experiência no mercado, nos especializamos em produtos naturais, grãos, cereais e produtos a granel.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Nossa Missão</h2>
          <div className={styles.card}>
            <p className={styles.text}>
              Proporcionar aos nossos clientes uma experiência única de compra, oferecendo produtos selecionados, 
              atendimento personalizado e preços competitivos.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Nossos Valores</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3>Qualidade</h3>
              <p>Produtos selecionados e de primeira linha</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Atendimento</h3>
              <p>Excelência e atenção aos detalhes</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Sustentabilidade</h3>
              <p>Compromisso com o meio ambiente</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Transparência</h3>
              <p>Honestidade em todas as relações</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Localização</h2>
          <div className={styles.card}>
            <div className={styles.contactInfo}>
              <p>Rua Principal, 123 - Centro</p>
              <p>Horário: Segunda a Sábado, das 8h às 18h</p>
            </div>
          </div>
        </div>
      </section>

      <button onClick={handleWhatsAppClick} className={styles.whatsappButton}>
        <FaWhatsapp size={24} />
        <span>Fale Conosco</span>
      </button>
    </main>
  );
}
