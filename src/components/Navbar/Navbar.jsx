import React from "react";
import { Link } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Aero-Clean</div>
      <ul className="nav-links">
        <li><Link to="/">Produtos</Link></li>
        <li><Link to="/cadastro">Cadastrar Produto</Link></li>
        <li>Editar Produto</li>
      </ul>
    </nav>
  );
}

export default Navbar;
