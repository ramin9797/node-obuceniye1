import { UserLoginDto } from "./dto/login-user.dto";
import { User } from "./user.entity";

export interface IUserService{
    createUser:(dto:UserLoginDto)=>Promise<User|null>;
    validateUser:(dto:UserLoginDto)=>boolean;
}