import { ClassConstructor, plainToClass } from "class-transformer";
import { IMiddleware } from "./middleware.interface";
import {NextFunction, Request,Response} from "express";
import { validate } from "class-validator";

export class ValidateMiddleware implements IMiddleware{

    constructor(private classToValidate:ClassConstructor<object>){}

    execute({body}:Request,res:Response,next:NextFunction):void{
        console.log(this,"kkkkkkkkkkkkkkkkkkkk")
        const instance = plainToClass(this.classToValidate,body);
        validate(instance).then((errors)=>{
            if(errors.length){
                res.status(422).send(errors)
            }
            else{
                next()
            }
        })
    }
}