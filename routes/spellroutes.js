var express = require("express");
var router = express.Router();


router.get("/", function(req, res){
    res.render("spells");
});

router.get("*", function(req, res){
    req.flash("error", "Spell not found")
    res.redirect("/");
});

module.exports = router;