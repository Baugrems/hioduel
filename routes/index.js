var express = require("express");
var router = express.Router();
var tools = require('./tools');


router.get("/", function(req, res){
    res.render("home");
});

module.exports = router;