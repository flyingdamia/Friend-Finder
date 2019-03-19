// Require friends to handle the friend matching //
var path = require("path");
var friends = require("../data/friends.js");

// Display friends on correct route //

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // Post request //

    app.post("/api/friends", function (req, res) {

        var surveyResults = req.body;
        surveyResults.name = surveyResults.name.replace(/\s+/g, "");
        surveyResults.photo = surveyResults.photo.replace(/\s+/g, "");

        // function for converting strings to integers //
        convertStringToInt(surveyResults.scores);

       
        var newUserScores = surveyResults.scores;
        var matchName = '';
        var matchImage = '';
        
        // Starter number //
        var totalDifference = 10000;

        // Loop and logic //
        for (var i = 0; i < friends.length; i++) {
            var diff = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                diff += Math.abs(friends[i].scores[j] - newUserScores[j]);
            }

            if (diff < totalDifference) {
                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        // Push input into friends array //
        friends.push(surveyResults);

        // Respond with  name/pic of the matched person //
        res.json({
            status: 'OK',
            matchName: matchName,
            matchImage: matchImage
        });


    });

}


function convertStringToInt(surveyResults) {
    for (var i = 0; i < surveyResults.length; i++) {
        surveyResults[i] = parseInt(surveyResults[i]);
    }
}

