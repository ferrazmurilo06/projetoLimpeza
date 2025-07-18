import React, { useState } from 'react';
import Navbar from '../componentes/Navbar/Navbar';
import { Box, Typography, TextField, Button, Container } from '@mui/material';

function CadastroPage() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [estoque, setEstoque] = useState('');

  const handleSubmit = (evento) => {
    evento.preventDefault();
    const produtoNovo = {
      nome,
      preco: parseFloat(preco),
      categoria,
      descricao,
      estoque: parseInt(estoque, 10),
    };

    console.log('Novo Produto Cadastrado:', produtoNovo);
    alert('Produto cadastrado com sucesso! (Verifique o console com F12)');

    setNome('');
    setPreco('');
    setCategoria('');
    setDescricao('');
    setEstoque('');
  };

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
            Cadastro de Novo Produto
          </Typography>

          <TextField
            label="Nome do Produto"
            variant="outlined"
            fullWidth
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            size="small"
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
          />

          <TextField
            label="Categoria"
            variant="outlined"
            fullWidth
            required
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            size="small"
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
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1.5,
              py: 1,
              backgroundColor: '#0077cc', // cor da navbar
              color: '#fff',
              '&:hover': {
                backgroundColor: '#005fa3',
              },
            }}
          >
            Cadastrar Produto
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default CadastroPage;
