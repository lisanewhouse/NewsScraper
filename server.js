//Dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");

var PORT = process.env.PORT || 3000;

//Express App
var app = express();

//Express Router
var router = express.Router();

//routes
require("./config/routes")(router);

//body-parser
app.use(bodyParser.urlencoded({
	extended: false
}));

//Make public a static dir
app.use(express.static(__dirname + "/public"));

app.use(router);

//Handlebars
app.engine("handlbars", expressHandlebars({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");


var db = process.env.MONGODB_URI || "mongodb://localhost/newsscraper";

mongoose.connect(db, function(error) {
	if (error) {
		console.log(error);
	} else {
		console.log("mongoose connection is successful");
	}
});

//Listen on port
app.listen(PORT, function() {
	console.log("Listening on port: " + PORT);
});



