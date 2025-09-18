import React, { useContext } from 'react'; // Importa useContext
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx'; // Importa o contexto
import Navbar from '@/components/Navbar/Navbar.jsx';
import Home from './pages/home.jsx';                // Home
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
        <Outlet />
      </main>
    </div>
  );
}

// regras da navegação
function App() {
  const { isLoggedIn } = useContext(AuthContext); // Pega o estado de login

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />

        <Route 
          path="produtos" 
          element={isLoggedIn ? <ProdutoLista /> : <Navigate to="/login" />} 
        />
        <Route 
          path="cadastro" 
          element={isLoggedIn ? <CadastroPage/> : <Navigate to="/login" />}
        />
        <Route path="editar/:id" element={<EdicaoPage />} />
      </Route>
    </Routes>
  );
}

export default App;