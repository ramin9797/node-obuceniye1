import { Response,Request,NextFunction} from "express";
import { BaseController } from "../common/base.controller";
import { ILogger } from "../logger/logger.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { HttpError } from "../errors/http-error.class";
import { UserLoginDto } from "./dto/login-user.dto";
import { IConfigService } from "../config/config.service.interface";
import Controller from "../utils/controller.decorator";
import { Get, Post } from "../utils/handlers.decorator";
import {  Middleware } from "../utils/middleware.decorator";
import { simpleMiddleware, simpleMiddleware2, simpleMiddleware3 } from "../common/simple.middleware";
import { UserService } from "./user.service";

@injectable()
@Controller("/users")
// @ClassMiddleware(simpleMiddleware3)
export class UserController extends BaseController{
    constructor(
        @inject(TYPES.ILogger) private logger:ILogger,
        @inject(TYPES.UserService) private userService:UserService,
        @inject(TYPES.ConfigeService) private config:IConfigService
    ){
        super();
    }

    @Get("/all")
    @Middleware([simpleMiddleware2,simpleMiddleware])
    async allUser(req:Request,res:Response){
        let result = await this.userService.allUsers();
        return result;
        // res.status(200).json({
        //     message:"good"
        // })
    }
    @Get("/all2")
    @Middleware([simpleMiddleware2])
    allUser2(req:Request,res:Response){
        res.status(200).json({
            message:"good"
        })
    }

    @Post("/login")
    login(req:Request,res:Response,next:NextFunction){
        console.log('req',req.user);
        
        next(new HttpError(401,'Error auth','login'))
    }

    @Post("/register")
    async register({body}:Request<{},{},UserLoginDto>,res:Response,next:NextFunction){
        const result = await this.userService.createUser(body);
        console.log('resssss',result);
        this.ok(res,result)
    }
}