"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_keys_1 = require("./metadata.keys");
const Controller = (basePath) => {
    return (target) => {
        //target is a class ( class = Function)
        Reflect.defineMetadata(metadata_keys_1.MetadataKeys.BASE_PATH, basePath, target);
    };
};
exports.default = Controller;
