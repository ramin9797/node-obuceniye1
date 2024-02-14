import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "../types";
import { PostController } from "./post.controller";
const postModule = new ContainerModule((bind:interfaces.Bind)=>{
    bind<PostController>(TYPES.PostController).to(PostController)
})


export default {
    module:postModule,
    controllers:[PostController]
}