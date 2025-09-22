import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, CircularProgress, Alert } from '@mui/material';
import { adicionarProduto } from '../services/apiService.js';
import { useNavigate } from 'react-router-dom';
import './CadastroPage.css';

function CadastroPage() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [urlImagem, setUrlImagem] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // O nosso "alert" moderno
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const produtoNovo = {
      nome,
      preco: parseFloat(preco),
      categoria,
      descricao,
      quantidade: parseInt(quantidade, 10) || 0,
      urlImagem: urlImagem || `https://placehold.co/400x400/CCCCCC/FFFFFF?text=${encodeURIComponent(nome)}`,
      status: (parseInt(quantidade, 10) || 0) > 0 ? 'ativo' : 'indisponivel',
    };

    try {
      await adicionarProduto(produtoNovo);
      // 1. Mostra a mensagem de sucesso na tela
      setSuccessMessage('Produto cadastrado com sucesso! A ser redirecionado...');

      // 2. Espera 2 segundos para o utilizador ler e o React se acalmar
      setTimeout(() => {
        // 3. Navega suavemente
        navigate('/produtos');
      }, 2000);

    } catch (err) {
      setError('Houve um erro ao cadastrar o produto. Tente novamente.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Box className="cadastro-background">
      <Container maxWidth="sm" className="cadastro-container">
        <Box
          component="form"
          className="cadastro-form-card"
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" className="cadastro-title" component="h1" gutterBottom>
            Cadastro de Novo Produto
          </Typography>

          {/* O nosso novo sistema de mensagens */}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Resto do formulário (já está correto) */}
          <TextField label="Nome do Produto" fullWidth required value={nome} onChange={(e) => setNome(e.target.value)} disabled={loading} />
          <TextField label="Preço" type="number" fullWidth required value={preco} onChange={(e) => setPreco(e.target.value)} disabled={loading} />
          <TextField label="Categoria" fullWidth required value={categoria} onChange={(e) => setCategoria(e.target.value)} disabled={loading} />
          <TextField label="Quantidade em Estoque" type="number" fullWidth required value={quantidade} onChange={(e) => setQuantidade(e.target.value)} disabled={loading} />
          <TextField label="Descrição" multiline rows={3} fullWidth value={descricao} onChange={(e) => setDescricao(e.target.value)} disabled={loading} />
          <TextField label="URL da Imagem" fullWidth value={urlImagem} onChange={(e) => setUrlImagem(e.target.value)} disabled={loading} />

          <Button type="submit" className="cadastro-button" variant="contained" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Cadastrar Produto'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default CadastroPage;