const connection = require('../../database/connection');
const createToken = require('../utils/createToken');
const crypt = require('../utils/cryptPass');

module.exports = {
  async show(req, res) {
    const id = req.cli_id;
    try {
      const client = await connection('clients')
        .select(['id', 'name', 'surname', 'displayname', 'email'])
        .where('id', id);
      return res.json(client);
    } catch (err) {
      return res.status(500).json({
        message: 'Não foi possível processar sua requisição',
        status: 'could not show client',
        err,
      });
    }
  },
  async create(req, res) {
    const email = req.body.email;
    const password = crypt.encrypt(req.body.password);
    try {
      const clients = await connection('clients')
        .select('id')
        .where({ email, password })
        .first();

      if (!clients) {
        return res.status(500).json({
          message: 'Error ao logar',
        });
      }

      const token = createToken(clients.id);
      return res.status(204).header('x-access-token', token).send();
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: 'Não foi possível logar, confira suas credenciais',
        status: 'could not log in',
        error,
      });
    }
  },
};
