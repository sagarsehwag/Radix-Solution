const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const router = express.Router();


router.post("/", (req, res, next) => {
	res.json({
		success: true,
		message: "Successfull Access at /operations"
	});
});

module.exports = router;
