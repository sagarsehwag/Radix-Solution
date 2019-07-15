const mongoose = require("mongoose");
const config = require("config");

const logger = require("../middleware/logger");

module.exports = async () => {
	try {
		const mongoURI = config.get("mongoURI");
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log("MongoDB Connected");
	} catch (err) {
		logger.info(err.message, err);
		// Exit Proccess with Failiure
		process.exit(1);
	}
};
