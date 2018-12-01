var express = require("express");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var mysql = require("mysql");
var methodOverride = require("method-override");

var app = express();

// Set main routes
var indexRoutes = require("./routes/index");
var spellRoutes = require("./routes/spellroutes");
var duelistRoutes = require("./routes/duelistroutes");

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

// Duelist Table for reference
//sql = "CREATE TABLE Duelists (name VARCHAR(255), stamina int(11), evasion int(11), strength int(11), wisdom int(11), arcane int(11), accuracy int(11), duelistID int(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY (duelistID));"

function runSQL (sql) {
  con.query(sql, function (error, results, fields) {
      if (error){
          throw error;
      }
      if (results[1]){
          results.forEach(result => {
              console.log(result);
          });
      } else {
          console.log(results);
      }
  });
}

// Gets routes
app.use(indexRoutes);
app.use("/spells", spellRoutes);
app.use("/duelists", duelistRoutes);

// This starts the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
    sql = "SELECT * FROM Spells ORDER BY name ASC"
    runSQL(sql);
});