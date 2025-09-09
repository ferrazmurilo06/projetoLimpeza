
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ROTA 1: Listar todas as categorias
router.get('/', async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias.' });
  }
});

// ROTA 2: Buscar categoria por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await prisma.categoria.findUnique({ where: { id: parseInt(id) } });
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categoria.' });
  }
});

// ROTA 3: Criar nova categoria
router.post('/', async (req, res) => {
  try {
    const newCategoria = await prisma.categoria.create({ data: req.body });
    res.status(201).json(newCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar categoria.' });
  }
});

// ROTA 4: Editar categoria
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategoria = await prisma.categoria.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(updatedCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar categoria.' });
  }
});

// ROTA 5: Deletar categoria
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.categoria.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ mensagem: 'Categoria deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deleter categoria.' });
  }
});

module.exports = router;