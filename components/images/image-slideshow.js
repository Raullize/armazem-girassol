'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

import imgSunFlower from '@/assets/images/sunflowers.webp';
import imgArmazem from '@/assets/images/armazem.webp';
import imgBalcao from '@/assets/images/balcao.webp';
import imgPrateleira from '@/assets/images/prateleira.webp';

const images = [
  { image: imgArmazem, alt: 'Imagem do local armazemGirassol' },
  { image: imgBalcao, alt: 'Foto do balcão do local' },
  { image: imgPrateleira, alt: 'Foto da prateleira do armazemGirassol' },
  { image: imgSunFlower, alt: 'Imagem de girassois' },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? styles.active : ''}
          alt={image.alt}
        />
      ))}
    </div>
  );
}