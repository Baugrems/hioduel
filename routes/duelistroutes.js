var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    //insecureAuth : true
  });




// Duelists Home page render for /duelists
router.get("/", function(req, res){
  con.query('SELECT * FROM Duelists ORDER BY name ASC', function (error, results, fields) {
    if (error)
      throw error;
    res.render("duelists", {results: results});
    });
});

router.get("/new", function(req, res){
  res.render("duelistnew");
});

// Adds a new duelist to DB and redirects to duelist home page
router.post("/", function(req, res){
  con.query(('INSERT INTO Duelists (name, stamina, evasion, strength, wisdom, arcane, accuracy) VALUES ("' + req.body.name + '", ' + req.body.stamina + ', ' + req.body.evasion + ', ' + req.body.strength + ', ' + req.body.wisdom + ', ' + req.body.arcane + ', ' + req.body.accuracy + ');'), function (error, results, fields) {
    if (error)
      throw error;
    res.redirect("/duelists");
      });
});

// opens spell details for individual spell by ID in URL
router.get("/:duelistID", function(req, res){
  con.query('SELECT * FROM Duelists WHERE duelistID="' + req.params.duelistID + '"', function (error, results, fields){
      if (error){
          throw error;
      }
      res.render("duelistsedit", {results: results});
  });
});

//edit route for duelists being edited
router.post("/edit", function(req, res){
  var sql='UPDATE Duelists SET name="' + req.body.name + '", stamina=' + req.body.stamina + ', evasion=' + req.body.evasion + ', strength=' + req.body.strength + ', wisdom=' + req.body.wisdom + ' WHERE duelistID=' + req.body.duelistID + ';';
  runSQL(sql);
  res.redirect("/duelists");
});

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

// Sends route info to app, do not delete
module.exports = router;