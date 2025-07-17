// dentro de src/pages/EdicaoPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EdicaoPage() {
  const { id } = useParams(); // Captura o ID da URL
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    nome: '',
    preco: '',
    estoque: ''
  });

  const [loading, setLoading] = useState(true);

  // 1. Buscar os dados do produto pelo ID
  useEffect(() => {
    fetch(`https://api.exemplo.com/produtos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          nome: data.nome,
          preco: data.preco,
          estoque: data.estoque
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar produto:", err);
        setLoading(false);
      });
  }, [id]);

  // 2. Atualizar o estado do produto enquanto edita
  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  // 3. Enviar os dados atualizados
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`https://api.exemplo.com/produtos/${id}`, {
      method: 'PUT', // ou PATCH
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then((res) => {
        if (res.ok) {
          alert("Produto atualizado com sucesso!");
          navigate('/produtos'); // Volta para a lista de produtos
        } else {
          alert("Erro ao atualizar produto");
        }
      });
  }

  if (loading) return <p>Carregando dados do produto...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Editar Produto (ID: {id})</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br />
          <input
            type="text"
            name="nome"
            value={product.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Preço:</label><br />
          <input
            type="number"
            name="preco"
            value={product.preco}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Estoque:</label><br />
          <input
            type="number"
            name="estoque"
            value={product.estoque}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}


// A linha mais importante que provavelmente está faltando:
export default EdicaoPage;