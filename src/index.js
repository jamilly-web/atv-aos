const express = require('express');
const tarefaRoutes = require('./routes/tarefa');
const sequelize = require('./database');

const app = express();

app.use(express.json());

// Sincroniza o banco de dados (Cria a tabela se não existir)
sequelize.sync().catch(err => console.error("Erro ao sincronizar banco:", err));

// Registra as rotas
app.use(tarefaRoutes);

app.get('/', (req, res) => {
  res.json({ status: "API de Tarefas funcionando!" });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando localmente na porta ${PORT}`);
  });
}

module.exports = app;