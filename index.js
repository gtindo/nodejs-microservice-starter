const Consumer = require('./app/consumer')
const configs = require('./config')


const consumer = new Consumer(configs.REQUEST_QUEUE_NAME);

async function lauch(){
	try{
		await consumer.connect();
		await consumer.consume();
	}catch(err){
		console.log(error);
	}
}

lauch();