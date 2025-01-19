"use client"; // Transforma o componente em um Client Component

import React from 'react';
import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './carouselProducts.module.css';
import ProductItem from "../products/product-item";

const Slider = dynamic(() => import('react-slick'), {
  ssr: false, 
});

// Customização das setas de navegação
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.arrow}`}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.arrow}`}
      onClick={onClick}
    />
  );
}

export default function CarouselProducts({ products }) {
  // Configurações do carrossel
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // Seta para próximo
    prevArrow: <PrevArrow />, // Seta para anterior
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...sliderSettings} className={styles.slider}>
      {products.map((product) => (
        <div key={product.id} className={styles.sliderItem}>
          <ProductItem
            nome={product.nome}
            slug={`/products/${product.id}`}
            preco={product.preco}
            image={product.imagem}
          />
        </div>
      ))}
    </Slider>
  );
}