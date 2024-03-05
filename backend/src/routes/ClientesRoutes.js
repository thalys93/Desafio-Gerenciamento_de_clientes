const express = require("express");
const ClienteController = require("./../controllers/ClientesController.js");

const router = express.Router();

router
	.get("/cliente", (req, res) => ClienteController.findClientes(req, res))
	.get("/cliente/:UUID", (req, res) =>
		ClienteController.findClienteByUUID(req, res)
	)
	.post("/cliente", (req, res) => ClienteController.createCliente(req, res))
	.put("/cliente/:UUID", (req, res) =>
		ClienteController.updateCliente(req, res)
	)
	.delete("/cliente/:UUID", (req, res) =>
		ClienteController.deleteCliente(req, res)
	);

module.exports = router;
