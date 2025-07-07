import React, { useState, useEffect } from 'react';
import shampooBanco from '../services/shampooBanco';

export default function ExemploUso() {
  const [shampoos, setShampoos] = useState([]);
  const [estatisticas, setEstatisticas] = useState({});

  // Carregar dados quando o componente iniciar
  useEffect(() => {
    carregarShampoos();
  }, []);

  const carregarShampoos = async () => {
    await shampooBanco.carregarDados();
    setShampoos(shampooBanco.buscarTodos());
    setEstatisticas(shampooBanco.obterEstatisticas());
  };

  const adicionarShampoo = () => {
    const novoShampoo = {
      nome: "Shampoo Teste",
      preco: 20.00,
      categoria: "Teste",
      descricao: "Shampoo de teste",
      estoque: 10,
      imagem: "https://via.placeholder.com/200x200?text=Teste"
    };

    shampooBanco.adicionar(novoShampoo);
    setShampoos(shampooBanco.buscarTodos());
    setEstatisticas(shampooBanco.obterEstatisticas());
  };

  const buscarPorCategoria = (categoria) => {
    const resultados = shampooBanco.buscarPorCategoria(categoria);
    setShampoos(resultados);
  };

  const mostrarTodos = () => {
    setShampoos(shampooBanco.buscarTodos());
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sistema de Shampoos - Exemplo de Uso</h1>
      
      {/* Estatísticas */}
      <div style={{ background: '#f0f0f0', padding: '15px', marginBottom: '20px' }}>
        <h3>Estatísticas:</h3>
        <p>Total de produtos: {estatisticas.totalProdutos}</p>
        <p>Total em estoque: {estatisticas.totalEstoque}</p>
        <p>Valor total: R$ {estatisticas.valorTotal}</p>
        <p>Categorias: {estatisticas.categorias}</p>
      </div>

      {/* Botões de teste */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={adicionarShampoo} style={{ marginRight: '10px' }}>
          Adicionar Shampoo Teste
        </button>
        <button onClick={() => buscarPorCategoria('Anti-Caspa')} style={{ marginRight: '10px' }}>
          Buscar Anti-Caspa
        </button>
        <button onClick={() => buscarPorCategoria('Hidratante')} style={{ marginRight: '10px' }}>
          Buscar Hidratante
        </button>
        <button onClick={mostrarTodos}>
          Mostrar Todos
        </button>
      </div>

      {/* Lista de shampoos */}
      <div>
        <h3>Shampoos ({shampoos.length}):</h3>
        {shampoos.map(shampoo => (
          <div key={shampoo.id} style={{ 
            border: '1px solid #ccc', 
            padding: '10px', 
            margin: '10px 0',
            borderRadius: '5px'
          }}>
            <h4>{shampoo.nome}</h4>
            <p>Preço: R$ {shampoo.preco}</p>
            <p>Categoria: {shampoo.categoria}</p>
            <p>Estoque: {shampoo.estoque}</p>
            <p>{shampoo.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
