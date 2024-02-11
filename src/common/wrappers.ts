import { NextFunction, Request, RequestHandler, Response } from "express";


export const asyncWrapper = (action: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await action(req, res, next);
        } catch (error:any) {
            res.status(403).json({error:"ramin"})
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
