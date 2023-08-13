"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = exports.app = void 0;
const inversify_1 = require("inversify");
const app_1 = require("./app");
const exception_filter_1 = require("./errors/exception.filter");
const logger_service_1 = require("./logger/logger.service");
const types_1 = require("./types");
const users_controller_1 = require("./users/users.controller");
// async function bootstrap(){
//     const logger = new LoggerService();
//     const app = new App(logger,new ExceptionFilters(logger));
//     await app.init();
// }
// async function bootstrap(){
// 
const container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.TYPES.Application).to(app_1.App);
container.bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService);
container.bind(types_1.TYPES.UserController).to(users_controller_1.UserController);
container.bind(types_1.TYPES.ExceptionFilter).to(exception_filter_1.ExceptionFilters);
// container.
const app = container.get(types_1.TYPES.Application);
exports.app = app;
app.init();
// }
// bootstrap()
