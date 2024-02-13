import { injectable } from "inversify";
import { MessagePattern } from "../utils/rabbitmq.decorator";
import Controller from "../utils/controller.decorator";
import { NextFunction, Request, Response } from "express";
import { Get } from "../utils/handlers.decorator";
import { BaseController } from "../common/base.controller";


@injectable()
@Controller("/posts")
export class PostController extends BaseController {
    @Get("")
    async allPosts(req:Request,res:Response,next:NextFunction){
        return [{"ramin":"true"}];
    }
    
    @MessagePattern('other_queue2', { durable: true, noAck: false })
    handleOther(message:any) {
      console.log(`Handling other message: ${message}`);
      console.log('this',this);
      // Добавьте здесь вашу логику обработки других сообщений
    }
  }