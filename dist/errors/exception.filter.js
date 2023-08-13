"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionFilters = void 0;
const http_error_class_1 = require("./http-error.class");
const inversify_1 = require("inversify");
const types_1 = require("../types");
require("reflect-metadata");
let ExceptionFilters = exports.ExceptionFilters = class ExceptionFilters {
    constructor(logger) {
        this.logger = logger;
    }
    catch(err, req, res, next) {
        if (err instanceof http_error_class_1.HttpError) {
            // this.logger.error(`${err.context} ErrorCode: ${err.statusCode} , ${err.message}`);
            res.status(err.statusCode).send({ err: err.message });
        }
        else {
            // this.logger.error(`Error : ${err.message}`);
            res.status(500).send({ err: err.message });
        }
    }
};
exports.ExceptionFilters = ExceptionFilters = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __metadata("design:paramtypes", [Object])
], ExceptionFilters);
