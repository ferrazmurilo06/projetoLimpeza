import React from "react";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Aero-Clean</h2>
        <p>Faça login para continuar</p>

        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Digite seu email" required />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" required />
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
