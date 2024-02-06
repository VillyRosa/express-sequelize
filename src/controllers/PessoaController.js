const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor() {
    super(pessoaServices);
  }

  async pegaMatriculasAtivas(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudante(Number(estudante_id));
      return res.status(200).json(listaMatriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async pegaTodasAsMatriculas(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaTodasAsMatriculasPorEstudante(Number(estudante_id));
      return res.status(200).json(listaMatriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async pegaTodasAsPessoas(req, res) {
    try {
      const listaPessoas = await pessoaServices.pegaPessoasEscopoTodos();
      return res.status(200).json(listaPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async cancelaRegistroEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      await pessoaServices.cancelaPessoaEMatriculas(Number(estudante_id));
      return res.status(200).json({ message: `Matrículas ref. estudante ${estudante_id} canceladas` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;