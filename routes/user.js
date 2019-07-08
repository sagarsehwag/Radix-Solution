const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router = express.Router();

const errorHandler = require("../middleware/AsyncErrorHandlerWrapper");
const { User, validateUser } = require("../models/UserModel");

router.post("/", async (req, res, next) => {
	const { email, password } = req.body;
	const user = User.findOne({ email });

	try {
		// If User Exist
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Email - Does Not Exist"
			});
		}

		// Comparing Password Hash
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				success: false,
				message: "Invalid Password"
			});
		}

		// JWT Logic
		const payload = { user: { id: user.id } };
		jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			res.json({
				success: true,
				message: "Successfully Registered",
				token
			});
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at '/auth'";
		next(error);
	}
});

router.post("/register", async (req, res, next) => {
	const { name, email, password, permission } = req.body;
	const user = User.findOne({ email });

	try {
		if (!user) {
			// Encrypting Password
			const salt = await bcrypt.genSalt(10);
			password = await bcrypt.hash(password, salt);

			// Saving New User
			new User({ name, email, password, permission }).save();

			// JWT Logic
			const payload = { user: { id: user.id } };
			jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({
					success: true,
					message: "Successfully Registered",
					token
				});
			});
		} else {
			res.status(400).json({
				success: false,
				message: "User Already Registered"
			});
		}
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at '/auth/register'";
		next(error);
	}
});

module.exports = router;
