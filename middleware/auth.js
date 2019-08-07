const jwt = require("jsonwebtoken");
const config = require("config");

const { User } = require("../models/UserModel");

module.exports.auth = async (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) {
		return res.status(401).json({
			sucess: false,
			message: "No Token, Auhtorization Denied"
		});
	} else {
		try {
			// This verify function will throw an error if the token received is not valid
			const decodedData = await jwt.verify(token, config.get("jwtSecret"));
			req.user = decodedData.user;
			req.user = await User.findById(req.user.id).select("-password -__v");

			// If user does not exist anymore
			if (!req.user) {
				return res.status(401).json({
					success: false,
					message: "User does not exist anymore"
				});
			}

			next();
		} catch (error) {
			res.locals.statusCode = 401;
			res.locals.message = "Your token is not valid";
			next(error);
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
			const decodedData = await jwt.verify(token, config.get("jwtSecret"));
			req.user = decodedData.user;
			req.user = await User.findById(req.user.id).select("-password -__v");

			// If user does not exist anymore
			if (!req.user) {
				return res.status(401).json({
					success: false,
					message: "User does not exist anymore"
				});
			}

			if (req.user.permissions.includes("admin")) return next();

			res.status(401).json({
				success: false,
				message: "You're not authorized"
			});
		} catch (error) {
			res.locals.statusCode = 401;
			res.locals.message = "Your token is not valid";
			next(error);
		}
	}
};
