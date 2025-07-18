const API_URL = 'https://687965fc63f24f1fdca1e29c.mockapi.io/data/produtos';

// 1. buscar todos os produtos
export async function buscarProdutos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('A resposta da rede não foi boa');
    }
    const data = await response.json();
    
    return data.map(item => ({
      id: item.id,
      nome: item.nome || 'Nome não informado',
      preco: Number(item.preco) || 0,
      categoria: item.categoria || 'Sem categoria',
      descricao: item.descricao || '',
      estoque: Number(item.estoque) || 0,
      imagem: item.imagem || 'https://placehold.co/400x400/CCCCCC/FFFFFF?text=Sem+Imagem',
      disponivel: item.disponivel !== false 
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return []; 
  }
}

// 2. buscar o produto pelo ID
export async function buscarProdutoPorId(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
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
      estoque: Number(item.estoque) || 0,
      imagem: item.imagem || 'https://placehold.co/400x400/CCCCCC/FFFFFF?text=Sem+Imagem',
      disponivel: item.disponivel !== false
    };
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    return null; 
  }
}

// 3. CADASTRAR um novo produto
export async function adicionarProduto(produto) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      
      body: JSON.stringify({
        nome: produto.nome,
        preco: parseFloat(produto.preco),
        categoria: produto.categoria,
        descricao: produto.descricao,
        estoque: parseInt(produto.estoque),
        imagem: produto.imagem,
        disponivel: produto.disponivel
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
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      // Envia apenas os campos que o nosso projeto usa
      body: JSON.stringify({
        nome: produto.nome,
        preco: parseFloat(produto.preco),
        categoria: produto.categoria,
        descricao: produto.descricao,
        estoque: parseInt(produto.estoque),
        imagem: produto.imagem,
        disponivel: produto.disponivel
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
    const response = await fetch(`${API_URL}/${id}`, {
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
