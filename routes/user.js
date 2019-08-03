const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

const { User, validateRegister } = require("../models/UserModel");
const { adminAuth } = require("../middleware/auth");

router.get("/", async (req, res, next) => {
	res.json({
		success: true,
		message: "Yo Bitches, Successfull Access at GET '/auth'"
	});
});

// Login route
router.post("/", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		// If User Exist
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Username does not exist"
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
			// Removing password from user object
			user.password = user.__v = undefined;
			return res.json({
				success: true,
				message: "Successfully Loggedin",
				user,
				token
			});
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at POST '/auth'";
		next(error);
	}
});

// Register route
router.post("/register", adminAuth, async (req, res, next) => {
	try {
		const { name, username, password, permission } = req.body;
		const { error, value } = validateRegister({ name, username, password });
		if (error !== null) {
			return res.status(400).json({ success: false, message: error.details });
		}

		const user = await User.findOne({ username });

		if (!user) {
			// Encrypting Password
			const salt = await bcrypt.genSalt(10);
			const newPassword = await bcrypt.hash(password, salt);

			// Saving New User
			const newUser = await new User({
				name,
				username,
				password: newPassword,
				permission
			});
			await newUser.save();

			// JWT Logic
			const payload = { user: { id: newUser.id } };
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
				message: "User already registered"
			});
		}
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at POST '/auth/register'";
		next(error);
	}
});

// Reset password
router.put("/reset/password", adminAuth, async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if (user) {
			// Encrypting Password
			const salt = await bcrypt.genSalt(10);
			const newPassword = await bcrypt.hash(password, salt);

			// Changing Password
			user.password = newPassword;
			await user.save();

			res.json({
				success: true,
				message: "Successfull Reset",
				token
			});
		} else {
			res.status(400).json({
				success: false,
				message: "User does not exist"
			});
		}
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at PUT '/auth/reset/password'";
		next(error);
	}
});

module.exports = router;
