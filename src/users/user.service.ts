import { injectable } from "inversify";
import { UserLoginDto } from "./dto/login-user.dto";
import { User } from "./user.entity";
import { IUserService } from "./user.service.interface";


@injectable()
export class UserService implements IUserService{
    async createUser({email,password,name}: UserLoginDto){
        const newUser = new User(email,name);
        await newUser.setPassword(password)
        return newUser;
    }


    validateUser: (dto: UserLoginDto) => true
}