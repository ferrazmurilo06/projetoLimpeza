// dentro de src/pages/CadastroPage.jsx

import React, { useState } from 'react';

// Estilos básicos (só pra não ficar tudo amontoado)
const formContainerStyles = {
  padding: '2rem'
};

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};

const inputStyles = {
  padding: '12px',
  fontSize: '1rem',
  marginBottom: '1rem',
  borderRadius: '5px',
  border: '1.5px solid #ccc',
};

const buttonStyles = {
  padding: '12px 15px',
  fontSize: '1rem',
  color: 'white',
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '1rem',
};


function CadastroPage() {
  // Para cada campo do formulário, criamos um "estado" para guardar o que o usuário digita
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [estoque, setEstoque] = useState('');


  // Função que é chamada quando o formulário é enviado
  const handleSubmit = (evento) => {
    evento.preventDefault(); // Impede a página de recarregar sozinha
    
    const produtoNovo = {
      nome: nome,
      preco: parseFloat(preco), // Converte o texto para número
      categoria: categoria,
      descricao: descricao,
      estoque: parseInt(estoque, 10), // Converte o texto para número inteiro
    };

    // Por enquanto, vamos só mostrar os dados no console para testar
    console.log('Novo Produto Cadastrado:', produtoNovo);

    alert('Produto cadastrado com sucesso! (Verifique o console com F12)');
  };


  return (
    <div style={formContainerStyles}>
      <form style={formStyles} onSubmit={handleSubmit}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Cadastro de Novo Produto</h1>
        
        <label htmlFor="nome">Nome do Produto:</label>
        <input 
          style={inputStyles}
          type="text" 
          id="nome" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required 
        />

        <label htmlFor="preco">Preço (ex: 49.99):</label>
        <input 
          style={inputStyles}
          type="number" 
          id="preco"
          step="0.01" // Permite casas decimais
          value={preco}
          onChange={(e) => setPreco(e.target.value)} 
          required 
        />

        <label htmlFor="categoria">Categoria:</label>
        <input 
          style={inputStyles}
          type="text" 
          id="categoria" 
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required 
        />
        
        <label htmlFor="estoque">Quantidade em Estoque:</label>
        <input 
          style={inputStyles}
          type="number" 
          id="estoque"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)} 
        />

        <label htmlFor="descricao">Descrição:</label>
        <textarea 
          style={{...inputStyles, height: '100px', resize: 'vertical' }}
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)} 
          required 
        />

        <button style={buttonStyles} type="submit">Cadastrar Produto</button>

      </form>
    </div>
  );
}

export default CadastroPage;
