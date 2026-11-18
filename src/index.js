const express = require('express');
const cors = require('cors');
const tarefaRoutes = require('./routes/tarefa');

const app = express();

// Middlewares essenciais
app.use(cors());
app.use(express.json());

// Rota de teste inicial para verificar se a API está online
app.get('/', (req, res) => {
  res.json({ status: 'API rodando com sucesso na Vercel!' });
});

// Registrar as rotas da aplicação
app.use('/api', tarefaRoutes);

// Exportar a aplicação para o Vercel Serverless Function
module.exports = app;