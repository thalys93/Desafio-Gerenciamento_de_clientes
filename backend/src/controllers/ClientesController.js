const sequelize = require('sequelize')
const Cliente = require('./../models/Cliente.js')

class ClientesController {
    findClientes = async (req, res) => {
        try {
            const clientes = await Cliente.findAll({});
            if (clientes === 0) {
                return res
                .status(404)
                .json({ message: "Nenhum Cliente Encontrado", status: 404 });
            }
            
            return res.status(200).json({ found: clientes , status: 200});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    findClienteByUUID = async (req, res) => {
        const { UUID } = req.params;
        try {
            const cliente = await Cliente.findOne({
                where: {
                    UUID: UUID
                }
            });
            if (!cliente) {
                return res.status(404).json({ message: `Cliente com o UUID ${UUID} Não Foi Encontrado` });
            } else {
                return res.status(200).json(cliente);
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    createCliente = async (req, res) => {
        const cliente = req.body;

        try {
            const newCliente = await Cliente.create(cliente);
            return res.status(201).json({ status: 201, message: "Cliente criado com sucesso!", data: newCliente });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    updateCliente = async (req, res) => {
        const { UUID } = req.params;
        const newData = req.body;

        try {

            for (const key in newData) {
                if (newData[key] === "" || newData[key] === null || newData[key].trim === "") {
                    return res.status(400).json({ message: `Não é possível fazer uma requisição com campos vazios` });
                }
            }

            const cliente = await Cliente.findOne({
                where: {
                    cliente_id: UUID
                }
            });

            if (!cliente) {
                return res.status(404).json({ message: `Cliente com o UUID ${UUID} Não Foi Encontrado` });
            } else {
                await Cliente.update(newData, {
                    where: {
                        cliente_id: UUID
                    }
                });
                return res.status(200).json({ message: `Cliente com o UUID ${UUID} Atualizado com sucesso` , status: 200 });
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    deleteCliente = async (req, res) => {
        const { UUID } = req.params;
        try {
            const cliente = await Cliente.findOne({
                where: {
                    cliente_id: UUID
                }
            });
            
            if (!cliente) {
                return res.status(404).json({ message: `Cliente com o UUID ${UUID} Não Foi Encontrado` });
            } else {
                await Cliente.destroy({
                    where: {
                        cliente_id: UUID
                    }
                });
                return res.status(200).json({ message: `Cliente com o UUID ${UUID} Deletado com sucesso` , status: 200});
            }
            
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new ClientesController();