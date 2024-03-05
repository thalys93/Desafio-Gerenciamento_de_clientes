const db = require ('../_database')

async function dropTables() {
    await db.connect()
    await db.query('DROP TABLE clientes CASCADE')    
    await db.end()

    console.log('Tabelas dropadas')
}

dropTables()