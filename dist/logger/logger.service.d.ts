import { ILogger } from "./logger.interface";
import 'reflect-metadata';
export declare class LoggerService implements ILogger {
    private logger;
    constructor();
    log(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
}
