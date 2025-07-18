import { useState, useEffect, useCallback } from 'react';
import shampooService from '../services/shampooService';

// Hook personalizado para gerenciar dados dos shampoos
export const useShampoos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar todos os produtos
  const carregarProdutos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const produtosCarregados = await shampooService.buscarTodos();
      setProdutos(produtosCarregados);
    } catch (err) {
      setError('Erro ao carregar produtos: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Adicionar produto
  const adicionarProduto = useCallback(async (novoProduto) => {
    setLoading(true);
    setError(null);
    try {
      const produto = await shampooService.adicionarProduto(novoProduto);
      setProdutos(prev => [...prev, produto]);
      return produto;
    } catch (err) {
      setError('Erro ao adicionar produto: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar produto
  const atualizarProduto = useCallback(async (id, produtoAtualizado) => {
    setLoading(true);
    setError(null);
    try {
      const produto = await shampooService.atualizarProduto(id, produtoAtualizado);
      setProdutos(prev => prev.map(p => p.id === parseInt(id) ? produto : p));
      return produto;
    } catch (err) {
      setError('Erro ao atualizar produto: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Remover produto
  const removerProduto = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await shampooService.removerProduto(id);
      setProdutos(prev => prev.filter(p => p.id !== parseInt(id)));
    } catch (err) {
      setError('Erro ao remover produto: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar produtos
  const buscarProdutos = useCallback(async (termo) => {
    setLoading(true);
    setError(null);
    try {
      const resultados = await shampooService.buscarPorNome(termo);
      return resultados;
    } catch (err) {
      setError('Erro ao buscar produtos: ' + err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtrar por categoria
  const filtrarPorCategoria = useCallback(async (categoria) => {
    setLoading(true);
    setError(null);
    try {
      const resultados = await shampooService.buscarPorCategoria(categoria);
      return resultados;
    } catch (err) {
      setError('Erro ao filtrar produtos: ' + err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar produtos quando o hook é usado
  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  return {
    produtos,
    loading,
    error,
    carregarProdutos,
    adicionarProduto,
    atualizarProduto,
    removerProduto,
    buscarProdutos,
    filtrarPorCategoria
  };
};

// Hook para buscar um produto específico
export const useShampoo = (id) => {
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const carregarProduto = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const produtoCarregado = await shampooService.buscarPorId(id);
      setProduto(produtoCarregado);
    } catch (err) {
      setError('Erro ao carregar produto: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    carregarProduto();
  }, [carregarProduto]);

  return {
    produto,
    loading,
    error,
    carregarProduto
  };
};
