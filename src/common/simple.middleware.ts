import { Request,Response,NextFunction } from "express";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { UserRegisterDto } from "../users/dto/register-user.dto";
export function simpleMiddleware(req:Request,res:Response,next:NextFunction){
    next();
}

export function simpleMiddleware2(req:Request,res:Response,next:NextFunction){
    next();
}


export function validationMiddleware(req:Request,res:Response,next:NextFunction){
    const instance = plainToClass(UserRegisterDto,req.body);
    validate(instance).then((errors)=>{
        let errorLists:any[] =[]
        if(errors.length){
            errors.map(error=>{
                console.log(error.constraints);
                let r:any = error.constraints
                errorLists.push(...Object.values(r))
            })
            console.log(errorLists,"errorLists");
            res.status(422).send(errorLists)
        }
        else{
            req.body = instance;
            next()
        }
    })
}