import { Repository, getRepository } from "typeorm";
import { inject, injectable } from "inversify";

import { User } from "../user.entity";

@injectable()
export class UserRepository{
    constructor(private readonly userRepo: Repository<User>) {}


    async createUser(user:User){
        return await this.userRepo.save(user) 
    }

    async findAll(){
        return await this.userRepo.find();
    }

    async findByEmail(email:string){
        return await this.userRepo.findOne({where:{email}});
    }


    async findById(id:number){
        return await this.userRepo.findOne({where:{id}});
    }

    async findUser(email:string){
        return await this.userRepo.findOne({where:{email}});
    }

    async deleteUser(email:string){
        return await this.userRepo.delete({email});
    }
}