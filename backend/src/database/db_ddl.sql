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
