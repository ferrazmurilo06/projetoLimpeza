const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ROTA 0: Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany();
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Algo deu errado no nosso servidor!' });
  }
});

// ROTA 1: Listar todos os produtos com filtros
router.get('/', async (req, res) => {
  // Pega os filtros que podem vir na URL (ex: /api/produtos?nome=Detergente&status=ativo)
  const { nome, status, categoria } = req.query;

  try {
    // Cria um objeto 'where' que vai ser o nosso filtro
    const where = {};
    if (nome) {
      where.nome = { contains: nome, mode: 'insensitive' }; // Busca por parte do nome, sem diferenciar maiúsculas
    }
    if (status) {
      where.status = status;
    }
    if (categoria) {
      where.categoria = categoria;
    }

    // Pede ao Prisma para encontrar os produtos que batem com o nosso filtro
    const produtos = await prisma.produto.findMany({ where });
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Algo deu errado no nosso servidor!' });
  }
});

// ROTA 2: Listar um produto específico pelo ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const produto = await prisma.produto.findUnique({
      where: { id: id },
    });

    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Algo deu errado no nosso servidor!' });
  }
});

// ROTA 3: Adicionar um novo produto
router.post('/', async (req, res) => {

  const { urlImagem, nome, descricao, preco, categoria, quantidade, status } = req.body;

  try {

    const novoProduto = await prisma.produto.create({
      data: {
        urlImagem,
        nome,
        descricao,
        preco,
        categoria,
        quantidade,
        status,
      },
    });

    res.status(201).json(novoProduto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Algo deu errado no nosso servidor!' });
  }
});

// ROTA 4: Editar um produto existente
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const novosDados = req.body;

  try {
    const produtoAtualizado = await prisma.produto.update({
      where: { id: id },
      data: novosDados,
    });
    res.json(produtoAtualizado);
  } catch (error) {

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Produto não encontrado para edição.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Algo deu errado no nosso servidor!' });
  }
});

// ROTA 5: Deletar um produto
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.produto.delete({
      where: { id: id },
    });

    res.status(204).send();
  } catch (error) {

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Produto não encontrado para exclusão.' });
    }
    console.error(error);
    res.status(500).json({ error: ' Algo deu errado no nosso servidor!' });
  }
});

module.exports = router;

