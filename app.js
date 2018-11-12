var express = require("express");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var mysql = require("mysql");
var methodOverride = require("method-override");

var app = express();

// Set main routes
var indexRoutes = require("./routes/index");
var spellRoutes = require("./routes/spellroutes");

// Set up modules to be used
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(flash());
app.use(methodOverride("_method"));

//DB connect - envionmental variables used for security.
var con = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    //insecureAuth : true
  });

// Spells Table for reference
//var sql = "CREATE TABLE Spells (name VARCHAR(255), damage int(11), DC int(11), specialEffect int(11), spellID int(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY (spellID));"

// Runs SQL passed to it
function runSQL(sql){
    con.query(sql, function (error, results, fields) {
        if (error){
            throw error;
        }
        if (results[1]){
            results.forEach(result => {
                console.log(result);
            });
        }
    });
}

// Gets routes
app.use(indexRoutes);
app.use("/spells", spellRoutes);

// This starts the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
    sql = "SELECT * FROM Spells ORDER BY name ASC"
    runSQL(sql);
});