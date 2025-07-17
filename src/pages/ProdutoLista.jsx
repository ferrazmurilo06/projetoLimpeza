import React, { useState } from "react";
import {Card,CardContent,CardMedia, Typography,Button,Grid,Container,} from "@mui/material";

const ProdutoLista = () => {
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: "Sabonete Palmolive Peixes",
      preco: 12.9,
      categoria: "Higiene",
      estoque: 5,
      descricao:
        "Sabonete líquido com fragrância oceânica e ilustração de peixinhos.",
      imagem: "/images/Produto7.jpg",
      disponivel: true,
    },
    {
      id: 2,
      nome: "Sabonete Palmolive Tartaruga",
      preco: 13.9,
      categoria: "Higiene",
      estoque: 3,
      descricao:
        "Com essência refrescante e ilustração de tartaruga marinha.",
      imagem: "/images/Produto2.jpg",
      disponivel: false,
    },
    {
      id: 3,
      nome: "Sabonete Palmolive Golfinho",
      preco: 14.9,
      categoria: "Higiene",
      estoque: 8,
      descricao:
        "Aroma suave de maresia e ilustração de um golfinho saltando.",
      imagem: "/images/Produto1.jpg",
      disponivel: true,
    },
    {
      id: 4,
      nome: "Sabonete Softsoap Panda",
      preco: 11.9,
      categoria: "Higiene",
      estoque: 0,
      descricao: "Fragrância delicada com estampa de Panda.",
      imagem: "/images/Produto5.jpg",
      disponivel: false,
    },
    {
      id: 5,
      nome: "Sabonete Palmolive Peixe Amarelo",
      preco: 12.5,
      categoria: "Higiene",
      estoque: 7,
      descricao: "Com óleo hidratante e imagem de um Peixe Amarelo.",
      imagem: "/images/Produto6.jpg",
      disponivel: true,
    },
    {
      id: 6,
      nome: "Sabonete Palmolive Arara",
      preco: 15.0,
      categoria: "Higiene",
      estoque: 4,
      descricao: "Textura leve e embalagem divertida com uma Arara.",
      imagem: "/images/produto4 (2).jpg",
      disponivel: true,
    },
    {
      id: 7,
      nome: "Sabonete Palmolive Peixe Preto",
      preco: 10.9,
      categoria: "Higiene",
      estoque: 10,
      descricao: "Com extrato de algas e ilustração de Peixe Preto.",
      imagem: "/images/Produto9.webp",
      disponivel: true,
    },
    {
      id: 8,
      nome: "Sabonete Softsoap Macaco",
      preco: 16.5,
      categoria: "Higiene",
      estoque: 2,
      descricao: "Perfume fresco e embalado com desenho de uma Macaco.",
      imagem: "/images/Produto8.jpg",
      disponivel: false,
    },
    {
      id: 9,
      nome: "Sabonete Palmolive Nemo",
      preco: 13.5,
      categoria: "Higiene",
      estoque: 6,
      descricao: "Com cheirinho cítrico e ilustração do peixe-palhaço.",
      imagem: "/images/Produto3.jpg",
      disponivel: true,
    },
  ]);

  const excluirProduto = (id) => {
    const atualizado = produtos.filter((produto) => produto.id !== id);
    setProdutos(atualizado);
  };

  const editarProduto = (id) => {
    console.log(`Produto com ID ${id} clicado para edição.`);
  };

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom>
        Produtos Cadastrados
      </Typography>
      <Grid container spacing={3}>
        {produtos.map((produto) => (
          <Grid item xs={12} sm={6} md={4} key={produto.id}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardMedia
                component="img"
                height="140"
                image={produto.imagem}
                alt={produto.nome}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6">{produto.nome}</Typography>
                <Typography variant="body2">{produto.descricao}</Typography>
                <Typography variant="body2">
                  <strong>Preço:</strong> R$ {produto.preco.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  <strong>Categoria:</strong> {produto.categoria}
                </Typography>
                <Typography variant="body2">
                  <strong>Estoque:</strong> {produto.estoque}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: produto.disponivel ? "green" : "red" }}
                >
                  {produto.disponivel
                    ? "Disponível para venda"
                    : "Indisponível"}
                </Typography>

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => editarProduto(produto.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => excluirProduto(produto.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProdutoLista;
