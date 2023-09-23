"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = exports.Methods = void 0;
const metadata_keys_1 = require("./metadata.keys");
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
})(Methods || (exports.Methods = Methods = {}));
const methodDecoratorFactory = (method) => {
    return (path) => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor;
            console.log(controllerClass);
            const routers = Reflect.getMetadata(metadata_keys_1.MetadataKeys.ROUTERS, controllerClass) ?
                Reflect.getMetadata(metadata_keys_1.MetadataKeys.ROUTERS, controllerClass) : [];
            routers.push({
                method,
                path,
                handler: propertyKey
            });
            Reflect.defineMetadata(metadata_keys_1.MetadataKeys.ROUTERS, routers, controllerClass);
        };
    };
};
exports.Get = methodDecoratorFactory(Methods.GET);
exports.Post = methodDecoratorFactory(Methods.POST);
