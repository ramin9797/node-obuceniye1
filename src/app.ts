import express, {Express, Handler} from "express";
import 'reflect-metadata'
import {Server} from "http"
import { ILogger } from "./logger/logger.interface";
import { IExceptionFilters } from "./errors/exception.filter.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { json } from "body-parser";
import { IConfigService } from "./config/config.service.interface";
import { controllers } from "./common/controllers";
import { MetadataKeys } from "./utils/metadata.keys";
import { IRouter } from "./utils/handlers.decorator";
import { classMetadataKey } from "./utils/types";
import { createConnection } from "typeorm";
import { ormConfig } from "./ormconfig";
import { appContainer } from "./main";
import { asyncWrapper, resultMiddleware } from "./common/wrappers";

@injectable()
export class App {
    app:Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) public logger:ILogger,
        @inject(TYPES.ExceptionFilter) public exceptionFilter:IExceptionFilters,
        @inject(TYPES.ConfigService) private config:IConfigService
    
    ){
        this.app = express();
        this.port = parseInt(config.get("PORT"));
    }


    useMiddleware(){
        this.app.use(json())
    }

    async connectToDb(){
         await createConnection(ormConfig);
    }

    useRoutes(){
        const exRouter = express.Router();
        const info :Array<{api:string,handler:string}> = [];
        
        controllers.forEach((controllerClass)=>{
            let symbol = Symbol.for(controllerClass.name)
            const containerClass = appContainer.get<symbol>(symbol) as any;
            
            const basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH,controllerClass);
            const routers:IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS,controllerClass);

            const classMiddlewares = Reflect.getMetadata(classMetadataKey,controllerClass) ||{middlewares:[]}
            // symbol use here for unique id
           
            routers.forEach(({method,path,handler})=>{
                const methodMidd = Reflect.getOwnMetadata(handler,controllerClass) || {}
                let handlers:Handler[] = []
                // let mainHandler = containerClass[String(handler)].bind(containerClass);

                let callBack = (...args: any[]): any => {
                    return containerClass[String(handler)].bind(containerClass)(...args);
                };

                callBack  = asyncWrapper(callBack);
               
                if(methodMidd.middlewares?.length){
                    handlers = [...classMiddlewares.middlewares,...methodMidd.middlewares,callBack];
                }
                
                let handlers2 = resultMiddleware(callBack);
                exRouter[method](path,handlers2)
                info.push({
                    api: `${method.toLocaleUpperCase()} ${basePath + path}`,
                    handler: `${controllerClass.name}.${String(handler)}`,
                });
            })
            this.app.use(basePath,exRouter);
        })
        console.table(info);
    }


    public async init(){
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server run on port : ${this.port}`)
    }
}