import { UserLoginDto } from "./dto/login-user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(body: any): Promise<User>;
    allUsers(): Promise<User[]>;
    validateUser: (dto: UserLoginDto) => true;
}
