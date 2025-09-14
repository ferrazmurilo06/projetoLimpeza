// src/services/apiService.js

const API_URL = 'http://localhost:3000/api'; // Removido a barra extra no final para evitar //

// 1. buscar todos os produtos
export async function buscarProdutos() {
  try {
    const response = await fetch(`${API_URL}/produtos`);
    if (!response.ok) {
      throw new Error('A resposta da rede não foi boa');
    }
    const data = await response.json();
    
    // Mapeia os dados da API para o formato esperado pelo seu frontend
    return data.map(item => ({
      id: item.id,
      nome: item.nome || 'Nome não informado',
      preco: Number(item.preco) || 0,
      categoria: item.categoria || 'Sem categoria',
      descricao: item.descricao || '',
      quantidade: Number(item.quantidade) || 0, // Usando "quantidade" para o estoque
      urlImagem: item.urlImagem || 'https://placehold.co/400x400/CCCCCC/FFFFFF?text=Sem+Imagem', // Usando "urlImagem"
      status: item.status !== false
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return []; 
  }
}

// 2. buscar o produto pelo ID
export async function buscarProdutoPorId(id) {
  try {
    const response = await fetch(`${API_URL}/produtos/${id}`);
    if (!response.ok) {
      throw new Error('Produto não encontrado');
    }
    const item = await response.json();
    
    // Garante que o produto retornado tenha a estrutura correta
    return {
      id: item.id,
      nome: item.nome || 'Nome não informado',
      preco: Number(item.preco) || 0,
      categoria: item.categoria || 'Sem categoria',
      descricao: item.descricao || '',
      quantidade: Number(item.quantidade) || 0, // Usando "quantidade" para o estoque
      urlImagem: item.urlImagem || 'https://placehold.co/400x400/CCCCCC/FFFFFF?text=Sem+Imagem', // Usando "urlImagem"
      status: item.status !== false
    };
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    return null; 
  }
}

// 3. CADASTRAR um novo produto
export async function adicionarProduto(produto) {
  try {
    const response = await fetch(`${API_URL}/produtos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      
      body: JSON.stringify({
        nome: produto.nome,
        preco: parseFloat(produto.preco),
        categoria: produto.categoria,
        descricao: produto.descricao,
        quantidade: parseInt(produto.quantidade), // Usando "quantidade" para o estoque
        urlImagem: produto.urlImagem // Usando "urlImagem"
      })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao adicionar produto');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    throw error;
  }
}

// 4. ATUALIZAR um produto
export async function atualizarProduto(id, produto) {
  try {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: produto.nome,
        preco: parseFloat(produto.preco),
        categoria: produto.categoria,
        descricao: produto.descricao,
        quantidade: parseInt(produto.quantidade), // Usando "quantidade" para o estoque
        urlImagem: produto.urlImagem // Usando "urlImagem"
      })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao atualizar produto');
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao atualizar produto com ID ${id}:`, error);
    throw error;
  }
}

// 5. DELETAR um produto
export async function deletarProduto(id) {
  try {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Erro ao deletar produto');
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao deletar produto com ID ${id}:`, error);
    throw error;
  }
}