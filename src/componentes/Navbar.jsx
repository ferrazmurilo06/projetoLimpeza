import React from "react";
import { Link } from 'react-router-dom';
import "./Navbar.css";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Aero Aqua</div>
      <ul className="nav-links">
        <li><Link to="/">Início</Link></li>
        <li><Link to="/cadastro">Cadastro</Link></li>
        <li>Sobre Nós</li>
        <li>Menu</li>
        <li>Pedidos</li>
        <li>Histórias</li>
        <li>Contato</li>
      </ul>
    </nav>
  );
}

export default Navbar;