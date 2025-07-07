import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useShampoos } from '../hooks/useShampoos';

export default function ListaShampoos() {
  const {
    produtos,
    loading,
    error,
    adicionarProduto,
    atualizarProduto,
    removerProduto,
    buscarProdutos,
    filtrarPorCategoria
  } = useShampoos();

  const [openDialog, setOpenDialog] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  // Formulário do produto
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    categoria: '',
    descricao: '',
    estoque: '',
    imagem: '',
    marca: '',
    tipo: '',
    tamanho: ''
  });

  // Categorias disponíveis
  const categorias = [
    'Cabelo Seco',
    'Anticaspa',
    'Infantil',
    'Nutrição',
    'Cabelo Loiro',
    'Cabelo Oleoso',
    'Cabelo Cacheado',
    'Cabelo Liso'
  ];

  // Abrir dialog para adicionar/editar
  const handleOpenDialog = (produto = null) => {
    if (produto) {
      setProdutoEditando(produto);
      setFormData(produto);
    } else {
      setProdutoEditando(null);
      setFormData({
        nome: '',
        preco: '',
        categoria: '',
        descricao: '',
        estoque: '',
        imagem: '',
        marca: '',
        tipo: '',
        tamanho: ''
      });
    }
    setOpenDialog(true);
  };

  // Fechar dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProdutoEditando(null);
  };

  // Salvar produto
  const handleSalvarProduto = async () => {
    try {
      if (produtoEditando) {
        await atualizarProduto(produtoEditando.id, formData);
      } else {
        await adicionarProduto(formData);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  // Remover produto
  const handleRemoverProduto = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este produto?')) {
      try {
        await removerProduto(id);
      } catch (error) {
        console.error('Erro ao remover produto:', error);
      }
    }
  };

  // Buscar produtos
  const handleBuscar = async () => {
    if (searchTerm.trim()) {
      const resultados = await buscarProdutos(searchTerm);
      setProdutosFiltrados(resultados);
    } else {
      setProdutosFiltrados([]);
    }
  };

  // Filtrar por categoria
  const handleFiltrarCategoria = async (categoria) => {
    setFiltroCategoria(categoria);
    if (categoria) {
      const resultados = await filtrarPorCategoria(categoria);
      setProdutosFiltrados(resultados);
    } else {
      setProdutosFiltrados([]);
    }
  };

  // Produtos a exibir (filtrados ou todos)
  const produtosParaExibir = produtosFiltrados.length > 0 ? produtosFiltrados : produtos;

  if (loading && produtos.length === 0) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Catálogo de Shampoos
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Barra de ferramentas */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Adicionar Shampoo
        </Button>

        <TextField
          label="Buscar produtos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleBuscar}>
                <SearchIcon />
              </IconButton>
            )
          }}
        />

        <TextField
          select
          label="Filtrar por categoria"
          value={filtroCategoria}
          onChange={(e) => handleFiltrarCategoria(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Todas as categorias</MenuItem>
          {categorias.map((categoria) => (
            <MenuItem key={categoria} value={categoria}>
              {categoria}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Grid de produtos */}
      <Grid container spacing={3}>
        {produtosParaExibir.map((produto) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={produto.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={produto.imagem}
                alt={produto.nome}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Shampoo';
                }}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {produto.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {produto.marca} - {produto.tamanho}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  R$ {produto.preco.toFixed(2)}
                </Typography>
                <Chip
                  label={produto.categoria}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Estoque: {produto.estoque} unidades
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => handleOpenDialog(produto)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleRemoverProduto(produto.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {produtosParaExibir.length === 0 && !loading && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            Nenhum produto encontrado
          </Typography>
        </Box>
      )}

      {/* Dialog para adicionar/editar produto */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {produtoEditando ? 'Editar Shampoo' : 'Adicionar Novo Shampoo'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome do Produto"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Marca"
                value={formData.marca}
                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Preço"
                type="number"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Estoque"
                type="number"
                value={formData.estoque}
                onChange={(e) => setFormData({ ...formData, estoque: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Tamanho"
                value={formData.tamanho}
                onChange={(e) => setFormData({ ...formData, tamanho: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Categoria"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              >
                {categorias.map((categoria) => (
                  <MenuItem key={categoria} value={categoria}>
                    {categoria}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tipo"
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL da Imagem"
                value={formData.imagem}
                onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Descrição"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSalvarProduto} variant="contained">
            {produtoEditando ? 'Atualizar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
