import { Router } from "express";
import { MetadataKeys } from "./metadata.keys";

export enum Methods{
    GET="get",
    POST="post"
}

export interface IRouter{
    method:keyof Pick<Router,'post' | "get" | "patch"|'delete'|'put'>,
    path:string;
    handler:string | symbol;
}

const methodDecoratorFactory = (method:Methods)=>{
    return (path:string):MethodDecorator=>{
        return (target,propertyKey:string | symbol)=>{
            const controllerClass = target.constructor;
            const routers :IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS,controllerClass)?
            Reflect.getMetadata(MetadataKeys.ROUTERS,controllerClass):[]

            routers.push({
                method,
                path,
                handler:propertyKey
            })

            Reflect.defineMetadata(MetadataKeys.ROUTERS,routers,controllerClass);
        }
    }
}

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);