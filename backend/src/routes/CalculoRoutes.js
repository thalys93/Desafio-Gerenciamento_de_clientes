const express = require("express")
const CalculoController = require("./../controllers/CalculoController.js")

const router = express.Router();

router
    .post("/calculo", (req, res) => CalculoController.setCalculo(req, res))

module.exports = router;