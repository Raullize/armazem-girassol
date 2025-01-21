import { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import styles from './styles.module.css';

export default function PriceRangeSlider({ products, onFilterChange }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedRange, setSelectedRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.preco);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setSelectedRange([min, max]);
    }
  }, [products]);

  const handleRangeChange = (value) => {
    setSelectedRange(value);
    onFilterChange(value[0], value[1]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>Faixa de preço</h3>
      <ReactSlider
        className={styles.horizontalSlider}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
        min={minPrice}
        max={maxPrice}
        value={selectedRange}
        onChange={handleRangeChange}
        minDistance={1}
      />
      <div className={styles.priceLabels}>
        <span className={`${styles.price} ${styles.priceMin}`}>R$ {selectedRange[0].toFixed(2)}</span>
        <span className={`${styles.price} ${styles.priceMax}`}>R$ {selectedRange[1].toFixed(2)}</span>
      </div>
    </div>
  );
}
