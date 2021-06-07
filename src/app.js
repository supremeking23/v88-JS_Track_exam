const express = require("express");
const app = express();
const PORT = 7000;

const server = app.listen(PORT, (req, res) => {
	console.log(`server is listening to port ${PORT}`);
});
const io = require("socket.io")(server);

let bodyParser = require("body-parser");
let session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 600000 },
	})
);

let users = [
	// {
	// 	name: "ivan",
	// 	mouse_coordinates: {
	// 		x: 100,
	// 		y: 100,
	// 	},
	// },
];
io.on("connection", function (socket) {
	console.log(`a user is connected`);
	socket.on("new_connection", function (data) {
		socket.broadcast.emit("load_users", { users });
		socket.emit("load_users", { users });

		socket.on("add_user", function (data) {
			let user = {
				name: data.user,
			};
			users.push(user);
			console.log(user);
			socket.broadcast.emit("load_users", { users });
			socket.emit("load_users", { users });
		});
		// socket.broadcast.emit("color", { data: color });
	});

	socket.on("disconnect", function () {
		console.log(`a user is disconnected`);
	});
});

// for image/js/css
app.use(express.static(__dirname + "/assets"));
// This sets the location where express will look for the ejs views
app.set("views", __dirname + "/views");
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set("view engine", "ejs");
// use app.get method and pass it the base route '/' and a callback

require("./routes.js")(app);
