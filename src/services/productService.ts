import { api } from './api';
import { Product } from '@/types';

export const productService = {
  /**
   * Busca todos os produtos disponíveis.
   */
  getAll: (): Promise<Product[]> => {
    return api.get<Product[]>('/products');
  },
};
