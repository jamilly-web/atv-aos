const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

// Rota para listar todas as tarefas
router.get('/tarefas', tarefaController.listar);

// Rota para criar uma nova tarefa
router.post('/tarefas', tarefaController.criar);

module.exports = router;