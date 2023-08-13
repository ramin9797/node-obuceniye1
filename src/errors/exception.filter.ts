import { NextFunction, Request, Response } from "express";
import { ILogger } from "../logger/logger.interface";
import { IExceptionFilters } from "./exception.filter.interface";
import { HttpError } from "./http-error.class";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import 'reflect-metadata'
@injectable()
export class ExceptionFilters implements IExceptionFilters{

    constructor(@inject(TYPES.ILogger) protected logger:ILogger){

    }

    catch(err:Error | HttpError,req:Request,res:Response,next:NextFunction){
        if(err instanceof HttpError){
            // this.logger.error(`${err.context} ErrorCode: ${err.statusCode} , ${err.message}`);
            res.status(err.statusCode).send({err:err.message});
        }
        else {
            // this.logger.error(`Error : ${err.message}`);
            res.status(500).send({err:err.message});
        }

    }
}