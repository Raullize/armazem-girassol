import db from './db';

export async function getCategories() {
  try {
    const [rows] = await db.query('SELECT * FROM categorias');
    return rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Could not fetch products');
  }
}

