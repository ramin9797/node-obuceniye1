import { Response,Request,NextFunction} from "express";
import { inject, injectable } from "inversify";

import { BaseController } from "../common/base.controller";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { HttpError } from "../errors/http-error.class";
import { UserLoginDto } from "./dto/login-user.dto";
import { IConfigService } from "../config/config.service.interface";
import Controller from "../utils/controller.decorator";
import { Get, Post } from "../utils/handlers.decorator";
import {  ClassMiddleware, Middleware } from "../utils/middleware.decorator";
import { simpleMiddleware, simpleMiddleware2, validationMiddleware } from "../common/simple.middleware";
import { UserService } from "./user.service";
import { UserRegisterDto } from "./dto/register-user.dto";
import { ValidateMiddleware } from "../common/validate.middleware";

@injectable()
@Controller("/users")
export class UserController extends BaseController{
    constructor(
        @inject(TYPES.ILogger) private logger:ILogger,
        @inject(TYPES.UserService) private userService:UserService,
        @inject(TYPES.ConfigService) private config:IConfigService
    ){
        super();
    }

    @Get("")
    // @Middleware([simpleMiddleware2,simpleMiddleware])
    async allUser(req:Request,res:Response,next:NextFunction){
        let result = await this.userService.allUsers();
        console.log(result,"result");
        return result;
    }


    @Get("/:id")
    // @Middleware([simpleMiddleware2,simpleMiddleware])
    async (req:Request,res:Response,next:NextFunction){
        console.log('eq',req.params);
        const {id} = req.params;    
        return this.userService.getUserById(+id);
    }

    @Get("/posts")
    // @Middleware([simpleMiddleware2])
    allUser2(req:Request,res:Response){
        return ({
            message:"good"
        });
    }

    @Post("/login")
    login(req:Request,res:Response,next:NextFunction){
        next(new HttpError(401,'Error auth','login'))
    }

    @Post("/register")
    @Middleware([new ValidateMiddleware(UserRegisterDto)])
    async register({body}:Request<{},{},UserRegisterDto>,res:Response,next:NextFunction){
        const result = await this.userService.createUser(body);
        return ({
            message:"good"
        });
        // this.ok(res,result)
    }
}