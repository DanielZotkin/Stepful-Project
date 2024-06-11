var MongoClient = require('mongodb').MongoClient;   
const multer = require('multer');

var CONNECTION_STRING = "mongodb+srv://admin:KbukpcWcRPFA2Eji@cluster0.lom4zsh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASE_NAME = "StepfulApplicationDB";
var database;

MongoClient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASE_NAME);
    console.log("Connected to `" + DATABASE_NAME + "`!");
});

function getAllStudents(request, response) {
    database.collection("Students").find({}).toArray((error, result) => {
        response.send(result);
    });
}

function insertStudent(request, response) {
    database.collection("Students").count({}, function(error, numOfDocs){
        database.collection("Students").insertOne({
            id:(numOfDocs+1).toString(),
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            phoneNumber: request.body.phoneNumber,
        })
        if(error) {
            return response.status(500).send(error);
        }
        response.send("Successfully inserted student!");
    });
}

function deleteStudent(request, response) {
    database.collection("Students").deleteOne({
        id: request.query.id
    });
    response.json("Deleted");
}

function getPhoneNumberForStudent(request, response) {
    database.collection("Students").find(
        {id: request.query.id},
    ).project({ phoneNumber:1, _id:0 }).toArray((error, result) => {
        response.send(result);
    });
}

module.exports = {
    getAllStudents,
    insertStudent,
    deleteStudent,
    getPhoneNumberForStudent
};
