/// <reference types="node" />
import { Express } from "express";
import { Server } from "http";
import { ILogger } from "./logger/logger.interface";
import { IExceptionFilters } from "./errors/exception.filter.interface";
import 'reflect-metadata';
import { IUserController } from "./users/users.controller.interface";
import { IConfigService } from "./config/config.service.interface";
export declare class App {
    logger: ILogger;
    exceptionFilter: IExceptionFilters;
    userController: IUserController;
    private config;
    app: Express;
    server: Server;
    port: number;
    constructor(logger: ILogger, exceptionFilter: IExceptionFilters, userController: IUserController, config: IConfigService);
    useMiddleware(): void;
    useRoutes(): void;
    useExceptionFilters(): void;
    init(): Promise<void>;
}
