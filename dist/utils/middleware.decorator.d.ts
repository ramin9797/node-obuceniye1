import { Middleware } from "./types";
export declare function Middleware(middleware: Middleware | Middleware[]): MethodDecorator & PropertyDecorator;
export declare function ClassMiddleware(middleware: Middleware | Middleware[]): ClassDecorator;
export declare function addMiddlewareToMetadata(target: Object, metadataKey: any, middlewares: Middleware | Middleware[]): void;
