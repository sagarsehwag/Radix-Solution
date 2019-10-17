const config = require("config");

module.exports = (app) => {
	const port = process.env.PORT || config.get("port");
	app.listen(port, () => {
		console.log(`Server Started on ${port}`);
	});
};
