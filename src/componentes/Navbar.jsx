import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Aero-Clean</div>
      <ul className="nav-links">
        <li>Produtos</li>
        <li>Cadastrar Produto</li>
        <li>Editar Produto</li>
      </ul>
    </nav>
  );
}

export default Navbar;
