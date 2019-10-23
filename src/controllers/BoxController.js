const Box = require('../models/Box');

// req = requisicao -> Tudo que vem do cliente para o servidor
// res = resposta -> Tudo que é enviado do servidor para o cliente
class BoxController {
  async store(req, res) {
    const box = await Box.create({ title: req.body.title });

    return res.json(box);
  }

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });

    return res.json(box);
  }
}

module.exports = new BoxController();