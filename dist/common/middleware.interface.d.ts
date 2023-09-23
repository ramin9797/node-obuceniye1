import { Request, NextFunction, Response } from "express";
export interface IMiddleware {
    execute: (req: Request, res: Response, next: NextFunction) => void;
}
