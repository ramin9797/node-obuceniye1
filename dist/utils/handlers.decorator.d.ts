import { Router } from "express";
export declare enum Methods {
    GET = "get",
    POST = "post"
}
export interface IRouter {
    method: keyof Pick<Router, 'post' | "get" | "patch" | 'delete' | 'put'>;
    path: string;
    handler: string | symbol;
}
export declare const Get: (path: string) => MethodDecorator;
export declare const Post: (path: string) => MethodDecorator;
