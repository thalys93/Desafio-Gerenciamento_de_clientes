const db = require("../_database");

async function createTables() {
	await db.connect();

	await db.query(`
    CREATE TABLE IF NOT EXISTS clientes (
        cliente_id SERIAL PRIMARY KEY,
        nome VARCHAR(100),
        email VARCHAR(100),
        telefone VARCHAR(45)
        cordenada_x DECIMAL(10),
        cordenada_y DECIMAL(10)
      )`);


      await db.end()

      console.log("Tabelas criadas com Sucesso");
}

createTables();
