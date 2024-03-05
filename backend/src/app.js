const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes.js");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
routes(app);

module.exports = app;
