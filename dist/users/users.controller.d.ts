import { Response, Request, NextFunction } from "express";
import { BaseController } from "../common/base.controller";
import { ILogger } from "../logger/logger.interface";
import { IUserController } from "./users.controller.interface";
import { UserLoginDto } from "./dto/login-user.dto";
import { IConfigService } from "../config/config.service.interface";
import { UserService } from "./user.service";
export declare class UserController extends BaseController implements IUserController {
    private logger?;
    private userService?;
    private config?;
    constructor(logger?: ILogger | undefined, userService?: UserService | undefined, config?: IConfigService | undefined);
    allUser(req: Request, res: Response): void;
    allUser2(req: Request, res: Response): void;
    login(req: Request, res: Response, next: NextFunction): void;
    register({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void>;
}
