var express = require('express');
const fs = require("fs");
const path = require("path");
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.cookies.loggin === "true"){return res.render("./main/quiz");}
  res.render('./auth/index');
});

router.get('/quiz', function(req, res, next) {
  if(req.cookies.loggin === "false") return res.redirect("/");
  res.render('./main/quiz');
});

module.exports = router;
