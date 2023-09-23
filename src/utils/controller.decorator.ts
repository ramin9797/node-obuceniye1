import { MetadataKeys } from "./metadata.keys"


const Controller = (basePath:string):ClassDecorator=>{
    return (target:Function)=>{
        //target is a class ( class = Function)
        Reflect.defineMetadata(MetadataKeys.BASE_PATH,basePath,target)
    }
}

export default Controller;