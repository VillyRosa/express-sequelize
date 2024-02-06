const { Op } = require('sequelize');

const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');

const cursoServices = new CursoServices();

class CursoController extends Controller {
  constructor() {
    super(cursoServices);
  }

  async pegaCursos(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    // Se existirem os parâmetros, criar um prop {}
    data_inicial || data_final ? where.data_inicio = {} : null;
    // Se existir data_inicial, adicionar a propriedade gte
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    // Se existir data_final, adicionar a propriedade lte
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    try {
      const listaCursos = await cursoServices.pegaTodosOsRegistros(where);
      return res.status(200).json(listaCursos);
    } catch (error) {
      console.error('Erro ao buscar cursos', error);
      res.status(500).json({ message: 'Erro ao buscar cursos' });
    }

  }
}

module.exports = CursoController;