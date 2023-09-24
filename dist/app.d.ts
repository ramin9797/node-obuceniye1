/// <reference types="node" />
import { Express } from "express";
import { Server } from "http";
import { ILogger } from "./logger/logger.interface";
import { IExceptionFilters } from "./errors/exception.filter.interface";
import 'reflect-metadata';
import { IConfigService } from "./config/config.service.interface";
export declare class App {
    logger: ILogger;
    exceptionFilter: IExceptionFilters;
    private config;
    app: Express;
    server: Server;
    port: number;
    constructor(logger: ILogger, exceptionFilter: IExceptionFilters, config: IConfigService);
    useMiddleware(): void;
    connectToDb(): Promise<void>;
    useRoutes(): void;
    useExceptionFilters(): void;
    init(): Promise<void>;
}
