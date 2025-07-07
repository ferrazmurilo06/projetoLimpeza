// Serviço simples para gerenciar dados dos shampoos

class ShampooBanco {
  constructor() {
    this.dados = [];
    this.proximoId = 1;
  }

  // Carregar dados do JSON
  async carregarDados() {
    try {
      const response = await fetch('/dados.json');
      const data = await response.json();
      this.dados = data.produtos;
      
      // Atualizar próximo ID
      if (this.dados.length > 0) {
        this.proximoId = Math.max(...this.dados.map(p => p.id)) + 1;
      }
      
      return this.dados;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      return [];
    }
  }

  // Buscar todos os produtos
  buscarTodos() {
    return this.dados;
  }

  // Buscar por ID
  buscarPorId(id) {
    return this.dados.find(produto => produto.id === parseInt(id));
  }

  // Buscar por categoria
  buscarPorCategoria(categoria) {
    return this.dados.filter(produto => 
      produto.categoria.toLowerCase().includes(categoria.toLowerCase())
    );
  }

  // Buscar por nome
  buscarPorNome(nome) {
    return this.dados.filter(produto => 
      produto.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  // Adicionar novo produto
  adicionar(produto) {
    const novoShampoo = {
      ...produto,
      id: this.proximoId++
    };
    this.dados.push(novoShampoo);
    this.salvarDados(); // Simula salvamento
    return novoShampoo;
  }

  // Atualizar produto
  atualizar(id, dadosAtualizados) {
    const index = this.dados.findIndex(produto => produto.id === parseInt(id));
    if (index !== -1) {
      this.dados[index] = { ...this.dados[index], ...dadosAtualizados };
      this.salvarDados(); // Simula salvamento
      return this.dados[index];
    }
    return null;
  }

  // Deletar produto
  deletar(id) {
    const index = this.dados.findIndex(produto => produto.id === parseInt(id));
    if (index !== -1) {
      const produtoRemovido = this.dados.splice(index, 1)[0];
      this.salvarDados(); // Simula salvamento
      return produtoRemovido;
    }
    return null;
  }

  // Simular salvamento (em um projeto real, enviaria para servidor)
  salvarDados() {
    console.log('Dados atualizados:', this.dados);
    // Aqui você enviaria os dados para um servidor ou API
    // Por enquanto, só mostra no console
  }

  // Estatísticas simples
  obterEstatisticas() {
    const total = this.dados.length;
    const totalEstoque = this.dados.reduce((sum, produto) => sum + produto.estoque, 0);
    const valorTotal = this.dados.reduce((sum, produto) => sum + (produto.preco * produto.estoque), 0);
    const categorias = [...new Set(this.dados.map(p => p.categoria))];

    return {
      totalProdutos: total,
      totalEstoque,
      valorTotal: valorTotal.toFixed(2),
      categorias: categorias.length,
      produtoMaisCaro: this.dados.reduce((max, produto) => 
        produto.preco > max.preco ? produto : max, this.dados[0] || {}),
      produtoMaisBarato: this.dados.reduce((min, produto) => 
        produto.preco < min.preco ? produto : min, this.dados[0] || {})
    };
  }
}

// Criar instância única (Singleton)
const shampooBanco = new ShampooBanco();

export default shampooBanco;
