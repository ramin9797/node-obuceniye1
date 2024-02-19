import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, MinLength } from "class-validator";

export class UserRegisterDto{
    @IsEmail({},{message:"Email is not valid"})
    email:string;

    @IsString({message:"Password is not valid"})
    @MinLength(7,{message:"Password length less than 7 symbol"})
    password:string;
    
    @IsString({message:"Name is not valid"})
    name:string;

    @IsNotEmpty()
    @IsNumber({},{message:"Index must bu number"})
    index:number;
}