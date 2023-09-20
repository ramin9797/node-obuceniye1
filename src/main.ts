import { Container, ContainerModule, interfaces } from "inversify";
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
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";

// async function bootstrap(){
//     const logger = new LoggerService();
//     const app = new App(logger,new ExceptionFilters(logger));
//     await app.init();
// }

// async function bootstrap(){
//     // 

//     const container = new Container();
//     container.bind<App>(TYPES.Application).to(App)
//     container.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope()
//     container.bind<IUserController>(TYPES.UserController).to(UserController)
//     container.bind<IUserService>(TYPES.UserService).to(UserService)
//     container.bind<IExceptionFilters>(TYPES.ExceptionFilter).to(ExceptionFilters)
//     // container.
//     const app = container.get<App>(TYPES.Application) 
//     app.init();
//     return {app,container}
// }

// bootstrap()

export interface IBootstrapRun{
    appContainer:Container,
    app:App
}

export const appBindings = new ContainerModule((bind:interfaces.Bind)=>{
    bind<App>(TYPES.Application).to(App)
    bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope()
    bind<IUserService>(TYPES.UserService).to(UserService)
    bind<IUserController>(TYPES.UserController).to(UserController)
    bind<IExceptionFilters>(TYPES.ExceptionFilter).to(ExceptionFilters)
    bind<IConfigService>(TYPES.ConfigeService).to(ConfigService).inSingletonScope()
})

function bootstrap():IBootstrapRun{
    const appContainer = new Container();
    appContainer.load(appBindings)
    const app = appContainer.get<App>(TYPES.Application)
    app.init();
    return {appContainer,app}
}

export const {app,appContainer} = bootstrap()
