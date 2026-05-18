import { api } from './api';
import { FeaturedCollection, Product } from '@/types';

export type FeaturedCollectionWithProducts = FeaturedCollection & {
  products: Product[];
};

export const featuredCollectionService = {
  /**
   * Busca todas as coleções em destaque, já com os produtos vinculados.
   */
  getAll: (): Promise<FeaturedCollectionWithProducts[]> => {
    return api.get<FeaturedCollectionWithProducts[]>('/featured-collections');
  },
};
