import { Request,Response,NextFunction } from "express";

export function simpleMiddleware(req:Request,res:Response,next:NextFunction){
    next();
}

export function simpleMiddleware2(req:Request,res:Response,next:NextFunction){
    next();
}


export function simpleMiddleware3(req:Request,res:Response,next:NextFunction){
    next();
}