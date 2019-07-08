const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.post("/", (req, res, next) => {
	res.json({
		success: true,
		message: "Successfull Access at /operations"
	});
});

module.exports = router;
