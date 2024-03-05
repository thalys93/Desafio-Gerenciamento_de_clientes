const db = require("../_database");

async function insertData() {
    await db.connect();
    
    const queryCliente = `INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5)`;

    const valuesCliente_1 = ['Empresa Xy', 'EmpresaXY@corporativo.com', '123456789', '123', '456'];    
    const valuesCliente_2 = ['Atacados ltda', 'atacadosLimitada@corporativo.com', '987654321', '789', '654'];
        
    await db.query(queryCliente, valuesCliente_1);    
    await db.query(queryCliente, valuesCliente_2);

    await db.end();
    console.log("Dados inseridos com Sucesso");    
}

insertData();