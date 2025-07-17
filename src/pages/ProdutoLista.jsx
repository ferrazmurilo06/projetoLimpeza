import React from "react";
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

const produtos = [
  {
    id: 1,
    nome: "Sabonete Palmolive Peixes",
    preco: "R$ 12,90",
    categoria: "Higiene",
    estoque: 5,
    descricao: "Sabonete líquido com fragrância oceânica e ilustração de peixinhos.",
    imagem: "/images/sabonete1.jpg",
    disponivel: true,
  },
  {
    id: 2,
    nome: "Sabonete Palmolive Tartaruga",
    preco: "R$ 13,90",
    categoria: "Higiene",
    estoque: 3,
    descricao: "Com essência refrescante e ilustração de tartaruga marinha.",
    imagem: "/images/sabonete2.jpg",
    disponivel: false,
  },
];

function ProdutoLista() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: "'Asap', sans-serif" }}>
        Produtos Cadastrados
      </Typography>

      <Grid container spacing={3}>
        {produtos.map((produto) => (
          <Grid item xs={12} sm={6} md={4} key={produto.id}>
            <Card sx={{ maxWidth: 345, height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="180"
                image={produto.imagem}
                alt={produto.nome}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontFamily: "'Asap', sans-serif" }}>
                  {produto.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {produto.descricao}
                </Typography>
                <Typography variant="body2"><strong>Preço:</strong> {produto.preco}</Typography>
                <Typography variant="body2"><strong>Categoria:</strong> {produto.categoria}</Typography>
                <Typography variant="body2"><strong>Estoque:</strong> {produto.estoque}</Typography>
                <Typography
                  variant="body2"
                  sx={{ color: produto.disponivel ? "green" : "red" }}
                >
                  {produto.disponivel ? "Disponível para venda" : "Indisponível"}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                <Button
                  component={Link}
                  to={`/editar/${produto.id}`}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                   Editar
                </Button>
                <Button variant="outlined" color="error" size="small">Excluir</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProdutoLista;
