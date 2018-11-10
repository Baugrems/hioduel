var express = require("express");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var mysql = require("mysql");
var methodOverride = require("method-override");

var app = express();

// Set main routes
var indexRoutes = require("./routes/index");
var spellRoutes = require("./routes/spellroutes");



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(flash());
app.use(methodOverride("_method"));

var con = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    //insecureAuth : true
  });


con.query('SELECT * FROM Spells ORDER BY name ASC', function (error, results, fields) {
    if (error)
        throw error;
    results.forEach(result => {
        console.log(result);
    });
});

// Gets routes
app.use(indexRoutes);
app.use("/spells", spellRoutes);

// This starts the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});