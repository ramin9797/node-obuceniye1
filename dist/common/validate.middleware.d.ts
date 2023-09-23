import { ClassConstructor } from "class-transformer";
import { IMiddleware } from "./middleware.interface";
import { NextFunction, Request, Response } from "express";
export declare class ValidateMiddleware implements IMiddleware {
    private classToValidate;
    constructor(classToValidate: ClassConstructor<object>);
    execute({ body }: Request, res: Response, next: NextFunction): void;
}
