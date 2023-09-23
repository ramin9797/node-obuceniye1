import { Request,Response,NextFunction } from "express";

export function simpleMiddleware(req:Request,res:Response,next:NextFunction){
    console.log('1')
    next();
}

export function simpleMiddleware2(req:Request,res:Response,next:NextFunction){
    console.log('2')
    next();
}


export function simpleMiddleware3(req:Request,res:Response,next:NextFunction){
    console.log('3');
    
    next();
}