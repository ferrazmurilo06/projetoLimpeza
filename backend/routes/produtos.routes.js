const express = require('express');

const router = express.Router();

// Importando o "conector" com o banco de dados que o Prisma nos dá
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ROTA 1: Listar todos os produtos (GET /api/produtos)
// Usamos async/await porque a busca no banco de dados pode demorar um pouquinho
router.get('/', async (req, res) => {
  try {
    // Pedimos ao Prisma: "Encontre todos os registros na tabela Produto"
    const produtos = await prisma.produto.findMany();
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ops, algo deu errado no nosso servidor!' });
  }
});

// ROTA 2: Listar um produto específico (GET /api/produtos/:id)
// (Deixei o esqueleto pronto pra você ou a Duda preencherem depois!)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.send(`Buscar produto com ID: ${id}`);
});

// Outras rotas (POST, PUT, DELETE) virão aqui...

module.exports = router;