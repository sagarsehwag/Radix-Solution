const config = require("config");

module.exports = function() {
	if (!config.get("jwtSecret")) {
		throw new Error("jwtSecret is not defined.");
	}
};
