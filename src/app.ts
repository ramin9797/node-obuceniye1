import express, {Express, Handler} from "express";
import 'reflect-metadata'
import {Server} from "http"
import { ILogger } from "./logger/logger.interface";
import { IExceptionFilters } from "./errors/exception.filter.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { json } from "body-parser";
import { IConfigService } from "./config/config.service.interface";
import { MetadataKeys } from "./utils/metadata.keys";
import { IRouter } from "./utils/handlers.decorator";
import { classMetadataKey } from "./utils/types";
import { createConnection } from "typeorm";
import { ormConfig } from "./ormconfig";
import { appContainer } from "./main";
import { asyncWrapper, resultMiddleware } from "./common/wrappers";
import {IMiddleware} from "./common/middleware.interface";

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
        let connected = false;
        let attempts = 0;
        while (!connected && attempts < 5) {    
            try {
                await createConnection(ormConfig);
              connected = true;
            } catch (err) {
              attempts++;
              console.error(`Connection to database failed (attempt ${attempts}):`);
              // Подождем некоторое время перед следующей попыткой (например, 5 секунд)
              await new Promise(resolve => setTimeout(resolve, 5000));
            }
          }
    }

    useRoutes(controllers:Function[]){
        const exRouter = express.Router();
        const info :Array<{api:string,handler:string}> = [];
        
        controllers.forEach((controllerClass:any)=>{
            let symbol = Symbol.for(controllerClass.name)
            const containerClass = appContainer.get<symbol>(symbol) as any;
            
            const basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH,controllerClass);
            const routers:IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS,controllerClass) || [];

            const classMiddlewares = Reflect.getMetadata(classMetadataKey,controllerClass) ||{middlewares:[]}
            // symbol use here for unique id


            const rabbitMqMethod = Reflect.getMetadata(MetadataKeys.RabbitMq,controllerClass);

            if(rabbitMqMethod) rabbitMqMethod();
            
            routers.forEach(({method,path,handler})=>{
                const methodMidd = Reflect.getOwnMetadata(handler,controllerClass) || {}
                let handlers:IMiddleware[] = []
                // let mainHandler = containerClass[String(handler)].bind(containerClass);
                
                let callBack = (...args: any[]): any => {
                    return containerClass[String(handler)].bind(containerClass)(...args);
                };

                callBack  = asyncWrapper(callBack);
                if(methodMidd.middlewares?.length){
                    handlers = [...classMiddlewares.middlewares,...methodMidd.middlewares];
                }
                let handlers3:Handler[] =  handlers.map(a=>{
                    return a.execute.bind(a);
                })

                let handlers2 = resultMiddleware(callBack);
                // exRouter[method](basePath + path,handlers2)
                info.push({
                    api: `${method.toLocaleUpperCase()} ${basePath + path}`,
                    handler: `${controllerClass.name}.${String(handler)}`,
                });
                this.app[method](basePath + path,handlers3,handlers2)
            })

            // console.log(exRouter,'exRouter2');
            
    
            this.app.use(exRouter);
        })
        console.table(info);

        
        // return controllers;
        
    }




    public async init(controllers:Function[]){
        this.app.use(express.json())
        this.useRoutes(controllers);
        this.server = this.app.listen(this.port);
        this.logger.log(`Server run on port : ${this.port}`)
    }
}