var express = require('express');
const fs = require("fs");
const path = require("path");
var router = express.Router();
const questionsDBFileName = path.join(__dirname, "../databases/questions.json");
const gameHistory = path.join(__dirname, "../databases/games.json");
const leaderboard = path.join(__dirname, "../databases/leaderboard.json");

let questionCount;

router.get('/', function(req, res, next) {
    res.render('./main/quiz');
  });

router.get("/api/questions", (req, res) => {
    questionCount = parseInt(req.query.count) || 10;
    const questions = getRandomQuestions(questionCount);
    res.json(questions);
});

router.post("/submitQuiz", (req, res) => {
    const{gameScore, time} = req.body;

    let leaderboardDB = readleaderboard();
    let leaderboard= leaderboardDB.leaderboard;
    let gamesDB = readGamesDB();
    let tpq= parseFloat((time/(questionCount*1000))).toFixed(2);
    let trueScore = parseInt((gameScore/questionCount)*100);

    gamesDB.gameID++;
    const newGame={
        id: req.cookies.userID,
        score: trueScore,
        TPQ: tpq,
        date: new Date().toLocaleString(),
        gameID: gamesDB.gameID
    }
    
    let rank=-1;


    for(let i=0; i<leaderboard.length; i++){
        if(leaderboard[i].score== trueScore && leaderboard[i].TPQ >= tpq){
            rank=i
            break;
        }
        if(leaderboard[i].score< trueScore){
            rank=i;
            break;
        }
        
    }


    if(rank!=-1){
        console.log("FOUND RANK");
        const newRank={
            id: req.cookies.userID,
            score: trueScore,
            TPQ: tpq,
            gameID: gamesDB.gameID
        }
        leaderboard.splice(rank,0,newRank);
        leaderboard = leaderboard.slice(0,10);;
    }

    leaderboardDB.leaderboard = leaderboard;

    gamesDB.games.unshift(newGame);
    writeGamesDB(gamesDB);
    writeleaderboard(leaderboardDB);
    // res.json({ success: true, message: "Score submitted successfully." });
});


function readGamesDB() {
    let data = fs.readFileSync(gameHistory, "utf-8");
    console.log(data);
    return JSON.parse(data);
}

function writeGamesDB(game){
    let data = JSON.stringify(game, null, 2);
    fs.writeFileSync(gameHistory, data, "utf-8");
}

function readleaderboard() {
    let data = fs.readFileSync(leaderboard, "utf-8");
    console.log(data);
    return JSON.parse(data);
}

function writeleaderboard(games){
    let data = JSON.stringify(games, null, 2);
    fs.writeFileSync(leaderboard, data, "utf-8");
}

const rawQuestions = JSON.parse(
    fs.readFileSync(questionsDBFileName, "utf8")
);

const getRandomQuestions = (count = 10) => {
    const shuffled = rawQuestions.sort(() => 0.5 - Math.random()).slice(0, count);
    return shuffled.map(q => ({
        question: q.question,
        answers: [
            { text: q.A, correct: q.answer === "A" },
            { text: q.B, correct: q.answer === "B" },
            { text: q.C, correct: q.answer === "C" },
            { text: q.D, correct: q.answer === "D" }
        ]
    }));
};

module.exports = router;

