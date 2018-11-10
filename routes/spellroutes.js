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

router.get("/", function(req, res){
    con.query('SELECT * FROM Spells ORDER BY name ASC', function (error, results, fields) {
        if (error)
            throw error;
        res.render("spells", {results: results});
    });
});

router.post("/", function(req, res){
    con.query(('INSERT INTO Spells (name, damage) VALUES ("' + req.body.name + '", ' + req.body.damage + ')'), function (error, results, fields) {
        if (error)
            throw error;
        res.redirect("/spells");
    });
});

router.get("/new", function(req, res){
    res.render("spellsnew");
});

router.get("*", function(req, res){
   // req.flash("error", "Spell not found")
    res.redirect("/");
});

module.exports = router;