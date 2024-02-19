import {  Middleware, classMetadataKey } from "./types";
import { MetadataKeys } from "./metadata.keys";



export function Middleware(middleware: any | Middleware[]): MethodDecorator & PropertyDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        addMiddlewareToMetadata(target, propertyKey, middleware);
    };
}

export function ClassMiddleware(middleware: Middleware | Middleware[]): ClassDecorator {
    return <TFunction extends Function>(target: TFunction): void => {
        addMiddlewareToMetadata(target.prototype, classMetadataKey, middleware);
    };
}

export function addMiddlewareToMetadata(target: Object, metadataKey: any, middlewares: Middleware | Middleware[]): void {
    let metadata = Reflect.getOwnMetadata(metadataKey, target);
    const controllerClass = target.constructor;
    
    let oldMiddlewares =  Reflect.getMetadata(MetadataKeys.Middlewares, controllerClass)?
    Reflect.getMetadata(MetadataKeys.Middlewares,controllerClass):{middlewares:[]}
    
    if (!metadata) {
        metadata = {};
    }
    if (!metadata.middlewares) {
        metadata.middlewares = [];
    }
    let newArr: Middleware[]=oldMiddlewares.middlewares;
    if (middlewares instanceof Array) {
        newArr = middlewares.slice();
    } else {
        newArr = [middlewares];
    }
    console.log("ramin",newArr);

    let arrayCallBacks = [];
    newArr.map(a=>{
        // if(a?.execute)
        // console.log(a.execute)
    })
    
    newArr.push(...oldMiddlewares.middlewares,...metadata.middlewares);
    metadata.middlewares = newArr;

    Reflect.defineMetadata(metadataKey, metadata, controllerClass);
}