"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContainer = exports.app = exports.appBindings = void 0;
const inversify_1 = require("inversify");
const app_1 = require("./app");
const exception_filter_1 = require("./errors/exception.filter");
const logger_service_1 = require("./logger/logger.service");
const types_1 = require("./types");
const users_controller_1 = require("./users/users.controller");
const user_service_1 = require("./users/user.service");
const config_service_1 = require("./config/config.service");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./users/user.entity");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.Application).to(app_1.App);
});
function bootstrap() {
    const appContainer = new inversify_1.Container();
    appContainer.bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService).inSingletonScope();
    appContainer.bind(types_1.TYPES.ExceptionFilter).to(exception_filter_1.ExceptionFilters);
    appContainer.bind(types_1.TYPES.ConfigeService).to(config_service_1.ConfigService).inSingletonScope();
    appContainer.bind(types_1.TYPES.UserController).to(users_controller_1.UserController);
    appContainer.bind(types_1.TYPES.UserService).to(user_service_1.UserService);
    appContainer.bind(types_1.TYPES.Application).to(app_1.App);
    const app = appContainer.get(types_1.TYPES.Application);
    app.connectToDb();
    // appContainer.load(appBindings)
    // app.connectToDb();
    console.log("dsdsd");
    appContainer.bind(typeorm_1.Repository).toDynamicValue(() => {
        return (0, typeorm_1.getRepository)(user_entity_1.User);
    });
    app.init();
    return { appContainer, app };
}
_a = bootstrap(), exports.app = _a.app, exports.appContainer = _a.appContainer;
