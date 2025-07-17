import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';

function EdicaoPage() {
  const { id } = useParams(); // pega o ID da URL
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    estoque: '',
  });
  const [carregando, setCarregando] = useState(true);
  const [produtoOriginal, setProdutoOriginal] = useState(null);

  const baseURL = 'https://6879762263f24f1fdca20cd8.mockapi.io/api/Produtos';

  useEffect(() => {
    fetch(`${baseURL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const produtoCarregado = {
          nome: data.nome,
          preco: data.preco,
          estoque: data.estoque,
        };
        setProduto(produtoCarregado);
        setProdutoOriginal(produtoCarregado); // salva original
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar produto:', err);
        setCarregando(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${baseURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    })
      .then((res) => {
        if (res.ok) {
          alert('Produto atualizado com sucesso!');
          navigate('/produtos');
        } else {
          alert('Erro ao atualizar produto');
        }
      })
      .catch(() => alert('Erro na requisição'));
  };

  const handleRestaurar = () => {
    if (produtoOriginal) {
      setProduto(produtoOriginal);
      alert('Alterações desfeitas e dados restaurados.');
    }
  };

  if (carregando) return <p>Carregando...</p>;

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Editar Produto (ID: {id})
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nome"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Preço"
          name="preco"
          type="number"
          value={produto.preco}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Estoque"
          name="estoque"
          type="number"
          value={produto.estoque}
          onChange={handleChange}
        />
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">
            Salvar Alterações
          </Button>
          <Button type="button" variant="outlined" color="warning" onClick={handleRestaurar}>
            Restaurar
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default EdicaoPage;