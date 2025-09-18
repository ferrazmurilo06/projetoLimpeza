import React, { createContext, useState } from 'react';

// 1. Criar o contexto
export const AuthContext = createContext();

// 2. Criar o Provedor (Provider)
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Função para fazer o login
  const login = () => {
    setIsLoggedIn(true);
  };

  // Função para fazer o logout
  const logout = () => {
    setIsLoggedIn(false);
  };

  // 3. Compartilhar o estado e as funções com a aplicação
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};