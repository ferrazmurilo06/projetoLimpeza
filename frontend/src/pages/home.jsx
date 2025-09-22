import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import "../components/bubbles.css";

function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Fundo com imagem + título + botão */}
      <Box
        sx={{
          height: "100vh",
          backgroundImage: 'url("/images/fundohome.png")',
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
        {/* Bolhas animadas */}
        <div className="bubbles">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="bubble" />
          ))}
        </div>

        {/* Conteúdo central */}
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
            Aero-Clean
          </Typography>

          <Typography
            variant="h6"
            sx={{
              textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              fontFamily: "'Asap', sans-serif",
              "&.MuiTypography-h6": {
                color: "#FFFFFF",
              },
              mb: 4,
            }}
          >
            Catálogo de Sabonetes Líquidos
          </Typography>

          {/* Botão de login */}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
              }}
            >
              Fazer Login
            </Button>
          </Link>
        </Container>
      </Box>
    </>
  );
}

export default Home;
