"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMiddlewareToMetadata = exports.ClassMiddleware = exports.Middleware = void 0;
const types_1 = require("./types");
const metadata_keys_1 = require("./metadata.keys");
function Middleware(middleware) {
    return (target, propertyKey) => {
        addMiddlewareToMetadata(target, propertyKey, middleware);
    };
}
exports.Middleware = Middleware;
function ClassMiddleware(middleware) {
    return (target) => {
        addMiddlewareToMetadata(target.prototype, types_1.classMetadataKey, middleware);
    };
}
exports.ClassMiddleware = ClassMiddleware;
function addMiddlewareToMetadata(target, metadataKey, middlewares) {
    let metadata = Reflect.getOwnMetadata(metadataKey, target);
    const controllerClass = target.constructor;
    let oldMiddlewares = Reflect.getMetadata(metadata_keys_1.MetadataKeys.Middlewares, controllerClass) ?
        Reflect.getMetadata(metadata_keys_1.MetadataKeys.Middlewares, controllerClass) : { middlewares: [] };
    if (!metadata) {
        metadata = {};
    }
    if (!metadata.middlewares) {
        metadata.middlewares = [];
    }
    let newArr = oldMiddlewares.middlewares;
    if (middlewares instanceof Array) {
        newArr = middlewares.slice();
    }
    else {
        newArr = [middlewares];
    }
    newArr.push(...oldMiddlewares.middlewares, ...metadata.middlewares);
    metadata.middlewares = newArr;
    Reflect.defineMetadata(metadataKey, metadata, controllerClass);
}
exports.addMiddlewareToMetadata = addMiddlewareToMetadata;
