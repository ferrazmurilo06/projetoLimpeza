import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  AttachMoney as MoneyIcon,
  Category as CategoryIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useShampoos } from '../hooks/useShampoos';
import shampooService from '../services/shampooService';

export default function DashboardShampoos() {
  const { produtos, loading } = useShampoos();
  const [estatisticas, setEstatisticas] = useState({
    totalProdutos: 0,
    valorTotalEstoque: 0,
    categorias: [],
    estoqueAbaixo: []
  });

  useEffect(() => {
    const calcularEstatisticas = async () => {
      if (produtos.length === 0) return;

      const totalProdutos = produtos.length;
      const valorTotalEstoque = produtos.reduce(
        (total, produto) => total + (produto.preco * produto.estoque),
        0
      );

      const categorias = await shampooService.obterCategorias();
      const estoqueAbaixo = await shampooService.buscarEstoqueBaixo(15);

      setEstatisticas({
        totalProdutos,
        valorTotalEstoque,
        categorias,
        estoqueAbaixo
      });
    };

    calcularEstatisticas();
  }, [produtos]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  const categoriasComContagem = estatisticas.categorias.map(categoria => ({
    nome: categoria,
    quantidade: produtos.filter(p => p.categoria === categoria).length
  }));

  const marcasPopulares = produtos.reduce((acc, produto) => {
    acc[produto.marca] = (acc[produto.marca] || 0) + 1;
    return acc;
  }, {});

  const topMarcas = Object.entries(marcasPopulares)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard - Shampoos
      </Typography>

      {/* Cards de estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <InventoryIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {estatisticas.totalProdutos}
                  </Typography>
                  <Typography color="text.secondary">
                    Total de Produtos
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <MoneyIcon color="success" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    R$ {estatisticas.valorTotalEstoque.toFixed(2)}
                  </Typography>
                  <Typography color="text.secondary">
                    Valor do Estoque
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CategoryIcon color="info" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {estatisticas.categorias.length}
                  </Typography>
                  <Typography color="text.secondary">
                    Categorias
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <WarningIcon color="warning" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {estatisticas.estoqueAbaixo.length}
                  </Typography>
                  <Typography color="text.secondary">
                    Estoque Baixo
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detalhes */}
      <Grid container spacing={3}>
        {/* Produtos por categoria */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Produtos por Categoria
              </Typography>
              <List dense>
                {categoriasComContagem.map((categoria) => (
                  <ListItem key={categoria.nome} divider>
                    <ListItemText primary={categoria.nome} />
                    <Chip 
                      label={categoria.quantidade} 
                      size="small" 
                      color="primary"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Top marcas */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Marcas Mais Populares
              </Typography>
              <List dense>
                {topMarcas.map(([marca, quantidade]) => (
                  <ListItem key={marca} divider>
                    <ListItemText primary={marca} />
                    <Chip 
                      label={`${quantidade} produto${quantidade > 1 ? 's' : ''}`} 
                      size="small" 
                      color="secondary"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Produtos com estoque baixo */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estoque Baixo (≤15 unidades)
              </Typography>
              {estatisticas.estoqueAbaixo.length === 0 ? (
                <Typography color="success.main">
                  Todos os produtos com estoque adequado! 🎉
                </Typography>
              ) : (
                <List dense>
                  {estatisticas.estoqueAbaixo.map((produto) => (
                    <ListItem key={produto.id} divider>
                      <ListItemIcon>
                        <WarningIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={produto.nome}
                        secondary={`${produto.estoque} unidades`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Produtos mais caros e mais baratos */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Produtos Mais Caros
              </Typography>
              <List dense>
                {produtos
                  .sort((a, b) => b.preco - a.preco)
                  .slice(0, 3)
                  .map((produto) => (
                    <ListItem key={produto.id} divider>
                      <ListItemText 
                        primary={produto.nome}
                        secondary={produto.marca}
                      />
                      <Typography color="primary" fontWeight="bold">
                        R$ {produto.preco.toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Produtos Mais Baratos
              </Typography>
              <List dense>
                {produtos
                  .sort((a, b) => a.preco - b.preco)
                  .slice(0, 3)
                  .map((produto) => (
                    <ListItem key={produto.id} divider>
                      <ListItemText 
                        primary={produto.nome}
                        secondary={produto.marca}
                      />
                      <Typography color="success.main" fontWeight="bold">
                        R$ {produto.preco.toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
