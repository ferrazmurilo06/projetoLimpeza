// src/components/Navbar.jsx
import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">AquaClean</div>
      <ul className="nav-links">
        <li>Início</li>
        <li>Produtos</li>
        <li>Sobre</li>
        <li>Contato</li>
      </ul>
    </nav>
  );
}

export default Navbar;
