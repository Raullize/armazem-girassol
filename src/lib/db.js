import mysql from 'mysql2/promise';

// Configuração para o banco de dados MySQL
const db = mysql.createPool({
  host: 'localhost', // Endereço do servidor MySQL
  user: 'root',      // Usuário do MySQL
  password: '',      // Senha do MySQL
  database: 'stockDeps', // Nome do banco de dados
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;

