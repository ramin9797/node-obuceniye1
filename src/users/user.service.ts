import { injectable } from "inversify";
import { UserLoginDto } from "./dto/login-user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";


@injectable()
export class UserService{

    constructor(private readonly userRepository: Repository<User>) {}

    async createUser(body:any){
        const newUser = new User("ramin.web.97@gmail.com","ramin","ramin1234");
        let res = await this.userRepository.save(newUser);
        console.log('re',res);
        return res;
        
        // await newUser.setPassword(password,10)
        // return newUser;
    }


    async allUsers(){
        return this.userRepository.find({}); 
    }


    validateUser: (dto: UserLoginDto) => true
}