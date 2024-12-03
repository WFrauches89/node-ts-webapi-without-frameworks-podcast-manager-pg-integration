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

// src/services/podcastService.ts
var podcastService_exports = {};
__export(podcastService_exports, {
  createPodcastService: () => createPodcastService,
  deletePodcastService: () => deletePodcastService,
  getAllEpisodesService: () => getAllEpisodesService,
  getFilteredPodcastsService: () => getFilteredPodcastsService,
  partialUpdatePodcastService: () => partialUpdatePodcastService,
  updatePodcastService: () => updatePodcastService
});
module.exports = __toCommonJS(podcastService_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPodcastService,
  deletePodcastService,
  getAllEpisodesService,
  getFilteredPodcastsService,
  partialUpdatePodcastService,
  updatePodcastService
});
