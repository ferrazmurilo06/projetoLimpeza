// src/pages/CadastroPage.jsx

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, CircularProgress, Alert } from '@mui/material';
import { adicionarProduto } from '../services/apiService.js'; 
import { useNavigate } from 'react-router-dom';

function CadastroPage() {
  // Estados para todos os campos do formulário
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [estoque, setEstoque] = useState('');
  const [imagem, setImagem] = useState(''); // <-- Campo novo adicionado

  // Estados para controlar o envio para a API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Função que envia os dados para a API
  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setLoading(true);
    setError(null);

    const produtoNovo = {
      nome,
      preco: parseFloat(preco),
      categoria,
      descricao,
      estoque: parseInt(estoque) || 0,
      imagem: imagem || `https://placehold.co/400x400/CCCCCC/FFFFFF?text=${encodeURIComponent(nome)}`,
      disponivel: true,
    };

    try {
      await adicionarProduto(produtoNovo);
      alert('Produto cadastrado com sucesso!');
      navigate('/'); // Redireciona para a Home
    } catch (err) {
      setError('Houve um erro ao cadastrar o produto. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // O visual (JSX) continua com o SEU estilo
  return (
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
          Cadastro de Novo Produto
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Nome do Produto"
          variant="outlined"
          fullWidth
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          size="small"
          disabled={loading}
        />

        <TextField
          label="Preço"
          variant="outlined"
          type="number"
          fullWidth
          required
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          InputProps={{ inputProps: { step: "0.01", min: "0" } }}
          size="small"
          disabled={loading}
        />

        <TextField
          label="Categoria"
          variant="outlined"
          fullWidth
          required
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          size="small"
          disabled={loading}
        />

        <TextField
          label="Quantidade em Estoque"
          variant="outlined"
          type="number"
          fullWidth
          required
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
          InputProps={{ inputProps: { min: "0" } }}
          size="small"
          disabled={loading}
        />

        <TextField
          label="Descrição"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          required
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          disabled={loading}
        />
        
        {/* CAMPO NOVO ADICIONADO */}
        <TextField
          label="URL da Imagem"
          variant="outlined"
          fullWidth
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          size="small"
          disabled={loading}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar Produto'}
        </Button>
      </Box>
    </Container>
  );
}

export default CadastroPage;
