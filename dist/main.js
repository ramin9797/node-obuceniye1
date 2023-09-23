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
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.Application).to(app_1.App);
    bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.UserService).to(user_service_1.UserService);
    bind(types_1.TYPES.UserController).to(users_controller_1.UserController);
    bind(types_1.TYPES.ExceptionFilter).to(exception_filter_1.ExceptionFilters);
    bind(types_1.TYPES.ConfigeService).to(config_service_1.ConfigService).inSingletonScope();
});
function bootstrap() {
    const appContainer = new inversify_1.Container();
    appContainer.load(exports.appBindings);
    const app = appContainer.get(types_1.TYPES.Application);
    app.init();
    return { appContainer, app };
}
_a = bootstrap(), exports.app = _a.app, exports.appContainer = _a.appContainer;
