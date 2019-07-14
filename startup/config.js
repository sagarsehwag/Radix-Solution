const config = require("config");

module.exports = function() {
	if (!config.get("jwtSecret")) {
		throw new Error("jwtSecret is not defined.");
	}

	if (!config.get("mongoURI")) {
		throw new Error("mongoURI is not defined.");
	}

	if (!config.get("port")) {
		throw new Error("port is not defined.");
	}
};
