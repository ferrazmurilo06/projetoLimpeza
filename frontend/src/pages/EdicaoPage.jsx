import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, CircularProgress, Alert, Stack } from '@mui/material';
// Importando as funções do serviço de API
import { buscarProdutoPorId, atualizarProduto } from '../services/apiService.js';

function EdicaoPage() {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    categoria: '', 
    estoque: '',
    descricao: '',
    imagem: '', 
  });

  // Estados para controlar o carregamento e erros
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efeito que busca os dados do produto na API quando a página carrega
  useEffect(() => {
    const carregarProduto = async () => {
      try {
        setLoading(true);
        const data = await buscarProdutoPorId(id);
        if (data) {
          setProduto(data);
        } else {
          setError("Produto não encontrado.");
        }
      } catch (err) {
        setError("Erro ao carregar os dados do produto.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    carregarProduto();
  }, [id]); // Roda de novo se o ID na URL mudar

  // Função que atualiza o estado conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  // envia as alterações para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await atualizarProduto(id, produto);
      alert('Produto atualizado com sucesso!');
      navigate('/'); // Volta para a página principal
    } catch (err) {
      alert('Erro ao atualizar o produto.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Se estiver carregando, mostra um indicador
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 12 }}><CircularProgress /></Box>;
  }

  // Se der erro, mostra uma mensagem
  if (error) {
    return <Container sx={{ mt: 12 }}><Alert severity="error">{error}</Alert></Container>;
  }

  return (
    
    <Container maxWidth="sm" sx={{ mt: 12, mb: 6 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 4,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          borderRadius: '12px',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: "'Asap', sans-serif" }}>
          Editar Produto (ID: {id})
        </Typography>

        <TextField
          label="Nome do Produto"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          fullWidth
          required
          size="small"
        />
        <TextField
          label="Preço"
          name="preco"
          type="number"
          value={produto.preco}
          onChange={handleChange}
          fullWidth
          required
          size="small"
          InputProps={{ inputProps: { step: "0.01", min: "0" } }}
        />
        <TextField 
          label="Categoria"
          name="categoria"
          value={produto.categoria}
          onChange={handleChange}
          fullWidth
          required
          size="small"
        />
        <TextField
          label="Quantidade em Estoque"
          name="estoque"
          type="number"
          value={produto.estoque}
          onChange={handleChange}
          fullWidth
          size="small"
          InputProps={{ inputProps: { min: "0" } }}
        />
        <TextField
          label="Descrição"
          name="descricao"
          multiline
          rows={4}
          value={produto.descricao}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="URL da Imagem"
          name="imagem"
          value={produto.imagem}
          onChange={handleChange}
          fullWidth
          required
          size="small"
        />
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
          <Button type="button" variant="outlined" onClick={() => navigate('/')}>
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default EdicaoPage;
