const express = require("express");

const app = express();
require("./startup/config")();
require("./startup/unhandledRejection")();
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/production")(app);
require("./startup/listen")(app);
