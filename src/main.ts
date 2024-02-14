import { Container } from "inversify";
import { App } from "./app";
import { ExceptionFilters } from "./errors/exception.filter";
import { LoggerService } from "./logger/logger.service";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IExceptionFilters } from "./errors/exception.filter.interface";
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import userModule from "./users/user.module";
import postModule  from "./post/post.module";

export interface IBootstrapRun{
    appContainer:Container,
    app:App
}


function bootstrap(){
    const appContainer = new Container();
    appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope()
    appContainer.bind<IExceptionFilters>(TYPES.ExceptionFilter).to(ExceptionFilters)
    appContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()   
    appContainer.bind<App>(TYPES.Application).to(App)
    const app = appContainer.get<App>(TYPES.Application)

    const controllers = [
        ...userModule.controllers,
        ...postModule.controllers
    ];

    // here we load custom modules
    appContainer.load(userModule.module)
    appContainer.load(postModule.module);
    
    //end 

    app.connectToDb();
   
    return {appContainer,app,controllers}
}
export const {appContainer,app,controllers} = bootstrap()
app.init(controllers);