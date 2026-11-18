const Tarefa = require('../models/tarefa');
const { z } = require('zod');

// Esquema de validação com Zod
const tarefaSchema = z.object({
  titulo: z.string().min(1, 'O título da tarefa é obrigatório'),
  concluida: z.boolean().optional()
});

const tarefaController = {
  // Listar todas as tarefas
  async listar(req, res) {
    try {
      const tarefas = await Tarefa.findAll();
      return res.json(tarefas);
    } catch (error) {
      return res.status(500).json({ 
        erro: 'Erro ao listar tarefas', 
        detalhes: error.message 
      });
    }
  },

  // Criar uma nova tarefa
  async criar(req, res) {
    try {
      // Valida os dados enviados no body usando o Zod
      const dadosValidados = tarefaSchema.parse(req.body);
      
      const novaTarefa = await Tarefa.create(dadosValidados);
      return res.status(201).json(novaTarefa);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          erro: 'Dados inválidos', 
          detalhes: error.errors 
        });
      }
      return res.status(500).json({ 
        erro: 'Erro ao criar tarefa', 
        detalhes: error.message 
      });
    }
  }
};

module.exports = tarefaController;