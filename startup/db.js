const mongoose = require("mongoose");
const config = require("config");

module.exports = async () => {
	const mongoURI = config.get("mongoURI");
	try {
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log("MongoDB Connected");
	} catch (err) {
		console.log(err.message);
		// Exit Proccess with Failiure
		process.exit(1);
	}
};
