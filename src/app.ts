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
        this.port = 8000;
    }


    useMiddleware(){
        this.app.use(json())
    }

    useRoutes(){
        const router = this.app;
        this.app.use('/users',this.userController.router);
        // router.use((req, res, next) => {
        //     console.log('Time: ', Date.now())
        //     next()
        // })

        // router.get('/login', (req, res,next) => {
        //      next(new HttpError(401,'ramin'))
        // })
        // this.app.use('/users',useRouter)

    }

    useExceptionFilters(){
        this.app.use(this.exceptionFilter.catch)
    }

    public async init(){
        this.useMiddleware()
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server run on port : ${this.port}`)
    }

}