'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

import img1 from '@/assets/images/img1.jpg';
import img2 from '@/assets/images/img2.jpg';
import img3 from '@/assets/images/img3.jpg';
import img4 from '@/assets/images/img4.jpg';

const images = [
  { image: img1, alt: 'A delicious, juicy burger' },
  { image: img2, alt: 'A delicious, spicy curry' },
  { image: img3, alt: 'Steamed dumplings' },
  { image: img4, alt: 'Mac and cheese' },
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