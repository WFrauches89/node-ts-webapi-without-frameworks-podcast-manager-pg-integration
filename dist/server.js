"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/server.ts
var http = __toESM(require("http"));

// src/database/pool.ts
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

// src/repositories/podcastRepository.ts
var getAllPodcastsRepository = (param) => __async(void 0, null, function* () {
  const query = `
    SELECT * FROM podcasts
    WHERE active = TRUE
    ${param ? `AND podcast_name LIKE $1` : ""};
  `;
  const values = param ? [`%${param}%`] : [];
  const { rows } = yield pool_default.query(query, values);
  return rows;
});
var createPodcastRepository = (newPodcast) => __async(void 0, null, function* () {
  const query = `
    INSERT INTO podcasts (video_id, podcast_name, episode, categories)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [
    newPodcast.videoId,
    newPodcast.podcastName,
    newPodcast.episode,
    newPodcast.categories
  ];
  try {
    const { rows } = yield pool_default.query(query, values);
    return rows[0];
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      if (error.code === "23505") {
        throw new Error("Cannot insert podcast: videoId already exists");
      }
    }
    throw error;
  }
});
var updatePodcastByIDRepository = (id, updatedPodcast) => __async(void 0, null, function* () {
  const query = `
    UPDATE podcasts
    SET podcast_name = $1, episode = $2, categories = $3, active = $4, updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *;
  `;
  const values = [
    updatedPodcast.podcastName,
    updatedPodcast.episode,
    updatedPodcast.categories,
    updatedPodcast.active,
    id
  ];
  const { rows } = yield pool_default.query(query, values);
  return rows[0] || null;
});
var partialUpdatePodcastRepository = (id, partialData) => __async(void 0, null, function* () {
  const setClauses = [];
  const values = [];
  if (partialData.podcastName) {
    setClauses.push(`podcast_name = $${setClauses.length + 1}`);
    values.push(partialData.podcastName);
  }
  if (partialData.episode) {
    setClauses.push(`episode = $${setClauses.length + 1}`);
    values.push(partialData.episode);
  }
  if (partialData.categories) {
    setClauses.push(`categories = $${setClauses.length + 1}`);
    values.push(partialData.categories);
  }
  if (partialData.active !== void 0) {
    setClauses.push(`active = $${setClauses.length + 1}`);
    values.push(partialData.active);
  }
  if (setClauses.length === 0) {
    return null;
  }
  const query = `
    UPDATE podcasts
    SET ${setClauses.join(", ")}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${setClauses.length + 1}
    RETURNING *;
  `;
  values.push(id);
  const { rows } = yield pool_default.query(query, values);
  return rows[0] || null;
});
var deletePodcastRepository = (id) => __async(void 0, null, function* () {
  const query = `
    DELETE FROM podcasts
    WHERE id = $1
    RETURNING *;
  `;
  const { rowCount } = yield pool_default.query(query, [id]);
  return (rowCount != null ? rowCount : 0) > 0;
});

// src/services/podcastService.ts
var getAllEpisodesService = () => __async(void 0, null, function* () {
  const data = yield getAllPodcastsRepository();
  return {
    statusCode: data.length > 0 ? 200 /* OK */ : 204 /* NO_CONTENT */,
    body: data
  };
});
var getFilteredPodcastsService = (param) => __async(void 0, null, function* () {
  const data = yield getAllPodcastsRepository(param);
  return {
    statusCode: data.length > 0 ? 200 /* OK */ : 204 /* NO_CONTENT */,
    body: data
  };
});
var createPodcastService = (newPodcast) => __async(void 0, null, function* () {
  const createdPodcast = yield createPodcastRepository(newPodcast);
  return {
    statusCode: 201 /* CREATED */,
    body: [createdPodcast]
  };
});
var updatePodcastService = (id, updatedPodcast) => __async(void 0, null, function* () {
  const updated = yield updatePodcastByIDRepository(id, updatedPodcast);
  if (!updated) {
    return {
      statusCode: 404 /* NOT_FOUND */,
      body: []
    };
  }
  return {
    statusCode: 200 /* OK */,
    body: [updated]
  };
});
var partialUpdatePodcastService = (id, partialData) => __async(void 0, null, function* () {
  const updated = yield partialUpdatePodcastRepository(id, partialData);
  if (!updated) {
    return {
      statusCode: 404 /* NOT_FOUND */,
      body: []
    };
  }
  return {
    statusCode: 200 /* OK */,
    body: [updated]
  };
});
var deletePodcastService = (id) => __async(void 0, null, function* () {
  const success = yield deletePodcastRepository(id);
  if (!success) {
    return {
      statusCode: 404 /* NOT_FOUND */,
      body: []
    };
  }
  return {
    statusCode: 204 /* NO_CONTENT */,
    body: []
  };
});

// src/controllers/podcastController.ts
var sendResponse = (res, statusCode, body) => {
  res.writeHead(statusCode, { "content-type": "application/json" /* JSON */ });
  res.write(JSON.stringify(body));
  res.end();
};
var sendError = (res, message) => {
  res.writeHead(400 /* BAD_REQUEST */, {
    "content-type": "application/json" /* JSON */
  });
  res.write(JSON.stringify({ error: message }));
  res.end();
};
var getAllEpisodes = (req, res) => __async(void 0, null, function* () {
  try {
    const dataContent = yield getAllEpisodesService();
    sendResponse(res, dataContent.statusCode, dataContent.body);
  } catch (error) {
    sendError(res, "Failed to fetch episodes");
  }
});
var getFilterPodcasts = (req, res, paramQueryString) => __async(void 0, null, function* () {
  try {
    const dataContent = yield getFilteredPodcastsService(paramQueryString);
    sendResponse(res, dataContent.statusCode, dataContent.body);
  } catch (error) {
    sendError(res, "Failed to fetch filtered podcasts");
  }
});
var createPodcast = (req, res) => __async(void 0, null, function* () {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => __async(void 0, null, function* () {
    try {
      const data = yield createPodcastService(JSON.parse(body));
      sendResponse(res, data.statusCode, data.body);
    } catch (error) {
      sendError(res, "Invalid JSON format for creating podcast");
    }
  }));
});
var updatePodcast = (req, res) => __async(void 0, null, function* () {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => __async(void 0, null, function* () {
    try {
      const _a = JSON.parse(body), { id } = _a, updatedPodcast = __objRest(_a, ["id"]);
      if (!id) {
        sendError(res, "id is required");
        return;
      }
      const data = yield updatePodcastService(id, updatedPodcast);
      sendResponse(res, data.statusCode, data.body);
    } catch (error) {
      sendError(res, "Invalid JSON format for updating podcast");
    }
  }));
});
var partialUpdatePodcast = (req, res) => __async(void 0, null, function* () {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => __async(void 0, null, function* () {
    try {
      const _a = JSON.parse(body), { id } = _a, partialData = __objRest(_a, ["id"]);
      if (!id) {
        sendError(res, "id is required");
        return;
      }
      const data = yield partialUpdatePodcastService(id, partialData);
      sendResponse(res, data.statusCode, data.body);
    } catch (error) {
      sendError(res, "Invalid JSON format for partial update of podcast");
    }
  }));
});
var deletePodcast = (req, res) => __async(void 0, null, function* () {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => __async(void 0, null, function* () {
    try {
      const { id } = JSON.parse(body);
      if (!id) {
        sendError(res, "id is required");
        return;
      }
      const data = yield deletePodcastService(id);
      sendResponse(res, data.statusCode, data.body);
    } catch (error) {
      sendError(res, "Invalid JSON body for deleting podcast");
    }
  }));
});

// src/routeManager.ts
function routeManager(request, response) {
  return __async(this, null, function* () {
    var _a, _b;
    const [baseURL, queryString] = (_b = (_a = request.url) == null ? void 0 : _a.split("?")) != null ? _b : [", "];
    if (request.method === "GET" /* GET */ && baseURL === "/api/list" /* LIST */) {
      yield getAllEpisodes(request, response);
    }
    if (request.method === "GET" /* GET */ && baseURL === "/api/podcasts" /* PODCAST */) {
      yield getFilterPodcasts(request, response, queryString);
    }
    if (request.method === "POST" /* POST */ && baseURL === "/api/podcasts" /* PODCAST */) {
      yield createPodcast(request, response);
    }
    if (request.method === "PUT" /* PUT */ && baseURL === "/api/podcasts" /* PODCAST */) {
      yield updatePodcast(request, response);
    }
    if (request.method === "PATCH" /* PATCH */ && baseURL === "/api/podcasts" /* PODCAST */) {
      yield partialUpdatePodcast(request, response);
    }
    if (request.method === "DELETE" /* DELETE */ && baseURL === "/api/podcasts" /* PODCAST */) {
      yield deletePodcast(request, response);
    }
  });
}

// src/app.ts
var app = (request, response) => __async(void 0, null, function* () {
  try {
    yield routeManager(request, response);
  } catch (error) {
    console.error("Erro ao inicializar a aplica\xE7\xE3o:", error);
    response.statusCode = 500;
    response.end("Erro interno no servidor");
  }
});

// src/database/client.ts
var import_pg2 = require("pg");
var client = new import_pg2.Client(clientConfig);
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

// src/server.ts
var server = http.createServer(app);
var log = console.log;
var port = process.env.PORT;
server.listen(port, () => __async(exports, null, function* () {
  log(`Conex\xE3o estabelecida, rodando na porta ${port}!`);
  yield createTable();
}));
