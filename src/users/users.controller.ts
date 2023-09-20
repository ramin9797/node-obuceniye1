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
import { IConfigService } from "../config/config.service.interface";
import { ValidateMiddleware } from "../common/validate.middleware";

@injectable()
export class UserController extends BaseController implements IUserController{

    constructor(
        @inject(TYPES.ILogger) logger:ILogger,
        @inject(TYPES.UserService) private userService:IUserService,
        @inject(TYPES.ConfigeService) private config:IConfigService
    ){
        super(logger);
        this.bindRoutes([
            {path:'/register',method:'post',func:this.register,middlewares:[new ValidateMiddleware(UserLoginDto)]},
            {path:'/login',method:'post',func:this.login}
        ])
    }


    login(req:Request<{},{},UserLoginDto>,res:Response,next:NextFunction){
        console.log('req',req.user);
        
        next(new HttpError(401,'Error auth','login'))
    }


    async register({body}:Request<{},{},UserLoginDto>,res:Response,next:NextFunction){
        let salt = this.config.get("SALT");
        console.log(salt);
        
        const result = this.userService.createUser(body);
        if(!result){
            return next(new HttpError(422,"user already exists",'register'))
        }
        this.ok(res,result)
    }
}