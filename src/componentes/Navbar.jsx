import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Café do Amanhã</div>
      <ul className="nav-links">
        {["Início", "Sobre Nós", "Menu", "Pedidos", "Histórias", "Contato"].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
