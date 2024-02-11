import { ContainerModule, interfaces } from "inversify";
import { UserController } from "./users.controller";
import { TYPES } from "../types";
import { UserService } from "./user.service";
import { Repository, getRepository } from "typeorm";
import { User } from "./user.entity";
export const userModule = new ContainerModule((bind:interfaces.Bind)=>{
    bind<UserController>(TYPES.UserController).to(UserController)
    bind<UserService>(TYPES.UserService).to(UserService)

    bind<Repository<User>>(Repository).toDynamicValue(() => {
        return getRepository(User);
    });
})