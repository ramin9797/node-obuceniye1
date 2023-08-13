import { Response,Request,NextFunction} from "express";
import { BaseController } from "../common/base.controller";
import { ILogger } from "../logger/logger.interface";
import { IUserController } from "./users.controller.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { HttpError } from "../errors/http-error.class";
import { UserLoginDto } from "./dto/login-user.dto";
import { User } from "./user.entity";
import { IUserService } from "./user.service.interface";

@injectable()
export class UserController extends BaseController implements IUserController{

    constructor(
        @inject(TYPES.ILogger) logger:ILogger,
        @inject(TYPES.UserService) private userService:IUserService
    ){
        super(logger);
        this.bindRoutes([
            {path:'/register',method:'post',func:this.register},
            {path:'/login',method:'post',func:this.login}
        ])
    }


    login(req:Request<{},{},UserLoginDto>,res:Response,next:NextFunction){
        next(new HttpError(401,'Error auth','login'))
    }


    async register({body}:Request<{},{},UserLoginDto>,res:Response,next:NextFunction){
        const result = this.userService.createUser(body);
        if(!result){
            return next(new HttpError(422,"user already exists",'register'))
        }
        this.ok(res,result)
    }
}