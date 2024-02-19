import { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpError } from "../errors/http-error.class";


export const asyncWrapper = (action: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await action(req, res, next);
        } catch (error:any) {
            console.log(error,"error");
            if(error instanceof HttpError){
                return res.status(error.statusCode).json({error:error.message})
            }
            return res.status(401).json({error:"Internal Server Error"})
        }
    };
};



export const resultMiddleware = (action:RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let response =  await action(req, res, next);
            return res.status(200).json(response);
        } catch (error:any) {
           
        }
    };
};
