"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleMiddleware3 = exports.simpleMiddleware2 = exports.simpleMiddleware = void 0;
function simpleMiddleware(req, res, next) {
    next();
}
exports.simpleMiddleware = simpleMiddleware;
function simpleMiddleware2(req, res, next) {
    next();
}
exports.simpleMiddleware2 = simpleMiddleware2;
function simpleMiddleware3(req, res, next) {
    next();
}
exports.simpleMiddleware3 = simpleMiddleware3;
