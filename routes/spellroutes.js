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
    if(req.body.specialEffect != null){
        con.query(('INSERT INTO Spells (name, damage, DC, specialEffect) VALUES ("' + req.body.name + '", "' + req.body.damage + '", "' + req.body.DC + '", "' + req.body.specialEffect + '")'), function (error, results, fields) {
            if (error)
                throw error;
            res.redirect("/spells");
        });
    }
    else{
        con.query(('INSERT INTO Spells (name, damage, DC) VALUES ("' + req.body.name + '", "' + req.body.damage + '", "' + req.body.DC + '")'), function (error, results, fields) {
            if (error)
                throw error;
            res.redirect("/spells");
        });
    }
});

router.get("/new", function(req, res){
    res.render("spellsnew");
});

router.post("/spelledit", function(req, res){
    con.query(('UPDATE Spells SET name="' + req.body.name + '", damage=' + req.body.damage + ', DC=' + req.body.DC + ', specialEffect=' + req.body.specialEffect + ' WHERE spellID=' + req.body.spellID + ';'), function (error, results, fields){
        if (error){
            throw error;
        }
        res.redirect("/spells");
    });
});

router.get("/:spellID", function(req, res){
    con.query('SELECT * FROM Spells WHERE spellID="' + req.params.spellID + '"', function (error, results, fields){
        if (error){
            throw error;
        }
        console.log(results);
        res.render("spelledit", {results: results});
    });
});

router.get("*", function(req, res){
   // req.flash("error", "Spell not found")
    res.redirect("/");
});

module.exports = router;