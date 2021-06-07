const { validateEmail, formError, messageHandler } = require("../my_module/utilities")();
const { registrationValidation, loginValidation } = require("../my_module/validation")();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const redis = require("redis");
const client = redis.createClient(6379); //port number is optional

client.on("connect", function () {
	console.log("Connected to Redis...");
});

client.on("error", function (error) {
	console.error(error);
});

class Application {
	constructor() {}

	index(req, res) {
		// res.render("application", { thisPlayer: req.session.this_player != undefined ? req.session.this_player : "" });
		res.render("application");
	}

	add_player(req, res) {
		// req.session.this_player = req.body.name;
		res.json({ msg: "new user has join the game", name: req.body.name });
	}
}

module.exports = Application;
