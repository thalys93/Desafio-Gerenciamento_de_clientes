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
