import React, { useState, useEffect } from 'react';

export default function ShampooBanco() {
  const [shampoos, setShampoos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. CARREGAR dados do JSON quando a página carrega
  useEffect(() => {
    buscarShampoos();
  }, []);

  const buscarShampoos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/shampoos.json');
      const data = await response.json();
      setShampoos(data.produtos);
    } catch (error) {
      console.error('Erro ao buscar shampoos:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. ADICIONAR novo shampoo
  const adicionarShampoo = () => {
    const novoShampoo = {
      id: Date.now(), // ID simples
      nome: "Shampoo Teste",
      preco: 20.00,
      categoria: "Teste",
      descricao: "Novo shampoo de teste",
      estoque: 10,
      imagem: "https://via.placeholder.com/200x200?text=Novo"
    };

    // Atualiza a lista local
    setShampoos([...shampoos, novoShampoo]);
    
    // Aqui você salvaria no "banco" (arquivo JSON na nuvem)
    console.log('Salvando no banco:', novoShampoo);
  };

  // 3. EDITAR shampoo
  const editarShampoo = (id, novosDados) => {
    const shampoosAtualizados = shampoos.map(shampoo => 
      shampoo.id === id ? { ...shampoo, ...novosDados } : shampoo
    );
    setShampoos(shampoosAtualizados);
    
    // Aqui você salvaria no "banco"
    console.log('Atualizando no banco:', novosDados);
  };

  // 4. DELETAR shampoo
  const deletarShampoo = (id) => {
    const shampoosRestantes = shampoos.filter(shampoo => shampoo.id !== id);
    setShampoos(shampoosRestantes);
    
    // Aqui você removeria do "banco"
    console.log('Removendo do banco:', id);
  };

  if (loading) {
    return <div>Carregando shampoos...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>🧴 Sistema de Shampoos</h1>
      
      <button onClick={adicionarShampoo} style={{ marginBottom: '20px' }}>
        ➕ Adicionar Shampoo
      </button>

      <div>
        <h2>Lista de Shampoos ({shampoos.length})</h2>
        {shampoos.map(shampoo => (
          <div key={shampoo.id} style={{ 
            border: '1px solid #ccc', 
            margin: '10px 0', 
            padding: '15px',
            borderRadius: '5px'
          }}>
            <h3>{shampoo.nome}</h3>
            <p><strong>Preço:</strong> R$ {shampoo.preco}</p>
            <p><strong>Categoria:</strong> {shampoo.categoria}</p>
            <p><strong>Estoque:</strong> {shampoo.estoque} unidades</p>
            <p><strong>Descrição:</strong> {shampoo.descricao}</p>
            
            <div style={{ marginTop: '10px' }}>
              <button 
                onClick={() => editarShampoo(shampoo.id, { preco: shampoo.preco + 1 })}
                style={{ marginRight: '10px' }}
              >
                ✏️ Aumentar Preço
              </button>
              <button 
                onClick={() => deletarShampoo(shampoo.id)}
                style={{ color: 'red' }}
              >
                🗑️ Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
