import { Router,Response } from "express";
import { ILogger } from "../logger/logger.interface";
import { IControllerRoute } from "./route.interface";
import { injectable } from "inversify";



@injectable()
export abstract class BaseController{
    private readonly _router: Router;


    constructor(private logger:ILogger){
        this._router = Router();
    }

    get router(){
        return this._router;
    }


    public send<T>(res:Response,code:number,message:T){
        res.type("application/json");
        return res.status(code).json(message)
    }

    public ok<T>(res:Response,message:T){
        return this.send(res,200,message);
    }

    public created(res:Response){
        return res.status(201).json({message:"Created"});
    }

    protected bindRoutes (routes:IControllerRoute[]){
        console.log('ra',Symbol.for("Application"))
        console.log('ra',Symbol.for("Application"))
        for (const route of routes) {
            this.logger.log(`Add Route: type:${route.method}: ${route.path} `)
            const middleware = route.middlewares?.map(m=>m.execute.bind(m));
            const handler = route.func.bind(this)
            const pipeline= middleware?[...middleware,handler]:handler;
            this.router[route.method](route.path,pipeline)
        }
    }

}