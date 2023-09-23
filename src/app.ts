import express, {Express} from "express";
import {Server} from "http"
import { ILogger } from "./logger/logger.interface";
import { IExceptionFilters } from "./errors/exception.filter.interface";
import { HttpError } from "./errors/http-error.class";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import 'reflect-metadata'
import { IUserController } from "./users/users.controller.interface";
import { json } from "body-parser";
import { IConfigService } from "./config/config.service.interface";
import { controllers } from "./common/controllers";
import { MetadataKeys } from "./utils/metadata.keys";
import { IRouter } from "./utils/handlers.decorator";
import { BaseController } from "./common/base.controller";
import { classMetadataKey } from "./utils/types";

@injectable()
export class App {
    app:Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) public logger:ILogger,
        @inject(TYPES.ExceptionFilter) public exceptionFilter:IExceptionFilters,
        @inject(TYPES.UserController) public userController:IUserController,
        @inject(TYPES.ConfigeService) private config:IConfigService
    
    ){
        this.app = express();
        this.port = parseInt(config.get("PORT"));
    }


    useMiddleware(){
        this.app.use(json())
    }

    useRoutes(){
        const exRouter = express.Router();
        const info :Array<{api:string,handler:string}> = [];
        controllers.forEach((controllerClass)=>{
            const controllerInstance = new controllerClass() as any;
            const basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH,controllerClass);
            const routers:IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS,controllerClass);
            // const middlewares = Reflect.getMetadata(MetadataKeys.Middlewares,controllerClass);
            // console.log('miee',middlewares);
            const middlewares = {middlewares:[]};

            const classMiddlewares = Reflect.getMetadata(classMetadataKey,controllerClass) ||{middlewares:[]}
            // symbol use here for unique id
           
            routers.forEach(({method,path,handler})=>{
                const methodMidd = Reflect.getOwnMetadata(handler,controllerClass) || {}
                
                let handlers = controllerInstance[String(handler)].bind(controllerInstance);
                if(methodMidd.middlewares?.length){
                    handlers = [...classMiddlewares.middlewares,...methodMidd.middlewares,handlers];
                }

                exRouter[method](path,handlers)
                info.push({
                    api: `${method.toLocaleUpperCase()} ${basePath + path}`,
                    handler: `${controllerClass.name}.${String(handler)}`,
                });
            })
            this.app.use(basePath,exRouter);
        })


        // const router = this.app;
        // this.app.use('/users',this.userController.router);
        // router.use((req, res, next) => {
        //     console.log('Time: ', Date.now())
        //     next()
        // })

        exRouter.get('/login', (req, res,next) => {
             next(new HttpError(401,'ramin'))
        })
        // this.app.use('/users',useRouter)
        console.table(info);
    }

    useExceptionFilters(){
        this.app.use(this.exceptionFilter.catch)
    }

    public async init(){
        // this.useMiddleware()
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server run on port : ${this.port}`)
    }

}