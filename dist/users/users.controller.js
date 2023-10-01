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
exports.UserController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const http_error_class_1 = require("../errors/http-error.class");
const controller_decorator_1 = __importDefault(require("../utils/controller.decorator"));
const handlers_decorator_1 = require("../utils/handlers.decorator");
const middleware_decorator_1 = require("../utils/middleware.decorator");
const simple_middleware_1 = require("../common/simple.middleware");
const user_service_1 = require("./user.service");
let UserController = exports.UserController = class UserController extends base_controller_1.BaseController {
    constructor(logger, userService, config) {
        super();
        this.logger = logger;
        this.userService = userService;
        this.config = config;
    }
    allUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.userService.allUsers();
            console.log('res', result);
            res.status(200).json({
                message: "good"
            });
        });
    }
    allUser2(req, res) {
        res.status(200).json({
            message: "good"
        });
    }
    login(req, res, next) {
        console.log('req', req.user);
        next(new http_error_class_1.HttpError(401, 'Error auth', 'login'));
    }
    register({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userService.createUser(body);
            console.log('resssss', result);
            this.ok(res, result);
        });
    }
};
__decorate([
    (0, handlers_decorator_1.Get)("/all"),
    (0, middleware_decorator_1.Middleware)([simple_middleware_1.simpleMiddleware2, simple_middleware_1.simpleMiddleware]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "allUser", null);
__decorate([
    (0, handlers_decorator_1.Get)("/all2"),
    (0, middleware_decorator_1.Middleware)([simple_middleware_1.simpleMiddleware2]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "allUser2", null);
__decorate([
    (0, handlers_decorator_1.Post)("/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, handlers_decorator_1.Post)("/register"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
exports.UserController = UserController = __decorate([
    (0, inversify_1.injectable)(),
    (0, controller_decorator_1.default)("/users")
    // @ClassMiddleware(simpleMiddleware3)
    ,
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ConfigeService)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService, Object])
], UserController);
