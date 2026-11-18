const { Router } = require('express');
const tarefaController = require('../controllers/tarefaController');

const router = Router();

router.post('/tarefas', (req, res) => tarefaController.criar(req, res));
router.get('/tarefas', (req, res) => tarefaController.listar(req, res));
router.get('/tarefas/:objectId', (req, res) => tarefaController.buscarPorId(req, res));
router.put('/tarefas/:objectId', (req, res) => tarefaController.atualizar(req, res));
router.delete('/tarefas/:objectId', (req, res) => tarefaController.deletar(req, res));

module.exports = router;