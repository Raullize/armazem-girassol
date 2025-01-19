import db from './db';

export async function getTopProductsByCategory() {
  const query = `
    WITH RankedProducts AS (
        SELECT 
            p.id AS idProduto,
            p.nome AS nomeProduto,
            p.idCategoria AS idCategoria,
            c.nome AS nomeCategoria,
            p.preco AS precoProduto,
            p.imagem AS imagemProduto,
            COALESCE(SUM(s.quantidade), 0) AS totalSaidas,
            ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY SUM(s.quantidade) DESC) AS ranking
        FROM produtos p
        LEFT JOIN categorias c ON p.idCategoria = c.id
        LEFT JOIN saidas s ON s.idProdutos = p.id
        GROUP BY p.id, c.id
    )
    SELECT 
        idProduto,
        nomeProduto,
        idCategoria,
        nomeCategoria,
        precoProduto,
        imagemProduto,
        totalSaidas
    FROM RankedProducts
    WHERE ranking <= 8
    ORDER BY idCategoria, ranking;
  `;

  try {
    const [rows] = await db.query(query);

    // Agrupar os produtos por categoria
    const groupedProducts = rows.reduce((acc, product) => {
      const { idCategoria, nomeCategoria } = product;

      if (!acc[idCategoria]) {
        acc[idCategoria] = {
          nomeCategoria: nomeCategoria,
          produtos: [],
        };
      }

      acc[idCategoria].produtos.push({
        id: product.idProduto,
        nome: product.nomeProduto,
        preco: product.precoProduto,
        imagem: product.imagemProduto,
        totalSaidas: product.totalSaidas,
      });

      return acc;
    }, {});

    return groupedProducts;  // Retorna um objeto com produtos agrupados por categoria
  } catch (error) {
    console.error('Error fetching top products by category:', error);
    throw new Error('Could not fetch top products by category');
  }
}
