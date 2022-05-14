const Client = require("../models/client");

exports.createClient = async (req, res) => {
  try {
    // Must receive array of categories mandatory and additionals array not mandatory
    const client = new Client({ ...req.body });
    await client.save();
    res.status(201).send({ client });
  } catch (e) {
    res.status(400).send({ error: e });
  }
};

exports.getClientById = async (req, res) => {
    try {
      const client = await Client.findById(req.params.id);
      res.status(200).send({ client });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  };

  exports.getAllClients = async (req, res) => {
    try {
      const clients = await Clients.find()
      res.status(200).send({ clients });
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: e });
    }
  };