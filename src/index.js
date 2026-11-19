import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { sequelize } from './models/tarefa.js';
import tarefaRoutes from './routes/tarefa.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ status: 'API de Tarefas online!' });
});

app.use('/tarefas', tarefaRoutes);

const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
});

export default app;