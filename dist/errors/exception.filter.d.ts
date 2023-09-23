import { NextFunction, Request, Response } from "express";
import { ILogger } from "../logger/logger.interface";
import { IExceptionFilters } from "./exception.filter.interface";
import { HttpError } from "./http-error.class";
import 'reflect-metadata';
export declare class ExceptionFilters implements IExceptionFilters {
    protected logger: ILogger;
    constructor(logger: ILogger);
    catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void;
}
