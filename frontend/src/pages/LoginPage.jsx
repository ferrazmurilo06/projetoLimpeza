import React, { useState, useContext } from "react"; // Adicione 'useState'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estados para guardar o e-mail, senha e a mensagem de erro
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (event) => {
    event.preventDefault(); // Evita que a página recarregue

    // Lógica de validação:
    if (email === "admin@aero.clean" && senha === "123") {
      setErro(''); // Limpa a mensagem de erro
      login(); // Chama a função de login
      navigate("/produtos"); // Redireciona para a página de produtos
    } else {
      setErro('Email ou senha incorretos.'); // Define a mensagem de erro
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Aero-Clean</h2>
        <p>Faça login para continuar</p>

        <form onSubmit={handleLogin}>
          {/* Exibe a mensagem de erro se o estado 'erro' não for vazio */}
          {erro && <p className="error-message">{erro}</p>}

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Digite seu email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="Digite sua senha" 
              required 
              value={senha}
              onChange={(e) => setSenha(e.target.value)} // Atualiza o estado
            />
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;