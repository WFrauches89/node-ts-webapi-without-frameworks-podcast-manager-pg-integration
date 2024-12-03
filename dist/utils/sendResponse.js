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

// src/utils/sendResponse.ts
var sendResponse_exports = {};
__export(sendResponse_exports, {
  sendResponse: () => sendResponse
});
module.exports = __toCommonJS(sendResponse_exports);
var sendResponse = (res, statusCode, body) => {
  res.writeHead(statusCode, { "content-type": "application/json" /* JSON */ });
  if (body) {
    res.write(JSON.stringify(body));
  }
  res.end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendResponse
});
