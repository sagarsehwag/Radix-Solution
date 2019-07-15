module.exports = async () => {
	process.on("unhandledRejection", (ex) => {
		throw ex;
	});
};
