var express = require('express');
const fs = require("fs");
const path = require("path");
var router = express.Router();
const gameDBFileName = "./databases/games.json";
const usersDBFileName = "./databases/users.json";

router.get('/', function(req, res, next) {
    let gameHistory = readGamesDB();
    let userDB = readUsersDB();
    let userID = req.cookies.userID;
    res.render('./main/profile', {
        games: gameHistory.games,
        users: userDB.users,
        userID
    });    
});


function readGamesDB() {
    let data = fs.readFileSync(gameDBFileName, "utf-8");
    return JSON.parse(data);
}
function readUsersDB() {
    let data = fs.readFileSync(usersDBFileName, "utf-8");
    return JSON.parse(data);
}
module.exports = router;
