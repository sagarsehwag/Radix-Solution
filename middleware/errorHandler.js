// This is not being used to prevent to add unnecessary complexity to the code as it could be hard to get the hang of how this wrapper function works. Do sure check this out to understand how this works

module.exports = (handler) => {
	return async (req, res, next) => {
		try {
			await handler(req, res);
		} catch (error) {
			res.locals.statusCode = 500;
			res.locals.message = "Server Error";
			next(error);
		}
	};
};
