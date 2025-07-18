// src/pages/ProdutoLista.jsx

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Container, Box, CircularProgress, Alert } from "@mui/material";
import { buscarProdutos, deletarProduto } from '../services/apiService.js'; // Importa do serviço OFICIAL

// A sua lista de produtos locais para a apresentação
const produtosLocaisExtras = [
  { id: 3, nome: "Sabonete Palmolive Golfinho", preco: 14.9, categoria: "Higiene", estoque: 8, descricao: "Aroma suave de maresia e ilustração de um golfinho saltando.", imagem: "/images/Produto1.jpg", disponivel: true },
  { id: 4, nome: "Sabonete Softsoap Panda", preco: 11.9, categoria: "Higiene", estoque: 0, descricao: "Fragrância delicada com estampa de Panda.", imagem: "/images/Produto5.jpg", disponivel: false },
  { id: 5, nome: "Sabonete Palmolive Peixe Amarelo", preco: 12.5, categoria: "Higiene", estoque: 7, descricao: "Com óleo hidratante e imagem de um Peixe Amarelo.", imagem: "/images/Produto6.jpg", disponivel: true },
  { id: 6, nome: "Sabonete Palmolive Arara", preco: 15.0, categoria: "Higiene", estoque: 4, descricao: "Textura leve e embalagem divertida com uma Arara.", imagem: "/images/produto4 (2).jpg", disponivel: true },
  { id: 7, nome: "Sabonete Palmolive Peixe Preto", preco: 10.9, categoria: "Higiene", estoque: 10, descricao: "Com extrato de algas e ilustração de Peixe Preto.", imagem: "/images/Produto9.webp", disponivel: true },
  { id: 8, nome: "Sabonete Softsoap Macaco", preco: 16.5, categoria: "Higiene", estoque: 2, descricao: "Perfume fresco e embalado com desenho de uma Macaco.", imagem: "/images/Produto8.jpg", disponivel: false },
  { id: 9, nome: "Sabonete Palmolive Nemo", preco: 13.5, categoria: "Higiene", estoque: 6, descricao: "Com cheirinho cítrico e ilustração do peixe-palhaço.", imagem: "/images/Produto3.jpg", disponivel: true }
];

const ProdutoLista = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const produtosDaApi = await buscarProdutos();
      
      const idsDaApi = new Set(produtosDaApi.map(p => p.id));
      const produtosExtrasFiltrados = produtosLocaisExtras.filter(p => !idsDaApi.has(String(p.id))); // Converte p.id para string para garantir a comparação
      
      const listaCompleta = [...produtosDaApi, ...produtosExtrasFiltrados];

      setProdutos(listaCompleta);
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
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }

  return (
    <Container sx={{ paddingY: 4 }}>
      {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
      <Typography variant="h4" gutterBottom>
        Produtos Cadastrados
      </Typography>
      <Grid container spacing={3}>
        {produtos.map((produto) => (
          <Grid item xs={12} sm={6} md={4} key={produto.id}>
            <Card sx={{ maxWidth: 345, margin: "auto", height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="140"
                image={produto.imagem}
                alt={produto.nome}
                sx={{ objectFit: "cover" }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/CCCCCC/FFFFFF?text=Imagem'; }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{produto.nome}</Typography>
                <Typography variant="body2">{produto.descricao}</Typography>
                <Typography variant="body2"><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</Typography>
                <Typography variant="body2"><strong>Categoria:</strong> {produto.categoria}</Typography>
                <Typography variant="body2"><strong>Estoque:</strong> {produto.estoque}</Typography>
                <Typography variant="body2" sx={{ color: produto.disponivel ? "green" : "red" }}>
                  {produto.disponivel ? "Disponível para venda" : "Indisponível"}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, mt: 'auto', display: 'flex', gap: '10px' }}>
                <Button component={Link} to={`/editar/${produto.id}`} variant="outlined" size="small">
                  Editar
                </Button>
                <Button variant="outlined" color="error" size="small" onClick={() => handleDeletar(produto.id)}>
                  Excluir
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProdutoLista;
