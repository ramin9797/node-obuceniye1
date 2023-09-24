import { Router,Response } from "express";
import { IControllerRoute } from "./route.interface";
import { injectable } from "inversify";



@injectable()
export abstract class BaseController{
    private readonly _router: Router;

    constructor(){
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

}