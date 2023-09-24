import { UserLoginDto } from "./dto/login-user.dto";
export declare class UserService {
    createUser({ email, password, name }: UserLoginDto): Promise<void>;
    allUsers(): Promise<void>;
    validateUser: (dto: UserLoginDto) => true;
}
