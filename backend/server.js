const express = require('express');
const app = express();
app.use(express.json());
const PORTA = 3000;

const produtosRouter = require('./routes/produtos.routes.js');
const usersRouter = require('./routes/users.routes.js');
const categoriasRouter = require('./routes/categorias.routes.js');

app.use('/api/produtos', produtosRouter);
app.use('/api/users', usersRouter);
app.use('/api/categorias', categoriasRouter);

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORTA}`);
});
