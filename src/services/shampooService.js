// Arquivo mockapi.js - API service para produtos
const API_URL = 'https://687965fc63f24f1fdca1e29c.mockapi.io/data/produtos';

// Função para buscar todos os produtos
export async function buscarProdutos() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    // Converte os dados para o formato do projeto
    return data.map(item => ({
      id: item.id,
      nome: item.nome || item.name,
      preco: item.preco || item.price || 0,
      categoria: item.categoria || 'Sem categoria',
      descricao: item.descricao || '',
      estoque: item.estoque || 10,
      imagem: item.imagem || '',
      marca: item.marca || '',
      tipo: item.tipo || '',
      tamanho: item.tamanho || '',
      disponivel: item.disponivel !== false
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}

// Cadastrar novo produto
export async function adicionarProduto(produto) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: produto.nome,
        preco: parseFloat(produto.preco),
        categoria: produto.categoria,
        descricao: produto.descricao,
        imagem: produto.imagem,
        marca: produto.marca,
        tipo: produto.tipo,
        tamanho: produto.tamanho,
        estoque: parseInt(produto.estoque),
        disponivel: produto.disponivel !== false
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

// Buscar produto por ID
export async function buscarProdutoPorId(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error('Produto não encontrado');
    }
    
    const item = await response.json();
    
    return {
      id: item.id,
      nome: item.nome || item.name,
      preco: item.preco || item.price || 0,
      categoria: item.categoria || 'Sem categoria',
      descricao: item.descricao || '',
      estoque: item.estoque || 10,
      imagem: item.imagem || '',
      marca: item.marca || '',
      tipo: item.tipo || '',
      tamanho: item.tamanho || '',
      disponivel: item.disponivel !== false
    };
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
  }
}

// Atualizar produto
export async function atualizarProduto(id, produto) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: produto.nome,
        preco: parseFloat(produto.preco),
        categoria: produto.categoria,
        descricao: produto.descricao,
        imagem: produto.imagem,
        marca: produto.marca,
        tipo: produto.tipo,
        tamanho: produto.tamanho,
        estoque: parseInt(produto.estoque),
        disponivel: produto.disponivel !== false
      })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao atualizar produto');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
}

// Deletar produto
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
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
}

// Buscar produtos por categoria
export async function buscarPorCategoria(categoria) {
  try {
    const produtos = await buscarProdutos();
    return produtos.filter(produto => 
      produto.categoria.toLowerCase().includes(categoria.toLowerCase())
    );
  } catch (error) {
    console.error('Erro ao buscar por categoria:', error);
    return [];
  }
}

// Buscar produtos por nome
export async function buscarPorNome(nome) {
  try {
    const produtos = await buscarProdutos();
    return produtos.filter(produto => 
      produto.nome.toLowerCase().includes(nome.toLowerCase())
    );
  } catch (error) {
    console.error('Erro ao buscar por nome:', error);
    return [];
  }
}

// Buscar produtos com estoque baixo
export async function buscarEstoqueBaixo(limite = 10) {
  try {
    const produtos = await buscarProdutos();
    return produtos.filter(produto => produto.estoque <= limite);
  } catch (error) {
    console.error('Erro ao buscar estoque baixo:', error);
    return [];
  }
}

// Obter categorias únicas
export async function obterCategorias() {
  try {
    const produtos = await buscarProdutos();
    return [...new Set(produtos.map(produto => produto.categoria).filter(Boolean))];
  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    return [];
  }
}

// Obter marcas únicas
export async function obterMarcas() {
  try {
    const produtos = await buscarProdutos();
    return [...new Set(produtos.map(produto => produto.marca).filter(Boolean))];
  } catch (error) {
    console.error('Erro ao obter marcas:', error);
    return [];
  }
}