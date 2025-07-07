// Serviço para gerenciar dados dos shampoos
class ShampooService {
  constructor() {
    this.baseUrl = '/data/shampoos.json';
    this.produtos = [];
  }

  // Carregar produtos do JSON
  async carregarProdutos() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error('Erro ao carregar produtos');
      }
      const data = await response.json();
      this.produtos = data.produtos;
      return this.produtos;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      // Fallback: usar dados do localStorage se existirem
      const produtosLocal = localStorage.getItem('shampoos');
      if (produtosLocal) {
        this.produtos = JSON.parse(produtosLocal);
        return this.produtos;
      }
      return [];
    }
  }

  // Salvar produtos no localStorage (simula salvar no "banco")
  salvarProdutos() {
    localStorage.setItem('shampoos', JSON.stringify(this.produtos));
    // Em um projeto real, aqui faria um POST/PUT para uma API
    console.log('Produtos salvos:', this.produtos);
  }

  // Buscar todos os produtos
  async buscarTodos() {
    if (this.produtos.length === 0) {
      await this.carregarProdutos();
    }
    return this.produtos;
  }

  // Buscar produto por ID
  async buscarPorId(id) {
    const produtos = await this.buscarTodos();
    return produtos.find(produto => produto.id === parseInt(id));
  }

  // Adicionar novo produto
  async adicionarProduto(novoProduto) {
    const produtos = await this.buscarTodos();
    const novoId = Math.max(...produtos.map(p => p.id), 0) + 1;
    
    const produto = {
      id: novoId,
      ...novoProduto,
      preco: parseFloat(novoProduto.preco),
      estoque: parseInt(novoProduto.estoque)
    };

    this.produtos.push(produto);
    this.salvarProdutos();
    return produto;
  }

  // Atualizar produto
  async atualizarProduto(id, produtoAtualizado) {
    const produtos = await this.buscarTodos();
    const index = produtos.findIndex(produto => produto.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Produto não encontrado');
    }

    this.produtos[index] = {
      ...this.produtos[index],
      ...produtoAtualizado,
      id: parseInt(id),
      preco: parseFloat(produtoAtualizado.preco),
      estoque: parseInt(produtoAtualizado.estoque)
    };

    this.salvarProdutos();
    return this.produtos[index];
  }

  // Remover produto
  async removerProduto(id) {
    const produtos = await this.buscarTodos();
    const index = produtos.findIndex(produto => produto.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Produto não encontrado');
    }

    const produtoRemovido = this.produtos.splice(index, 1)[0];
    this.salvarProdutos();
    return produtoRemovido;
  }

  // Buscar produtos por categoria
  async buscarPorCategoria(categoria) {
    const produtos = await this.buscarTodos();
    return produtos.filter(produto => 
      produto.categoria.toLowerCase().includes(categoria.toLowerCase())
    );
  }

  // Buscar produtos por nome
  async buscarPorNome(nome) {
    const produtos = await this.buscarTodos();
    return produtos.filter(produto => 
      produto.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  // Buscar produtos com estoque baixo
  async buscarEstoqueBaixo(limite = 10) {
    const produtos = await this.buscarTodos();
    return produtos.filter(produto => produto.estoque <= limite);
  }

  // Obter categorias únicas
  async obterCategorias() {
    const produtos = await this.buscarTodos();
    return [...new Set(produtos.map(produto => produto.categoria))];
  }

  // Obter marcas únicas
  async obterMarcas() {
    const produtos = await this.buscarTodos();
    return [...new Set(produtos.map(produto => produto.marca))];
  }
}

// Instância única do serviço
const shampooService = new ShampooService();

export default shampooService;
