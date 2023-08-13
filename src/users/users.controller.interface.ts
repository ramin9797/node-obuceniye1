import { Response,Request,NextFunction, IRoute} from "express";

export interface IUserController{
    login:(req:Request,res:Response,next:NextFunction)=>void;
    register:(req:Request,res:Response,next:NextFunction)=>void;
    router:any
}