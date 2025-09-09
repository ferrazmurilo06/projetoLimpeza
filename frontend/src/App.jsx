import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx'; // Navbar
import Home from './pages/home.jsx';             // Home
import ProdutoLista from './pages/ProdutoLista.jsx'; // Importe a página de lista de produtos
import CadastroPage from './pages/CadastroPage.jsx'; // página de cadastro
import EdicaoPage from './pages/EdicaoPage.jsx';     // página de edição
import LoginPage from './pages/LoginPage.jsx';     // Importa a página de login
import './App.css';

// Layout principal
function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        {/* espaço pra carregar a página da rota atual */}
        <Outlet />
      </main>
    </div>
  );
}

// regras da navegação
function App() {
  return (
    <Routes>
      {/* Todas as rotas dentro daqui usarão o <Layout> como base */}
      <Route path="/" element={<Layout />}>

        {/* Rota principal: mostra a Home */}
        <Route index element={<Home />} />

        {/* Rota para mostrar a lista de produtos */}
        <Route path="produtos" element={<ProdutoLista />} />

        {/* Rota de cadastro: mostra a CadastroPage */}
        <Route path="cadastro" element={<CadastroPage/>} />
        
        {/* Rota de edição: mostra a EdicaoPage */}
        <Route path="editar/:id" element={<EdicaoPage />} />

        {/* Rota de login */}
        <Route path="login" element={<LoginPage />} />
        
      </Route>
    </Routes>
  );
}

export default App;
