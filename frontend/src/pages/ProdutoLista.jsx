import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Container, Box, CircularProgress, Alert } from "@mui/material";
import { buscarProdutos, deletarProduto } from '../services/apiService.js';
import './ProdutoLista.css';



const ProdutoLista = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const produtosDaApi = await buscarProdutos();
      setProdutos(produtosDaApi);
      setError(null);
    } catch (err) {
      setError("Falha ao conectar com a API. Exibindo lista de demonstração.");
      console.error("Erro da API, usando fallback:", err);
      setProdutos(produtosLocaisExtras);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleDeletar = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deletarProduto(id);
        alert("Produto deletado com sucesso da API!");
        carregarProdutos();
      } catch (err) {
        setProdutos(produtos.filter(p => p.id !== id));
        alert("Produto removido da lista de demonstração!");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 4,
        backgroundColor: '#e3f2fd',
        minHeight: '100vh'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{
      backgroundColor: '#e3f2fd',
      minHeight: '100vh',
      py: 4
    }}>
      <Container>
        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: '#1976d2',
            fontWeight: 'bold',
            textAlign: 'center',
            pt: 2
          }}
        >
          Produtos Cadastrados
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {produtos.map((produto) => (
            <Grid item key={produto.id} xs={12} sm={6} md={4}>
              <Card sx={{
                width: 300,
                height: 500,
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}>
                <CardMedia
                  component="img"
                  image={produto.urlImagem}
                  alt={produto.nome}
                  sx={{
                    objectFit: "contain",
                    height: 160,
                    padding: 1,
                    backgroundColor: '#f5f5f5'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x400/CCCCCC/FFFFFF?text=Imagem';
                  }}
                />
                <CardContent sx={{ flexGrow: 1, width: "100%" }}>
                  <Typography variant="h6" textAlign="center">
                    {produto.nome}
                  </Typography>
                  <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
                    {produto.descricao}
                  </Typography>
                  <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
                    <strong>Preço:</strong> R$ {produto.preco.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" textAlign="center">
                    <strong>Categoria:</strong> {produto.categoria}
                  </Typography>
                  <Typography variant="body2" textAlign="center">
                    <strong>Estoque:</strong> {produto.quantidade}
                  </Typography>
                  <Typography
                    variant="body2"
                    textAlign="center"
                    sx={{
                      color: produto.quantidade > 0 ? "green" : "red",
                      fontWeight: 'bold'
                    }}
                  >
                    {Number(produto.quantidade) > 0 ? "Disponível" : "Indisponível"}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <Button
                    component={Link}
                    to={`/editar/${produto.id}`}
                    variant="outlined"
                    size="small"
                    sx={{
                      border: '2px solid',
                      fontWeight: 'bold'
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeletar(produto.id)}
                    sx={{
                      border: '2px solid',
                      fontWeight: 'bold'
                    }}
                  >
                    Excluir
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProdutoLista;