const amqp = require('amqplib')
const configs = require('../../config')

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

module.exports = RabbitMqManager