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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const http_error_class_1 = require("./errors/http-error.class");
const inversify_1 = require("inversify");
const types_1 = require("./types");
require("reflect-metadata");
const body_parser_1 = require("body-parser");
const controllers_1 = require("./common/controllers");
const metadata_keys_1 = require("./utils/metadata.keys");
let App = exports.App = class App {
    constructor(logger, exceptionFilter, userController, config) {
        this.logger = logger;
        this.exceptionFilter = exceptionFilter;
        this.userController = userController;
        this.config = config;
        this.app = (0, express_1.default)();
        this.port = parseInt(config.get("PORT"));
    }
    useMiddleware() {
        this.app.use((0, body_parser_1.json)());
    }
    useRoutes() {
        const exRouter = express_1.default.Router();
        const info = [];
        controllers_1.controllers.forEach((controllerClass) => {
            const controllerInstance = new controllerClass();
            const basePath = Reflect.getMetadata(metadata_keys_1.MetadataKeys.BASE_PATH, controllerClass);
            const routers = Reflect.getMetadata(metadata_keys_1.MetadataKeys.ROUTERS, controllerClass);
            // const middlewares = Reflect.getMetadata(MetadataKeys.Middlewares,controllerClass);
            // console.log('miee',middlewares);
            const middlewares = { middlewares: [] };
            const m = Reflect.getOwnMetadataKeys(controllerInstance);
            console.log('ddddddddddddddd', m);
            routers.forEach(({ method, path, handler }) => {
                let handlers = controllerInstance[String(handler)].bind(controllerInstance);
                if (middlewares.middlewares.length) {
                    handlers = [...middlewares.middlewares, handlers];
                }
                exRouter[method](path, handlers);
                info.push({
                    api: `${method.toLocaleUpperCase()} ${basePath + path}`,
                    handler: `${controllerClass.name}.${String(handler)}`,
                });
            });
            this.app.use(basePath, exRouter);
        });
        // const router = this.app;
        // this.app.use('/users',this.userController.router);
        // router.use((req, res, next) => {
        //     console.log('Time: ', Date.now())
        //     next()
        // })
        exRouter.get('/login', (req, res, next) => {
            next(new http_error_class_1.HttpError(401, 'ramin'));
        });
        // this.app.use('/users',useRouter)
        console.table(info);
    }
    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.useMiddleware()
            this.useRoutes();
            this.useExceptionFilters();
            this.server = this.app.listen(this.port);
            this.logger.log(`Server run on port : ${this.port}`);
        });
    }
};
exports.App = App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ExceptionFilter)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UserController)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.ConfigeService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], App);
