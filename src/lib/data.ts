import fs from 'fs';
import path from 'path';
import { DbSchema, Product, Category, FeaturedCollection } from '@/types';

const dataPath = path.join(process.cwd(), 'data', 'db.json');

export async function getDbData(): Promise<DbSchema> {
  const fileContents = await fs.promises.readFile(dataPath, 'utf8');
  return JSON.parse(fileContents);
}

export async function getCategories(): Promise<Category[]> {
  const db = await getDbData();
  return db.categories;
}

export async function getProducts(): Promise<Product[]> {
  const db = await getDbData();
  return db.products;
}

export async function getFeaturedCollections(): Promise<(FeaturedCollection & { products: Product[] })[]> {
  const db = await getDbData();
  
  return db.featuredCollections.map(collection => {
    const products = db.products.filter(p => collection.productIds.includes(p.id));
    return {
      ...collection,
      products
    };
  });
}
