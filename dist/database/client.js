"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/database/client.ts
var client_exports = {};
__export(client_exports, {
  createTable: () => createTable
});
module.exports = __toCommonJS(client_exports);
var import_pg = require("pg");

// src/models/DBClientConfig.ts
if (!process.env.USER || !process.env.POSTGRES_DB || !process.env.PASSWORD) {
  throw new Error("Vari\xE1veis de ambiente necess\xE1rias n\xE3o est\xE3o definidas");
}
var clientConfig = {
  user: process.env.USER,
  host: "localhost",
  database: process.env.POSTGRES_DB,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORTPG || "5432", 10)
};

// src/database/client.ts
var client = new import_pg.Client(clientConfig);
var createTable = () => __async(void 0, null, function* () {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS podcasts (
      id SERIAL PRIMARY KEY,
      video_id VARCHAR(255) UNIQUE NOT NULL,
      podcast_name VARCHAR(255) NOT NULL,
      episode VARCHAR(255) NOT NULL,
      categories TEXT[],
      active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const createTriggerFunctionQuery = `
    CREATE OR REPLACE FUNCTION update_podcast_updated_at() 
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;
  const createTriggerQuery = `
    CREATE TRIGGER update_podcast_before_update
    BEFORE UPDATE ON podcasts
    FOR EACH ROW
    EXECUTE FUNCTION update_podcast_updated_at();
  `;
  try {
    yield client.connect();
    console.log("Conectado ao banco de dados.");
    yield client.query(createTableQuery);
    console.log("Tabela criada com sucesso!");
    yield client.query(createTriggerFunctionQuery);
    console.log("Fun\xE7\xE3o do trigger criada com sucesso!");
    yield client.query(createTriggerQuery);
    console.log("Trigger criado com sucesso!");
  } catch (err) {
    console.error("Erro ao criar a tabela ou trigger:", err);
  } finally {
    yield client.end();
    console.log("Conex\xE3o com o banco de dados encerrada.");
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createTable
});
