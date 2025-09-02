import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <nav className="navbar">
      <div className="logo">Aero-Clean</div>
      <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      <ul className={`nav-links ${menuAberto ? 'show' : ''}`}>
        <li><Link to="/">Produtos</Link></li>
        <li><Link to="/cadastro">Cadastrar Produto</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
