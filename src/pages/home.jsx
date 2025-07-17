// src/pages/Home.jsx

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Navbar from "../componentes/Navbar.jsx";
import "../componentes/bubbles.css"; 


function home() {
  return (
    <>
      {/* {barra do munu glass} */}
      <Navbar />
      <div className="bubbles">
  {[...Array(25)].map((_, i) => (
    <div
  key={i}
  className="bubble"
  style={{
    left: `${Math.random() * 100}%`,
    width: `${25 + Math.random() * 25}px`,
    animationDuration: `${6 + Math.random() * 8}s`,
    animationDelay: `${Math.random() * 4}s`,
  }}
/>

  ))}
</div>



      {/* IMAGEM DE FUNDO MAIS TEXTO CENTRALIZADO*/}
      <Box
        sx={{
          height: "100vh",
          backgroundImage: 'url("/images/Frutiger Aero Aqua!!!.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          px: 2,
          pt: "80px", // espaço para a navbar fixa
        }}
      >
    
      
        {/* Bolhas */}
        <div className="bubbles">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="bubble" />
          ))}
        </div>

        {/* Conteúdo */}
        <Container sx={{ zIndex: 2, position: "relative" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
              mb: 2,
              fontFamily: "'Asap', sans-serif",
            }}
          >
            frutiger aeroooo
          </Typography>

          <Typography
            variant="h6"
            sx={{
              textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              fontFamily: "'Asap', sans-serif",
            }}
          >
           produtos cadastrados abaixoo
          </Typography>
        </Container>
      </Box>
   {/* Produtos cadastrados */}
      <Box sx={{ py: 6, backgroundColor: "#f5f5f5" }}>
        <Container>
          <ProdutoLista />
        </Container>
      </Box>
    </>
  );
}

export default home;
