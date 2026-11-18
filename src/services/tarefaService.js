const Tarefa = require('../models/tarefa');

class TarefaService {
  async criar(dados) {
    return await Tarefa.create(dados);
  }

  async listar() {
    return await Tarefa.findAll();
  }

  async buscarPorId(objectId) {
    return await Tarefa.findByPk(objectId);
  }

  async atualizar(objectId, dados) {
    const tarefa = await Tarefa.findByPk(objectId);
    if (!tarefa) return null;
    return await tarefa.update(dados);
  }

  async deletar(objectId) {
    const tarefa = await Tarefa.findByPk(objectId);
    if (!tarefa) return null;
    await tarefa.destroy();
    return true;
  }
}

module.exports = new TarefaService();