require('dotenv').config()

module.exports = {
	APP_NAME: process.env.APP_NAME,
	APP_VERSION: process.env.APP_VERSION,
	RABBITMQ_HOST: process.env.RABBITMQ_HOST || "",
	RABBITMQ_PASSWORD: process.env.RABBITMQ_PASSWORD || "",
	RABBITMQ_PORT: process.env.RABBITMQ_PORT || "",
	RABBITMQ_USERNAME: process.env.RABBITMQ_USERNAME || "",
	RABBITMQ_VIRTUAL_HOST: process.env.RABBITMQ_VIRTUAL_HOST,
	REQUEST_QUEUE_NAME: process.env.REQUEST_QUEUE_NAME
}
