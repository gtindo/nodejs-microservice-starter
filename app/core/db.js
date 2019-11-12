const mongoose = require('mongoose');
const configs = require('../../config');

mongoose.connect(configs.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to MongoDB.");
});
