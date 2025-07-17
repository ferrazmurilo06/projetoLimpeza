import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import { Box, Typography, TextField, Button, Container } from '@mui/material';

function EdicaoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    categoria: '',
    estoque: '',
    descricao: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.exemplo.com/produtos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduto({
          nome: data.nome || '',
          preco: data.preco || '',
          categoria: data.categoria || '',
          estoque: data.estoque || '',
          descricao: data.descricao || ''
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar produto:", err);
        setLoading(false);
      });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`https://api.exemplo.com/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...produto,
        preco: parseFloat(produto.preco),
        estoque: parseInt(produto.estoque, 10)
      })
    })
      .then((res) => {
        if (res.ok) {
          alert("Produto atualizado com sucesso!");
          navigate('/produtos');
        } else {
          alert("Erro ao atualizar produto");
        }
      });
  }

  if (loading) return <p style={{ padding: '20px' }}>Carregando dados do produto...</p>;

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 12, mb: 6 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            p: 3,
            backgroundColor: '#f9f9f9',
            boxShadow: 3,
            borderRadius: 2,
            border: '1px solid #e0e0e0',
          }}
        >
          <Typography variant="h5" component="h1" align="center" gutterBottom sx={{ color: '#333' }}>
            Editar Produto (ID: {id})
          </Typography>

          <TextField
            label="Nome do Produto"
            name="nome"
            variant="outlined"
            fullWidth
            required
            value={produto.nome}
            onChange={handleChange}
            size="small"
          />

          <TextField
            label="Preço"
            name="preco"
            variant="outlined"
            type="number"
            fullWidth
            required
            value={produto.preco}
            onChange={handleChange}
            InputProps={{ inputProps: { step: "0.01", min: "0" } }}
            size="small"
          />

          <TextField
            label="Categoria"
            name="categoria"
            variant="outlined"
            fullWidth
            required
            value={produto.categoria}
            onChange={handleChange}
            size="small"
          />

          <TextField
            label="Quantidade em Estoque"
            name="estoque"
            variant="outlined"
            type="number"
            fullWidth
            required
            value={produto.estoque}
            onChange={handleChange}
            InputProps={{ inputProps: { min: "0" } }}
            size="small"
          />

          <TextField
            label="Descrição"
            name="descricao"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            required
            value={produto.descricao}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1.5,
              py: 1,
              backgroundColor: '#0077cc',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#005fa3',
              },
            }}
          >
            Salvar Alterações
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default EdicaoPage;
