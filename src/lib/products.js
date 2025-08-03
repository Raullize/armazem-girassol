import db from './db';

export async function getProducts(categoryId = null) {
  try {
    if (categoryId) {
      const [rows] = await db.query('SELECT * FROM produtos WHERE idCategoria = ?', [categoryId]);
      return rows;
    }

    const [rows] = await db.query('SELECT * FROM produtos');
    return rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Could not fetch products');
  }
}


export async function getProduct(id) {
  try {
    const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0]; // Retorna o primeiro produto encontrado
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Could not fetch product');
  }
}
