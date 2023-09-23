"use strict";
/**
 * Route Decorators for the Overnight web-framework. Link to all routes for ExpressJS:
 * https://expressjs.com/en/api.html#routing-methods.
 *
 * created by Sean Maxwell Aug 27, 2018
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpVerb = exports.classMetadataKey = void 0;
exports.classMetadataKey = Symbol('Class Metadata Key');
var HttpVerb;
(function (HttpVerb) {
    HttpVerb["CHECKOUT"] = "checkout";
    HttpVerb["COPY"] = "copy";
    HttpVerb["DELETE"] = "delete";
    HttpVerb["GET"] = "get";
    HttpVerb["HEAD"] = "head";
    HttpVerb["LOCK"] = "lock";
    HttpVerb["MERGE"] = "merge";
    HttpVerb["MKACTIVITY"] = "mkactivity";
    HttpVerb["MKCOL"] = "mkcol";
    HttpVerb["MOVE"] = "move";
    HttpVerb["MSEARCH"] = "m-search";
    HttpVerb["NOTIFY"] = "notify";
    HttpVerb["OPTIONS"] = "options";
    HttpVerb["PATCH"] = "patch";
    HttpVerb["POST"] = "post";
    HttpVerb["PURGE"] = "purge";
    HttpVerb["PUT"] = "put";
    HttpVerb["REPORT"] = "report";
    HttpVerb["SEARCH"] = "search";
    HttpVerb["SUBSCRIBE"] = "subscribe";
    HttpVerb["TRACE"] = "trace";
    HttpVerb["UNLOCK"] = "unlock";
    HttpVerb["UNSUBSCRIBE"] = "unsubscribe";
})(HttpVerb || (exports.HttpVerb = HttpVerb = {}));
