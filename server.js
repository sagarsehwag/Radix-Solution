const express = require("express");
const config = require("config");

const app = express();
require("./startup/config")();
require("./startup/unhandledRejection")();
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || config.get("port");
app.listen(port, () => {
	console.log(`Server Started on ${port}`);
});
