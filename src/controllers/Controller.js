class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeRegistros = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistros);
    } catch (error) {
      console.error(error);
    }
  }

  async pegaUmPorId(req, res) {
    const { id } = req.params;
    try {
      const registro = await this.entidadeService.pegaUmRegistroPorId(id);
      if (!registro) return res.status(404).json({ message: `id ${id} não encontrado` });
      return res.status(200).json(registro);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar' });
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
      return res.status(200).json(novoRegistroCriado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar' });
    }
  }

  async atualiza(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id));
      if (!foiAtualizado) return res.status(404).json({ message: `id ${id} não atualizado` });
      return res.status(200).json({ message: `id ${id} atualizado` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar' });
    }
  }

  async exclui(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluiRegistro(id);
      return res.status(200).json({ message: `id ${id} deletado` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao deletar' });
    }
  }
}

module.exports = Controller;