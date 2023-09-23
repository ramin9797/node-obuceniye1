import { Router, Response } from "express";
import { IControllerRoute } from "./route.interface";
export declare abstract class BaseController {
    private readonly _router;
    constructor();
    get router(): Router;
    send<T>(res: Response, code: number, message: T): Response<any, Record<string, any>>;
    ok<T>(res: Response, message: T): Response<any, Record<string, any>>;
    created(res: Response): Response<any, Record<string, any>>;
    protected bindRoutes(routes: IControllerRoute[]): void;
}
