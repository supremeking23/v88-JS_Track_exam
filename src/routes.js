module.exports = (app) => {
	const ApplicationControler = require("./controllers/Application");
	const application = new ApplicationControler();
	app.get("/", application.index);
};
