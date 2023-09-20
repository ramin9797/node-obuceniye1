import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { IConfigService } from "./config.service.interface";
import {DotenvConfigOutput, DotenvParseOutput, config} from "dotenv"
import { TYPES } from "../types";

@injectable()
export class ConfigService implements IConfigService{
    private config:DotenvParseOutput;
    constructor(@inject(TYPES.ILogger) public logger:ILogger,){
        const result:DotenvConfigOutput = config()
        if(result.error){
            logger.error('Error while get dotenv')
        }else{
            this.logger.log("ENV FILE WAS DOWNLOADED")
            this.config = result.parsed as DotenvParseOutput;
        }

    }
    
    get(key:string){
        return this.config[key];
    }
}