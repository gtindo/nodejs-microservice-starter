const RabbitMqManager = require('./manager');
const routes = require('../routes/amqp/routes');

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
		let tab_check = routes.filter(val => val.route === message["action"]);
		if(tab_check.length != 0){
			console.log(`[x] Receive message : ${message}`);
			tab_check[0].handler(message);
		}
	}
}


module.exports = Consumer