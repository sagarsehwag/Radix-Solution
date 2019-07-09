const jwt = require("jsonwebtoken");
const config = require("config");

module.exports.auth = async (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) {
		return res
			.status(401)
			.json({ sucess: false, message: "No Token, Auhtorization Denied" });
	} else {
		try {
			// This verify function will throw an error if the token received is not valid
			const decodedData = jwt.verify(token, config.get("jwtSecret"));
			req.user = decodedData.user;

			if (user.permission.admin) next();

			if ((req.url = "/medicine" && user.permission.medicine)) next();
			if ((req.url = "/operations" && user.permission.operations)) next();

			res.status(401).json({
				success: false,
				message: "You're not authorized"
			});
		} catch (err) {
			res.status(401).json({ sucess: false, message: "Token - Not Valid" });
		}
	}
};

module.exports.adminAuth = async (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) {
		return res
			.status(401)
			.json({ sucess: false, message: "No Token, Auhtorization Denied" });
	} else {
		try {
			// This verify function will throw an error if the token received is not valid
			const decodedData = jwt.verify(token, config.get("jwtSecret"));
			req.user = decodedData.user;

			if (user.permission.admin) next();

			res.status(401).json({
				success: false,
				message: "You're not authorized"
			});
		} catch (err) {
			res.status(401).json({ sucess: false, message: "Token - Not Valid" });
		}
	}
};
