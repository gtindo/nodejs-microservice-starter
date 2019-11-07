const amqp = require('amqplib')
const configs = require('../config')

const CONSUMER_ROLE = "consumer"

class RabbitMqManager {
	constructor(role, queue){
		this.host = configs.RABBITMQ_HOST;
		this.port = configs.RABBITMQ_PORT;
		this.username = configs.RABBITMQ_USERNAME;
		this.password = configs.RABBITMQ_PASSWORD;
		this.virtualHost = configs.RABBITMQ_VIRTUAL_HOST;
		this.connection = null
	}

	async connect(){
		try{
			this.connection = await amqp.connect(`amqp://${this.host}/`);
		}catch(err){
			console.error(err);
		}
	}
}


class Consumer extends RabbitMqManager {
	constructor(queueName){
		super();
		this.queue = queueName;
	}

	async consume(){
		try{
			const channel = await this.connection.createChannel();
			const queueListener = await channel.assertQueue(this.queue, {durable: false});
			console.log("Connected to rabbitmq server.")
			console.log('[*] Waiting for message ....');
			channel.consume(this.queue, this.onMessage);
		}catch(err){
			console.log(err);
		} 
	}

	onMessage(message){
		console.log(`[x] Receive message : ${message}`);
	}
}

class Publisher extends RabbitMqManager{
	constructor(queueName){
		super();
		this.queue = queueName;
	}

	async sendMessage(message){
		try{
			const channel = await this.connection.createChannel();
			const queueListener = await channel.assertQueue(this.queue, {durable: false});
			await channel.sendToQueue(this.queue, Buffer.from(message));
			console.log(`[>] Message sent to ${this.queue} queue.`);
		}catch(err){

		}
	}
}


module.exports = Consumer