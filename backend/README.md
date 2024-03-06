# Backend - Gerenciamento de Clientes

Este repositório hospeda a aplicação Backend do sistema de Gerenciamento de Clientes. Aqui estão os principais componentes e funcionalidades incorporadas ao Backend.

## Framework e Roteamento

- **Express.js:** Utilizado como framework principal para facilitar o desenvolvimento de aplicativos web robustos e escaláveis, proporcionando uma estrutura organizada para o backend.

- **Rotas da API:** Implementa rotas para manipulação de dados relacionados aos clientes, incluindo operações como listagem, inserção, atualização e exclusão.

## Conexão com o PostgreSQL

- **PostgreSQL e pgAdmin:** Estabelece conexão com o banco de dados PostgreSQL, gerenciado visualmente pelo pgAdmin para facilitar a administração e visualização dos dados.

- **Sequelize:** Utiliza o Sequelize como ORM (Object-Relational Mapping) para simplificar a interação com o banco de dados PostgreSQL, facilitando operações como inserção de dados e consultas.

## Estrutura do Banco de Dados

- **Pasta Database:** Contém scripts SQL e outros helpers necessários para criar e manter a estrutura do banco de dados. Esses scripts podem incluir a criação de tabelas, índices, e outras configurações necessárias para o bom funcionamento do sistema.

## Instruções de Execução

Antes de iniciar o Backend, certifique-se de instalar as dependências necessárias utilizando o comando:

```bash
npm install
```

Após a instalação das dependências, inicie o servidor com:

```bash
npm run dev
```

# Código de Cáculo Bidimensional
```javascript
setCalculo = async (req, res) => {
        const valores = req.body; // pega os dados da requisição
        try {
            const clientes = await Cliente.findAll({}); // busca os clientes no banco de dados
            if (clientes.lenght === 0) {
                return res.status(404).json({ message: "Nenhum Cliente Encontrado", status: 404 }); // verifica se existem clientes
            }

            const rotaOtimizada = this.calcularRotaOtimizada(clientes, valores); // executa função de calculo

            return res.status(200).json({ rotaOtimizada, status: 200 }); // retorna os dados com as informações http
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
```

## Database/Helpers
Contém os scripts necessários para a limpeza do banco, criação da tabela, inserção de dados e seleção dos mesmos.

### Limpeza da tabela 
```javascript
const db = require ('../_database')

async function dropTables() {
    await db.connect()
    await db.query('DROP TABLE clientes CASCADE')    
    await db.end()

    console.log('Tabelas dropadas')
}

dropTables()
```

### Criação da tabela
```javascript

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
```

### Inserção dos dados
```javascript
const db = require("../_database");

async function insertData() {
	await db.connect();
	const queryEmpresa = `INSERT INTO clientes (cliente_id, nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5, $6)`;
    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
              v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          });
    }
	const valuesEmpresa_1 = [   
        generateUUID(),     
		"EcoTech Solutions",
		"info@ecotechsolutions.com",
		"(555) 123-4567",
		0.0,
		0.0,
	];
	const valuesEmpresa_2 = [
        generateUUID(),
		"Global Innovations Inc.",
		"contact@globalinnovations.com",
		"(555) 987-6543",
		34.5,
		-18.8,
	];
	const valuesEmpresa_3 = [
        generateUUID(),
		"FuturaWare Technologies",
		"support@futurawaretech.net",
		"(555) 234-5678",
		40.7,
		-74.0,
	];
	const valuesEmpresa_4 = [
        generateUUID(),
		"NebulaCraft Studios",
		"info@nebulacraftstudios.com",
		"(555) 876-5432",
		37.77,
		-22.4,
	];
	const valuesEmpresa_5 = [
        generateUUID(),
		"Quantum Logistics Ltd.",
		"logistics@quantumlogistics.co",
		"(555) 345-6789",
		51.5,
		-0.1,
	];
	const valuesEmpresa_6 = [
        generateUUID(),
		"Solaris Energy Solutions",
		"info@solarisenergy.net",
		"(555) 654-3210",
		37.7,
		-22.4,
	];
	const valuesEmpresa_7 = [
        generateUUID(),
		"TechNest Robotics",
		"hello@technestrobotics.io",
		"(555) 789-0123",
		32.7,
		-96.7,
	];
	const valuesEmpresa_8 = [
        generateUUID(),
		"AquaVibe Aquaculture",
		"contact@aquavibe.com",
		"(555) 210-9876",
		25.7,
		-80.1,
	];
	const valuesEmpresa_9 = [
        generateUUID(),
		"InnoStyle Fashion Hub",
		"info@innostylefashion.com",
		"(555) 432-1098",
		34.0,
		-8.2,
	];
	const valuesEmpresa_10 = [
        generateUUID(),
		"Skyline Aviation Services",
		"info@skylineaviation.net",
		"(555) 789-6543",
		41.8,
		-87.6,
	];

	await db.query(queryEmpresa, valuesEmpresa_1);
	await db.query(queryEmpresa, valuesEmpresa_2);
	await db.query(queryEmpresa, valuesEmpresa_3);
	await db.query(queryEmpresa, valuesEmpresa_4);
	await db.query(queryEmpresa, valuesEmpresa_5);
	await db.query(queryEmpresa, valuesEmpresa_6);
	await db.query(queryEmpresa, valuesEmpresa_7);
	await db.query(queryEmpresa, valuesEmpresa_8);
	await db.query(queryEmpresa, valuesEmpresa_9);
	await db.query(queryEmpresa, valuesEmpresa_10);

	await db.end();
	console.log("Dados inseridos com Sucesso");
}

insertData();
```

### Seleção dos dados
```javascript
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

```

# Código de criação SQL
```SQL
-- Criar esquema
CREATE SCHEMA IF NOT EXISTS desafio_clientes;

-- Usar o esquema
SET search_path TO desafio_clientes;

-- Criar tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
  cliente_id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  telefone VARCHAR(45)
  coordenada_x DECIMAL(10),
  coordenada_y DECIMAL(10)
);
```
