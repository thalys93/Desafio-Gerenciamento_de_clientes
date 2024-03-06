const express = require("express");
const clientes = require("./ClientesRoutes.js");
const calculo = require("./CalculoRoutes.js");

const routes = (app) => {    

    app.route('/').get((req, res) => {
        res.json({message: "API FUNCIONANDO", status: 200});
        res.status(200);
    });    

    app.use(express.json());

    app.use("/api/", clientes)    
    app.use("/utils", calculo)

};

module.exports = routes;
