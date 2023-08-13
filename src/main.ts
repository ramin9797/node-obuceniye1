import { Container } from "inversify";
import { App } from "./app";
import { ExceptionFilters } from "./errors/exception.filter";
import { LoggerService } from "./logger/logger.service";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IExceptionFilters } from "./errors/exception.filter.interface";
import { IUserController } from "./users/users.controller.interface";
import { UserController } from "./users/users.controller";
import { IUserService } from "./users/user.service.interface";
import { UserService } from "./users/user.service";

// async function bootstrap(){
//     const logger = new LoggerService();
//     const app = new App(logger,new ExceptionFilters(logger));
//     await app.init();
// }

// async function bootstrap(){
    // 

    const container = new Container();
    container.bind<App>(TYPES.Application).to(App)
    container.bind<ILogger>(TYPES.ILogger).to(LoggerService)
    container.bind<IUserController>(TYPES.UserController).to(UserController)
    container.bind<IUserService>(TYPES.UserService).to(UserService)
    container.bind<IExceptionFilters>(TYPES.ExceptionFilter).to(ExceptionFilters)
    // container.
    const app = container.get<App>(TYPES.Application) 
    app.init();
    export {app,container}
// }

// bootstrap()