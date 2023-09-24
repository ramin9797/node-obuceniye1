import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ExceptionFilters } from "./errors/exception.filter";
import { LoggerService } from "./logger/logger.service";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IExceptionFilters } from "./errors/exception.filter.interface";
import { IUserController } from "./users/users.controller.interface";
import { UserController } from "./users/users.controller";
import { UserService } from "./users/user.service";
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import { Repository, getRepository } from "typeorm";
import { User } from "./users/user.entity";

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
   


    

})

function bootstrap(){
    const appContainer = new Container();
    appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope()
    appContainer.bind<IExceptionFilters>(TYPES.ExceptionFilter).to(ExceptionFilters)
    appContainer.bind<UserController>(TYPES.UserController).to(UserController)

    appContainer.bind<IConfigService>(TYPES.ConfigeService).to(ConfigService).inSingletonScope()
    appContainer.bind<UserService>(TYPES.UserService).to(UserService)
    appContainer.bind<App>(TYPES.Application).to(App)
    const app = appContainer.get<App>(TYPES.Application)
    app.connectToDb();

   
    

   
    // appContainer.load(appBindings)
   
    // app.connectToDb();

    appContainer.bind<Repository<User>>(Repository).toDynamicValue(() => {
        return getRepository(User);
    });
    
   
    return {appContainer,app}
}
export const {appContainer,app} = bootstrap()
app.init();