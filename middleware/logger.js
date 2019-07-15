const winston = require("winston");
const { createLogger, transports } = winston;

module.exports = createLogger({
	transports: [
		new transports.File({ filename: "logs/errors.log", level: "error" }),
		new transports.File({ filename: "logs/combined.log", level: "info" })
	],
	exceptionHandlers: [new transports.File({ filename: "logs/unhandledExceptions.log" })]
});
