import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, CircularProgress, Alert } from '@mui/material';
import { adicionarProduto } from '../services/apiService.js'; 
import { useNavigate } from 'react-router-dom';
import './CadastroPage.css';

function CadastroPage() {
  // Estados para todos os campos do formulário
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [estoque, setEstoque] = useState('');
  const [imagem, setImagem] = useState('');

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
      disponivel: parseInt(estoque) > 0,
    };

    try {
      await adicionarProduto(produtoNovo);
      alert('Produto cadastrado com sucesso!');
      navigate('/');
    } catch (err) {
      setError('Houve um erro ao cadastrar o produto. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="cadastro-background">
      {/* Bolhas decorativas */}
      {[...Array(15)].map((_, i) => (
        <Box 
          key={i}
          className="cadastro-bubble"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 20}s`
          }}
        />
      ))}

      <Container maxWidth="sm" className="cadastro-container">
        <Box
          component="form"
          className="cadastro-form-card"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            p: 3
          }}
        >
          <Typography variant="h5" className="cadastro-title" component="h1" gutterBottom>
            Cadastro de Novo Produto
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            className="cadastro-input"
            label="Nome do Produto"
            variant="outlined"
            fullWidth
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={loading}
          />

          <TextField
            className="cadastro-input"
            label="Preço"
            variant="outlined"
            type="number"
            fullWidth
            required
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            InputProps={{ inputProps: { step: "0.01", min: "0" } }}
            disabled={loading}
          />

          <TextField
            className="cadastro-input"
            label="Categoria"
            variant="outlined"
            fullWidth
            required
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            disabled={loading}
          />

          <TextField
            className="cadastro-input"
            label="Quantidade em Estoque"
            variant="outlined"
            type="number"
            fullWidth
            required
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            InputProps={{ inputProps: { min: "0" } }}
            disabled={loading}
          />

          <TextField
            className="cadastro-input"
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
          
          <TextField
            className="cadastro-input"
            label="URL da Imagem"
            variant="outlined"
            fullWidth
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            disabled={loading}
          />

          <Button
            type="submit"
            className="cadastro-button"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar Produto'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default CadastroPage;