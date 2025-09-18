import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Importe 'useNavigate'
import { AuthContext } from '../../context/AuthContext.jsx';
import "./Navbar.css";

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext); // Pega a função 'logout'
  const navigate = useNavigate(); // Hook para navegação

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
    navigate('/login'); // Redireciona para a página de login
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <nav className="navbar">
      <div className="logo">Aero-Clean</div>
      <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      <ul className={`nav-links ${menuAberto ? 'show' : ''}`}>
        {isLoggedIn ? (
          <>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/cadastro">Cadastrar Produto</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-button">Sair</button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Fazer Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;