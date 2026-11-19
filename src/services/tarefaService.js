import Tarefa from '../models/tarefa.js';

const criarTarefa = async ({ descricao, concluida = false }) => {
  return await Tarefa.create({
    descricao,
    concluida,
  });
};

const listarTarefas = async () => {
  return await Tarefa.findAll();
};

const buscarTarefaPorId = async (objectId) => {
  return await Tarefa.findByPk(objectId);
};

const atualizarTarefa = async (objectId, dadosAtualizados) => {
  const tarefa = await Tarefa.findByPk(objectId);

  if (!tarefa) {
    return null;
  }

  if (dadosAtualizados.descricao !== undefined) {
    tarefa.descricao = dadosAtualizados.descricao;
  }

  if (dadosAtualizados.concluida !== undefined) {
    tarefa.concluida = dadosAtualizados.concluida;
  }

  await tarefa.save();
  return tarefa;
};

const deletarTarefa = async (objectId) => {
  const tarefa = await Tarefa.findByPk(objectId);

  if (!tarefa) {
    return false;
  }

  await tarefa.destroy();
  return true;
};

export default {
  criarTarefa,
  listarTarefas,
  buscarTarefaPorId,
  atualizarTarefa,
  deletarTarefa,
};