var MongoClient = require('mongodb').MongoClient;   
const multer = require('multer');

var CONNECTION_STRING = "mongodb+srv://admin:KbukpcWcRPFA2Eji@cluster0.lom4zsh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASE_NAME = "StepfulApplicationDB";
var database;

MongoClient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASE_NAME);
});

function getAllCoaches(request, response) {
    database.collection("Coaches").find({}).toArray((error, result) => {
        response.send(result);
    });
}

function getAllAvailabilityForCoach(request, response) {
    database.collection("Coaches").find(
        {id: request.query.id},
    ).project({ availability:1, _id:0 }).toArray((error, result) => {
        response.send(result);
    });
}

function updateCoachAvailability(request, response) {
    var availabilityTemp = JSON.parse(request.body.availability);
    const availability = availabilityTemp.map((time) => new Date(time))
    database.collection("Coaches").updateOne(
        {id: request.body.id},
        {$set: {availability: availability}}
    );
    response.send("Successfully updated coach availability!");
}   

function getPhoneNumberForCoach(request, response) {
    database.collection("Coaches").find(
        {id: request.query.id},
    ).project({ phoneNumber:1, _id:0 }).toArray((error, result) => {
        response.send(result);
    });
}


module.exports = {
    getAllCoaches,
    getAllAvailabilityForCoach,
    updateCoachAvailability,
    getPhoneNumberForCoach,
};