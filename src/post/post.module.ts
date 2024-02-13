import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "../types";
import { PostController } from "./post.controller";
export const postModule = new ContainerModule((bind:interfaces.Bind)=>{
    bind<PostController>(TYPES.PostController).to(PostController)
})