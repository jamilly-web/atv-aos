const express = require('express');
const tarefaRoutes = require('./routes/tarefa');
const sequelize = require('./database');

const app = express();

app.use(express.json());

// Sincroniza o banco de dados de forma segura
sequelize.sync().catch(err => console.error("Erro ao sincronizar banco:", err));

// Registra as rotas
app.use(tarefaRoutes);

app.get('/', (req, res) => {
  res.json({ status: "API de Tarefas funcionando!" });
});

const PORT = process.env.PORT || 3000;

// Ouve localmente apenas se não estiver na Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando localmente na porta ${PORT}`);
  });
}

// OBRIGATÓRIO PARA A VERCEL: exportar o app
module.exports = app;