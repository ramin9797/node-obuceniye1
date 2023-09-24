import {RequestHandler} from 'express';

export type Middleware = RequestHandler;
export const classMetadataKey: symbol = Symbol('Class Metadata Key');