const sequelize = require('sequelize');
const Cliente = require('../models/Cliente.js');

class CalculoController {
    setCalculo = async (req, res) => {
        const valores = req.body;
        try {
            const clientes = await Cliente.findAll({});
            if (clientes.lenght === 0) {
                return res.status(404).json({ message: "Nenhum Cliente Encontrado", status: 404 });
            }

            const rotaOtimizada = this.calcularRotaOtimizada(clientes, valores);

            return res.status(200).json({ rotaOtimizada, status: 200 });
        } catch (error) {            
            return res.status(500).json(error.message);
        }      
    }

    calcularRotaOtimizada = (clientes, valores) => {
        const { x, y } = valores;

        const rotaOtimizada = clientes.sort((a, b) => {
            const distanciaA = this.calcularDistancia(a.coordenada_x, a.coordenada_y, x, y);
            const distanciaB = this.calcularDistancia(b.coordenada_x, b.coordenada_y, x, y);
            return distanciaA - distanciaB;
        });

        return rotaOtimizada;
    }

    calcularDistancia = (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
}

module.exports = new CalculoController();