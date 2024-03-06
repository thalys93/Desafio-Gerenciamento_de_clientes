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
