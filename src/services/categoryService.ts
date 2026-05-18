import { api } from './api';
import { Category } from '@/types';

export const categoryService = {
  /**
   * Busca todas as categorias disponíveis.
   */
  getAll: (): Promise<Category[]> => {
    return api.get<Category[]>('/categories');
  },
};
