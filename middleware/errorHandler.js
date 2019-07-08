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
