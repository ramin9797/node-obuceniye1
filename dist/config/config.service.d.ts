import { ILogger } from "../logger/logger.interface";
import { IConfigService } from "./config.service.interface";
export declare class ConfigService implements IConfigService {
    logger: ILogger;
    private config;
    constructor(logger: ILogger);
    get(key: string): string;
}
