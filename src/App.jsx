// App.jsx
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './componentes/Navbar.jsx'; // Navbar
import Home from './pages/home.jsx';           // Home
import CadastroPage from './pages/CadastroPage.jsx'; // página de cadastro
import EdicaoPage from './pages/EdicaoPage.jsx';   // página de edição
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

        {/* Rota de cadastro: mostra a CadastroPage */}
        <Route path="cadastro" element={<CadastroPage />} />
        
        {/* Rota de edição: mostra a EdicaoPage */}
        <Route path="editar/:id" element={<EdicaoPage />} />
        
      </Route>
    </Routes>
  );
}

export default App;