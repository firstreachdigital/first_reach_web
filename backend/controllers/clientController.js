const Client = require("../models/Client");
const fs = require("fs");
const path = require("path");

// Public: Get all active clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find({ isActive: true }).sort({ order: 1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ order: 1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Create client
exports.createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin: Update client
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin: Delete client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client?.logo) {
      const logoPath = path.join(__dirname, "..", client.logo);
      if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);
    }
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
