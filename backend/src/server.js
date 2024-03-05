const app = require('./app.js');
const dotenv = require('dotenv');

dotenv.config();
(async () => {
    const database = require('./config/db_config.js');

    console.log("sincronizando base de dados")
    console.log("##########################")
    await database.sync();
    console.log("##########################")

    if (database.authenticate()) {
        console.log('Conectado ao banco de dados');
    } else {
        console.log('Erro ao conectar ao banco de dados : ', error);
    }

    console.log("##########################")
    
})();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})