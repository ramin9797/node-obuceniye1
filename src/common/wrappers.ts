import { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncWrapper = (action: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await action(req, res, next);
        } catch (error) {
            res.status(403).json({error:"ramin"})
        }
    };
};
