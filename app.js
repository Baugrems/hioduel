var express = require("express");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var mysql = require("mysql");
var methodOverride = require("method-override");

// Set main routes
var indexRoutes = require("./routes/index");
var spellRoutes = require("./routes/spellroutes");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(flash());
app.use(methodOverride("_method"));

// Gets routes
app.use(indexRoutes);
app.use("/spells", spellRoutes);

// This starts the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});