import { NextFunction, Request, RequestHandler, Response } from "express";


export const asyncWrapper = (action: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('1111');
            
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
            console.log('222');
            
            return res.status(200).json(response);
        } catch (error:any) {
           
        }
    };
};
