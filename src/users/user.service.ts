import { injectable,inject } from "inversify";
import { UserLoginDto } from "./dto/login-user.dto";
import { UserRepository } from "./repo/user.repo";
import { TYPES } from "../types";
import { HttpError } from "../errors/http-error.class";


@injectable()
export class UserService{

    constructor(@inject(TYPES.UserRepo) private userRepository:UserRepository) {}

    async createUser(body:any){
        console.log("body",body);
        // const newUser = new User("ramin.web.97@gmail.com","ramin","ramin1234");
        // let res = await this.userRepository.save(newUser);
        // return res;


        
        // await newUser.setPassword(password,10)
        // return newUser;
    }

    // async registration(email:sr,password){
    //     const candidate = await UserModel.findOne({email});
    //     if(candidate){
    //         // throw new Error("User with email already exists")
    //         throw ApiError.BadRequest("User with email already exists");
    //     }
    //     const hashPassword = await bcrypt.hash(password,3);
    //     const activationLink = uuid.v4();
    //     const user = await UserModel.create({email,password:hashPassword,activationLink});
    //     // await MailService.sendActivationMail(email,activationLink); 

    //     const userDto = new UserDto(user);
    //     const tokens = tokenService.generateTokens({...userDto});
    //     await tokenService.saveToken(userDto.id,tokens.refreshToken)
    //     return {user:userDto,...tokens}
    // }


    async allUsers(){
        return this.userRepository.findAll(); 
        // throw new Error("Errrorrorro cixdi");
    }

    async getUserById(id:number){
        let findUser =await this.userRepository.findById(id); 
        if(!findUser){
            throw new HttpError(404,'User not found')
        }
        return findUser;
    }


    validateUser: (dto: UserLoginDto) => true
}