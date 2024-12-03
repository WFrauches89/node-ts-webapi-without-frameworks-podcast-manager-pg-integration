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

// src/database/pool.ts
var pool_exports = {};
__export(pool_exports, {
  default: () => pool_default
});
module.exports = __toCommonJS(pool_exports);
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

// src/database/pool.ts
var pool = new import_pg.Pool(clientConfig);
var pool_default = pool;
