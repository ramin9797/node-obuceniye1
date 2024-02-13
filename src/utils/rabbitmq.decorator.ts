import amqp from "amqplib";
import { MetadataKeys } from "./metadata.keys";

let connection:any;

async function connectToRabbitMQ() {
  let connection = null;
  let attempts = 0;
  while (!connection && attempts < 5) {    
      try {
        connection = await amqp.connect('amqp://rabbitmq');
        return connection;
      } catch (err) {
        attempts++;
        console.error(`Connection to rabbitmq failed (attempt ${attempts}):`);
        // Подождем некоторое время перед следующей попыткой (например, 5 секунд)
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
}

export function MessagePattern(queueName:string, options = { durable: false, noAck: true }) {
  return function (target:any, key:any, descriptor:any) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function () {
      if(!connection) connection =await connectToRabbitMQ();
        
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName, options);

      console.log(` [*] Waiting for messages in ${queueName}`);

      channel.consume(queueName, function(msg:any) {
        originalMethod.apply(this, [msg.content.toString()]);
        if (!options.noAck) {
          channel.ack(msg);
        }
      }, { noAck: options.noAck });
    };
    const controllerClass = target.constructor;

    Reflect.defineMetadata(MetadataKeys.RabbitMq, descriptor.value,controllerClass);
    return descriptor;
  };
}
