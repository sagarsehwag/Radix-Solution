const express = require("express");
const config = require("config");

const app = express();
require("./startup/config")();
require("./startup/unhandledRejection")();
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || config.get("port");
app.listen(port, () => {
	console.log(`Server Started on ${port}`);
});
