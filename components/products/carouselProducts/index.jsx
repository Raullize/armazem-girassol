'use client';

import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './styles.module.css';
import ProductItem from '../productItem';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

export default function CarouselProducts({ products }) {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Slider {...sliderSettings} className={styles.slider}>
      {products.map(product => (
        <div key={product.id} className={styles.sliderItem}>
          <ProductItem
            id={product.id}
            nome={product.nome}
            preco={product.preco}
            image={product.imagem}
            unidade_medida={product.unidadeMedida}
          />
        </div>
      ))}
    </Slider>
  );
}
