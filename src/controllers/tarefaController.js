import { z } from 'zod';
import tarefaService from '../services/tarefaService.js';

const uuidSchema = z.string().uuid({ message: 'O objectId deve ser um UUID válido.' });

const criarTarefaSchema = z.object({
  descricao: z
    .string({ required_error: 'A descrição é obrigatória.' })
    .min(1, { message: 'A descrição não pode estar vazia.' }),
  concluida: z.boolean().optional().default(false),
});

const atualizarTarefaSchema = z
  .object({
    descricao: z
      .string()
      .min(1, { message: 'A descrição não pode estar vazia.' })
      .optional(),
    concluida: z.boolean().optional(),
  })
  .refine((data) => data.descricao !== undefined || data.concluida !== undefined, {
    message: 'Informe ao menos "descricao" ou "concluida" para atualizar.',
  });

const create = async (req, res) => {
  try {
    const validacao = criarTarefaSchema.safeParse(req.body);

    if (!validacao.success) {
      return res.status(400).json({
        erro: 'Dados inválidos.',
        detalhes: validacao.error.flatten().fieldErrors,
      });
    }

    const tarefa = await tarefaService.criarTarefa(validacao.data);
    return res.status(201).json(tarefa);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao criar tarefa.', detalhes: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const tarefas = await tarefaService.listarTarefas();
    return res.status(200).json(tarefas);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao listar tarefas.', detalhes: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const validacaoId = uuidSchema.safeParse(req.params.objectId);
    if (!validacaoId.success) {
      return res.status(400).json({ erro: validacaoId.error.issues[0].message });
    }

    const tarefa = await tarefaService.buscarTarefaPorId(validacaoId.data);

    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    return res.status(200).json(tarefa);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao buscar tarefa.', detalhes: error.message });
  }
};

const update = async (req, res) => {
  try {
    const validacaoId = uuidSchema.safeParse(req.params.objectId);
    if (!validacaoId.success) {
      return res.status(400).json({ erro: validacaoId.error.issues[0].message });
    }

    const validacaoBody = atualizarTarefaSchema.safeParse(req.body);
    if (!validacaoBody.success) {
      return res.status(400).json({
        erro: 'Dados inválidos para atualização.',
        detalhes: validacaoBody.error.flatten(),
      });
    }

    const tarefaAtualizada = await tarefaService.atualizarTarefa(
      validacaoId.data,
      validacaoBody.data
    );

    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    return res.status(200).json(tarefaAtualizada);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao atualizar tarefa.', detalhes: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const validacaoId = uuidSchema.safeParse(req.params.objectId);
    if (!validacaoId.success) {
      return res.status(400).json({ erro: validacaoId.error.issues[0].message });
    }

    const deletada = await tarefaService.deletarTarefa(validacaoId.data);

    if (!deletada) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    return res.status(200).json({ mensagem: 'Tarefa removida com sucesso.' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao remover tarefa.', detalhes: error.message });
  }
};

export default {
  create,
  getAll,
  getById,
  update,
  remove,
};