import { UserLoginDto } from "./dto/login-user.dto";
import { User } from "./user.entity";
import { IUserService } from "./user.service.interface";
export declare class UserService implements IUserService {
    createUser({ email, password, name }: UserLoginDto): Promise<User>;
    validateUser: (dto: UserLoginDto) => true;
}
