const tarefaService = require('../services/tarefaService');
const { z } = require('zod');

const criarTarefaSchema = z.object({
  descricao: z.string({ required_error: "A descrição é obrigatória" }).min(1, "A descrição não pode estar vazia"),
  concluida: z.boolean().optional().default(false)
});

const atualizarTarefaSchema = z.object({
  descricao: z.string().min(1).optional(),
  concluida: z.boolean().optional()
});

class TarefaController {
  async criar(req, res) {
    try {
      const dadosValidados = criarTarefaSchema.parse(req.body);
      const novaTarefa = await tarefaService.criar(dadosValidados);
      return res.status(201).json(novaTarefa);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ erro: error.errors });
      }
      return res.status(500).json({ erro: error.message });
    }
  }

  async listar(req, res) {
    try {
      const tarefas = await tarefaService.listar();
      return res.status(200).json(tarefas);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { objectId } = req.params;
      const tarefa = await tarefaService.buscarPorId(objectId);
      if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
      }
      return res.status(200).json(tarefa);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { objectId } = req.params;
      const dadosValidados = atualizarTarefaSchema.parse(req.body);
      const tarefaAtualizada = await tarefaService.atualizar(objectId, dadosValidados);
      if (!tarefaAtualizada) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
      }
      return res.status(200).json(tarefaAtualizada);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ erro: error.errors });
      }
      return res.status(500).json({ erro: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { objectId } = req.params;
      const resultado = await tarefaService.deletar(objectId);
      if (!resultado) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
      }
      return res.status(200).json({ mensagem: "Tarefa deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = new TarefaController();