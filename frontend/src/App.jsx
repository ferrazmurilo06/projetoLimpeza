import React, { useContext } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/home.jsx';
import ProdutoLista from './pages/ProdutoLista.jsx';
import CadastroPage from './pages/CadastroPage.jsx';
import EdicaoPage from './pages/EdicaoPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import './App.css';

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

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route
          index
          element={isLoggedIn ? <Navigate to="/produtos" /> : <Home />}
        />

        <Route path="login" element={<LoginPage />} />

        <Route
          path="produtos"
          element={isLoggedIn ? <ProdutoLista /> : <Navigate to="/login" />}
        />
        <Route
          path="cadastro"
          element={isLoggedIn ? <CadastroPage /> : <Navigate to="/login" />}
        />

        <Route
          path="editar/:id"
          element={isLoggedIn ? <EdicaoPage /> : <Navigate to="/login" />}
        />

      </Route>
    </Routes>
  );
}

export default App;
