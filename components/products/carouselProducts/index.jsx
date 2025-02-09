'use client';

import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './styles.module.css';
import ProductItem from '../productItem';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} ${styles.arrow} ${styles.nextArrow}`} onClick={onClick}>
      <FiChevronRight />
    </div>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} ${styles.arrow} ${styles.prevArrow}`} onClick={onClick}>
      <FiChevronLeft />
    </div>
  );
}

export default function CarouselProducts({ products }) {
  const sliderSettings = {
    dots: true,
    infinite: products.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className={styles.sliderContainer}>
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
    </div>
  );
}
