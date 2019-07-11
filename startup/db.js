const mongoose = require("mongoose");
const config = require("config");

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
		console.log(err.message);
		// Exit Proccess with Failiure
		process.exit(1);
	}
};
