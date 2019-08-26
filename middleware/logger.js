const winston = require("winston");
const { createLogger, transports } = winston;

module.exports = createLogger({
	transports: [
		new transports.File({ filename: "logs/errors.json", level: "error" }),
		new transports.File({ filename: "logs/combined.json", level: "info" })
	],
	exceptionHandlers: [new transports.File({ filename: "logs/unhandledExceptions.json" })]
});
