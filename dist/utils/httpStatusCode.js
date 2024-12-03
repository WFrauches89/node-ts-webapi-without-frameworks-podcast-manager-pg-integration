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

// src/utils/httpStatusCode.ts
var httpStatusCode_exports = {};
__export(httpStatusCode_exports, {
  httpStatusCode: () => httpStatusCode
});
module.exports = __toCommonJS(httpStatusCode_exports);
var httpStatusCode = /* @__PURE__ */ ((httpStatusCode2) => {
  httpStatusCode2[httpStatusCode2["CONTINUE"] = 100] = "CONTINUE";
  httpStatusCode2[httpStatusCode2["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
  httpStatusCode2[httpStatusCode2["PROCESSING"] = 102] = "PROCESSING";
  httpStatusCode2[httpStatusCode2["OK"] = 200] = "OK";
  httpStatusCode2[httpStatusCode2["CREATED"] = 201] = "CREATED";
  httpStatusCode2[httpStatusCode2["ACCEPTED"] = 202] = "ACCEPTED";
  httpStatusCode2[httpStatusCode2["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
  httpStatusCode2[httpStatusCode2["NO_CONTENT"] = 204] = "NO_CONTENT";
  httpStatusCode2[httpStatusCode2["RESET_CONTENT"] = 205] = "RESET_CONTENT";
  httpStatusCode2[httpStatusCode2["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
  httpStatusCode2[httpStatusCode2["MULTI_STATUS"] = 207] = "MULTI_STATUS";
  httpStatusCode2[httpStatusCode2["ALREADY_REPORTED"] = 208] = "ALREADY_REPORTED";
  httpStatusCode2[httpStatusCode2["IM_USED"] = 226] = "IM_USED";
  httpStatusCode2[httpStatusCode2["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
  httpStatusCode2[httpStatusCode2["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
  httpStatusCode2[httpStatusCode2["FOUND"] = 302] = "FOUND";
  httpStatusCode2[httpStatusCode2["SEE_OTHER"] = 303] = "SEE_OTHER";
  httpStatusCode2[httpStatusCode2["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
  httpStatusCode2[httpStatusCode2["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
  httpStatusCode2[httpStatusCode2["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
  httpStatusCode2[httpStatusCode2["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  httpStatusCode2[httpStatusCode2["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  httpStatusCode2[httpStatusCode2["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
  httpStatusCode2[httpStatusCode2["FORBIDDEN"] = 403] = "FORBIDDEN";
  httpStatusCode2[httpStatusCode2["NOT_FOUND"] = 404] = "NOT_FOUND";
  httpStatusCode2[httpStatusCode2["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
  httpStatusCode2[httpStatusCode2["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
  httpStatusCode2[httpStatusCode2["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
  httpStatusCode2[httpStatusCode2["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
  httpStatusCode2[httpStatusCode2["CONFLICT"] = 409] = "CONFLICT";
  httpStatusCode2[httpStatusCode2["GONE"] = 410] = "GONE";
  httpStatusCode2[httpStatusCode2["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
  httpStatusCode2[httpStatusCode2["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
  httpStatusCode2[httpStatusCode2["PAYLOAD_TOO_LARGE"] = 413] = "PAYLOAD_TOO_LARGE";
  httpStatusCode2[httpStatusCode2["URI_TOO_LONG"] = 414] = "URI_TOO_LONG";
  httpStatusCode2[httpStatusCode2["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
  httpStatusCode2[httpStatusCode2["RANGE_NOT_SATISFIABLE"] = 416] = "RANGE_NOT_SATISFIABLE";
  httpStatusCode2[httpStatusCode2["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
  httpStatusCode2[httpStatusCode2["IM_A_TEAPOT"] = 418] = "IM_A_TEAPOT";
  httpStatusCode2[httpStatusCode2["MISDIRECTED_REQUEST"] = 421] = "MISDIRECTED_REQUEST";
  httpStatusCode2[httpStatusCode2["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
  httpStatusCode2[httpStatusCode2["LOCKED"] = 423] = "LOCKED";
  httpStatusCode2[httpStatusCode2["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
  httpStatusCode2[httpStatusCode2["TOO_EARLY"] = 425] = "TOO_EARLY";
  httpStatusCode2[httpStatusCode2["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
  httpStatusCode2[httpStatusCode2["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
  httpStatusCode2[httpStatusCode2["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
  httpStatusCode2[httpStatusCode2["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
  httpStatusCode2[httpStatusCode2["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
  httpStatusCode2[httpStatusCode2["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
  httpStatusCode2[httpStatusCode2["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
  httpStatusCode2[httpStatusCode2["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
  httpStatusCode2[httpStatusCode2["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
  httpStatusCode2[httpStatusCode2["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
  httpStatusCode2[httpStatusCode2["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
  httpStatusCode2[httpStatusCode2["VARIANT_ALSO_NEGOTIATES"] = 506] = "VARIANT_ALSO_NEGOTIATES";
  httpStatusCode2[httpStatusCode2["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
  httpStatusCode2[httpStatusCode2["LOOP_DETECTED"] = 508] = "LOOP_DETECTED";
  httpStatusCode2[httpStatusCode2["NOT_EXTENDED"] = 510] = "NOT_EXTENDED";
  httpStatusCode2[httpStatusCode2["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
  return httpStatusCode2;
})(httpStatusCode || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  httpStatusCode
});
