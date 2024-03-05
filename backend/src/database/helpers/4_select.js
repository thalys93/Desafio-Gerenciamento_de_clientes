const db = require("../_database");

async function selectData() {
    await db.connect();
    const query = `SELECT * FROM clientes`;
    const { rows } = await
    db.query(query);
    await db.end();
    console.log(rows);    
}

selectData();