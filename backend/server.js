const express = require('express');

const app = express();

app.use(express.json());

const PORTA = 3000;

// --- CONTRATANDO OS GERENTES DE ROTA ---
// A gente vai "contratar" um gerente para cada grupo de rotas que a Eduarda definiu
const produtosRouter = require('./routes/produtos.routes.js');
// const usersRouter = require('./routes/users.routes.js'); // Descomente quando o arquivo de usuários for criado
// const categoriasRouter = require('./routes/categorias.routes.js'); // Descomente quando o arquivo de categorias for criado

// --- DIRECIONANDO OS HÓSPEDES ---
// A "recepção" diz:
// Se chegar um pedido para o caminho '/api/produtos', mande para o gerente de produtos.
app.use('/api/produtos', produtosRouter);
// app.use('/api/users', usersRouter); // Descomente quando o arquivo de usuários for criado
// app.use('/api/categorias', categoriasRouter); // Descomente quando o arquivo de categorias for criado

// --- LIGANDO A CHAVE DO CARRO ---
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORTA}`);
});
